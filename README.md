# Yifu Zhang — academic website

This repository contains Yifu Zhang's academic research website. It is a static Astro site designed for GitHub Pages at:

<https://yifuzhang314.github.io/yifu-zhang/>

## Local development

Use Node.js 22.19 or later (Node.js 24 is used in continuous integration).

```sh
npm ci
npm run dev
```

Astro prints the local address after the development server starts.

## Project structure

- `src/pages/` defines the homepage, research, publications and error routes.
- `src/components/` contains repeated layout and content components.
- `src/data/` contains typed profile, research and publication records.
- `src/styles/global.css` contains the site's responsive visual system.
- `public/` contains static assets, including the downloadable CV.

The temporary “incoming PhD student” wording is stored in `src/data/profile.ts` so it can be updated in one place after enrolment.

## Validation

```sh
npm run check
```

This checks Astro and TypeScript, verifies formatting, creates a production build and validates every generated internal link. Pull requests also run a mobile Lighthouse audit against the production preview, enforcing scores of at least 95 in performance, accessibility, best practices and SEO. Other useful commands are:

```sh
npm run build
npm run preview
npm run format
```

## Deployment

Pull requests run the validation job without deploying. A push to `main` validates the site, uploads the static `dist/` output and deploys it with the official GitHub Pages Actions.

In the repository's **Settings → Pages** screen, the deployment source must be set to **GitHub Actions**. The Astro configuration includes the `/yifu-zhang/` project-site base path; no custom domain is configured.

## Writing a blog post

Create a Markdown draft with:

```sh
npm run new:post -- "Post title"
```

The command prints the new file path under `src/content/blog/`. Write the post in Markdown, preview it with `npm run dev`, and keep `draft: true` while it is unfinished. Drafts appear during local development but are omitted from production pages and RSS. Change the field to `draft: false`, then commit and push to publish through the existing GitHub Pages workflow.

Because this repository is public, committed drafts remain readable in the GitHub source even when they are absent from the website. Keep sensitive drafts uncommitted or in private storage.

Post frontmatter supports a title, description, publication date, optional updated date, tags, and draft status. Inline and display LaTeX are supported using `$...$` and `$$...$$`.

### Blog comments

Published posts use [Cusdis Cloud](https://cusdis.com/) for moderated comments. The widget is enabled only when `PUBLIC_CUSDIS_APP_ID` is available at build time.

For local development, copy `.env.example` to `.env` and add the public Cusdis App ID. For GitHub Pages, create the Actions repository variable `PUBLIC_CUSDIS_APP_ID` with the same value. Each post uses its content ID as the stable Cusdis page ID.
