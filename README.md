# chil.dev

A small, static personal portfolio for Cameron Hildebrandt. It is dark-first, content-driven, and designed to ship quickly without a client framework.

## Stack

Astro, TypeScript, Tailwind CSS, MDX content collections, and Lucide icons. The production output is static HTML and CSS with no required client-side JavaScript.

## Development

```bash
yarn
yarn dev
```

Open the local URL Astro prints (normally `http://localhost:4321`). Build the production site with `yarn build`, then preview it with `yarn preview`.

## Structure

```text
src/components/     Reusable Astro components
src/content/        MDX project and writing content
src/data/           Structured site data, including experience
src/layouts/        Shared document shell and navigation
src/pages/          Static routes and project detail route
src/styles/         Global design system
public/             Static assets, headers, robots, redirect configuration
```

## Content

Add a project by creating `src/content/projects/your-slug.mdx` with the frontmatter used in `placeholder-project.mdx`. The filename becomes its URL: `/projects/your-slug/`.

Add writing in `src/content/writing/`. The writing collection is MDX-powered and published posts appear at `/writing/`; set `draft: false` when ready.

Replace the placeholder experience entries in `src/data/experience.ts`, social URLs in `src/components/Sidebar.astro` and `src/pages/index.astro`, and add `public/resume.pdf` for the resume download.

## Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for the complete free Cloudflare Pages setup and the planned redirect Worker architecture.
