# cloud-resume

The source for my online CV and project portfolio, live at
[cv.simoncull.co.uk](https://cv.simoncull.co.uk). It is a static site built with
[Astro](https://astro.build) and part of my take on the
[Cloud Resume Challenge](https://cloudresumechallenge.dev).

The AWS infrastructure that hosts it (S3, CloudFront, Route 53, the visitor-counter API and
database) lives in a separate repo:
**[cloud-resume-infra](https://github.com/scull511/cloud-resume-infra)**.

## What's in this repo

- Astro pages, layouts and components (`src/pages`, `src/layouts`, `src/components`)
- Project write-ups, written as Markdown files in a content collection (`src/content/project`)
- Styles, icons and images (`src/styles`, `src/icons`, `src/images`, `public`)

The build output (`dist/`) isn't committed. It is generated from the source.

## Running it locally

```bash
npm ci
npm run dev       # local dev server at http://localhost:4321
npm run build     # builds the static site into dist/
```

## How it's deployed

The built `dist/` folder is synced to a private S3 bucket, served through CloudFront, and the
CloudFront cache is invalidated so changes show up straight away. This is currently done by hand:

```bash
npm run build
aws s3 sync dist/ s3://cv.simoncull.co.uk --delete
aws cloudfront create-invalidation --distribution-id E3EWJ4U4IM6KCQ --paths "/*"
```

Automating this with GitHub Actions is the next step.

## The view counter

Each page shows a view count for that page and a site-wide total. The `ViewCounter` component
calls an API (API Gateway → Lambda → DynamoDB) when the page loads, passing a page name.

- Standalone pages pass a fixed name through `MainLayout`, e.g. `pageName="home"`.
- Each project Markdown file has a `projectID` in its frontmatter (starting `pr-`), which is used as
  its page name.
- The Lambda only accepts known page names and valid project IDs, so a new standalone page also
  needs adding to the allowlist in the infra repo.

## Adding a project

Create a new Markdown file in `src/content/project/` with this frontmatter:

```markdown
---
title: 'Project title'
slug: project-slug
projectID: 'pr-project-slug'
homepage: true
visible: true
services: 'AWS - Service, Service'
---
```
