import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';

const distDir = path.resolve('dist');
const basePath = '/yifu-zhang';

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const fullPath = path.join(directory, entry.name);
      return entry.isDirectory() ? walk(fullPath) : fullPath;
    }),
  );
  return files.flat();
}

function localTarget(value, sourceFile) {
  if (
    value.startsWith('#') ||
    value.startsWith('mailto:') ||
    value.startsWith('tel:') ||
    value.startsWith('data:') ||
    /^https?:\/\//.test(value)
  ) {
    return null;
  }

  const cleanValue = decodeURIComponent(value.split(/[?#]/)[0]);
  if (!cleanValue) return null;

  if (cleanValue.startsWith('/')) {
    if (cleanValue !== basePath && !cleanValue.startsWith(`${basePath}/`)) {
      throw new Error(
        `${sourceFile}: root-relative URL is missing ${basePath}: ${value}`,
      );
    }
    return cleanValue.slice(basePath.length) || '/';
  }

  const sourceRoute = `/${path.relative(distDir, path.dirname(sourceFile))}`;
  return path.posix.normalize(path.posix.join(sourceRoute, cleanValue));
}

async function resolves(target) {
  const normalized = target.replace(/^\//, '');
  const candidates = [];

  if (!normalized || target.endsWith('/')) {
    candidates.push(path.join(distDir, normalized, 'index.html'));
  } else {
    candidates.push(path.join(distDir, normalized));
    if (!path.extname(normalized)) {
      candidates.push(path.join(distDir, normalized, 'index.html'));
      candidates.push(path.join(distDir, `${normalized}.html`));
    }
  }

  for (const candidate of candidates) {
    try {
      if ((await stat(candidate)).isFile()) return true;
    } catch {
      // Try the next valid static-output shape.
    }
  }
  return false;
}

const htmlFiles = (await walk(distDir)).filter((file) =>
  file.endsWith('.html'),
);
const failures = [];
const attributePattern = /(?:href|src)=["']([^"']+)["']/g;

for (const htmlFile of htmlFiles) {
  const html = await readFile(htmlFile, 'utf8');
  for (const match of html.matchAll(attributePattern)) {
    try {
      const target = localTarget(match[1], htmlFile);
      if (target && !(await resolves(target))) {
        failures.push(`${path.relative(distDir, htmlFile)} -> ${match[1]}`);
      }
    } catch (error) {
      failures.push(error.message);
    }
  }
}

if (failures.length > 0) {
  console.error(
    'Broken internal links:\n' +
      failures.map((failure) => `- ${failure}`).join('\n'),
  );
  process.exit(1);
}

console.log(
  `Checked internal links in ${htmlFiles.length} generated HTML files.`,
);
