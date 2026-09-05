# Project principles

`chil.dev` is a deliberately small, static personal portfolio. Keep it fast, accessible, editorial, and distinctly personal.

1. Put performance ahead of feature count. Prefer static HTML and browser capabilities.
2. Add JavaScript only for interaction that cannot be expressed with HTML and CSS. Respect reduced motion.
3. Accessibility is a baseline: semantic landmarks, keyboard navigation, visible focus, contrast, and meaningful alt text.
4. Do not add React, a UI kit, a CMS, analytics, authentication, or a database without explicit user approval.
5. Avoid dependencies when Astro, TypeScript, CSS, or a browser API is sufficient.
6. Preserve the dark-first, restrained, editorial visual language. Avoid generic SaaS treatments.
7. Keep content in `src/content/` and structured experience data in `src/data/experience.ts`; do not duplicate content in component markup.
8. Verify `yarn build` after meaningful changes. This is a fully static Cloudflare Pages site.
