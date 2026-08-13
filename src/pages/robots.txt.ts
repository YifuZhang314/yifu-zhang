import type { APIRoute } from 'astro';

const robots = `User-agent: *
Allow: /

Sitemap: https://yifuzhang314.github.io/yifu-zhang/sitemap-index.xml
`;

export const GET: APIRoute = () =>
  new Response(robots, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
