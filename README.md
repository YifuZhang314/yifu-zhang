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

Published posts use [FastComments](https://fastcomments.com/). The public tenant ID is configured in `src/components/BlogComments.astro`; no environment variable or API secret is needed for local builds or GitHub Pages. Each post uses its content ID as the stable FastComments `urlId`, alongside its canonical URL and title. The widget loads when the comments section approaches the viewport.

In the FastComments dashboard, register `yifuzhang314.github.io` as an allowed domain. Enable **Allow Anonymous Commenting** and **Disable Email Inputs** in a customization rule covering all posts (leave URL ID empty or use `*`). Keep automatic deletion of unverified comments disabled. The embed hides the unverified label so guests are not prompted to verify an email they have not supplied. See the [configuration documentation](https://docs.fastcomments.com/guide-customizations-and-configuration.html).

Guests who do not supply an email cannot receive email updates. These settings do not disable notification preferences for visitors already signed into FastComments. Moderation and spam settings are managed in the FastComments dashboard.
