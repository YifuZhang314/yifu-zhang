import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const title = process.argv.slice(2).join(' ').trim();

if (!title) {
  console.error('Usage: npm run new:post -- "Post title"');
  process.exit(1);
}

const slug = title
  .normalize('NFKD')
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-|-$/g, '');

if (!slug) {
  console.error('The title must contain at least one letter or number.');
  process.exit(1);
}

const published = new Date().toISOString().slice(0, 10);
const directory = path.resolve('src/content/blog');
const filePath = path.join(directory, `${slug}.md`);
const contents = `---
title: ${JSON.stringify(title)}
description: 'Add a one-sentence description of the article.'
published: ${published}
tags: []
draft: true
---

Write the opening paragraph here.

## First section

Continue the article here.
`;

await mkdir(directory, { recursive: true });

try {
  await writeFile(filePath, contents, { encoding: 'utf8', flag: 'wx' });
} catch (error) {
  if (error && typeof error === 'object' && 'code' in error) {
    if (error.code === 'EEXIST') {
      console.error(`A post already exists at ${filePath}`);
      process.exit(1);
    }
  }
  throw error;
}

console.log(path.relative(process.cwd(), filePath));
