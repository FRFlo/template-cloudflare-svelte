# Project instructions

## Tooling

- Use **Bun** for dependency management and project scripts (`bun add`, `bunx`,
  `bun run`). Do not use npm or yarn.
- Validate changes in order: `bun run lint`, `bun run format:check`, `bun run build`,
  `bun run check`, and `bun run test:unit -- --run`. Apply fixes with `bun run format`.
- Use TDD for behavior changes: write a failing test first, implement the
  smallest change that passes, then run the relevant test suite.
- Add unit tests for changed business logic and component tests for changed UI.
  Cover meaningful success, failure, and edge cases; do not add tests that only
  mirror implementation details.

## Architecture

- This is a SvelteKit app deployed to Cloudflare Workers with
  `@sveltejs/adapter-cloudflare`.
- Use the `#lib` / `#lib/*` import aliases for `src/lib`; prefer them over
  relative imports that cross feature directories.
- Keep server-side workflows in Effect. Define request-scoped dependencies in
  `src/lib/server/effect.ts`, compose work as Effects, and execute them with
  `runWithCloudflareEnv`.
- Represent expected failures in the Effect error channel, map external
  exceptions at integration boundaries, and handle errors deliberately at HTTP
  boundaries. Keep side effects inside Effects; avoid running Effects from
  module initialization.
- Cloudflare bindings are request-scoped. Resolve them dynamically via
  `getCloudflareEnvironment(platformEnv)` (which falls back to `cloudflare:workers` in
  dev). Never keep a module-level runtime or service that captures a request's `env`,
  D1 binding, or execution context.
- Use Svelte 5 runes (`$state`, `$derived`, `$props`) and existing project conventions
  in `.oxfmtrc.json` and `.oxlintrc.json`.
- Keep components focused and move reusable domain behavior into `src/lib`.
  Prefer semantic HTML, accessible names and keyboard behavior, and responsive
  layouts. Follow the existing Tailwind CSS 4 setup in `src/routes/layout.css` and
  use `@lucide/svelte` for icons.
- Keep TypeScript strict; avoid `any`, unsafe casts, and duplicated domain
  types. Use the configured aliases for cross-directory imports and keep
  changes focused on the requested behavior.

## Authentication and Cloudflare

- Better Auth is served from `/api/auth/*`; its configuration lives in
  `src/lib/server/auth.ts`. Client helpers live in `src/lib/auth-client.ts`.
- D1 is bound as `DATABASE` and named in `wrangler.jsonc`. Put schema changes in
  `migrations/`; do not edit or expose credentials in source.
- Local secrets belong in `.dev.vars` (ignored by Git); use
  `.dev.vars.example` as the template. Production secrets are configured on
  Cloudflare.
- Regenerate Worker binding types after Wrangler configuration changes with
  `bun run gen`.

## Localization

- Paraglide settings are in `project.inlang/settings.json`; French (`fr-fr`) is
  the base locale.
- Keep translated messages in `messages/` and use generated Paraglide APIs
  rather than hard-coded locale routing.

## Skills and Agent Playbooks

Project skills are vendored in `.agents/skills/`:

- Engineering: `/tdd` for test-first development, `/diagnosing-bugs` for systematic
  debugging, `/codebase-design` for deep modules, `/code-review` before commit,
  `/to-spec` and `/to-tickets` for planning.
- UI & Polish: `/impeccable` for design system and visual audit, `/emil-design-eng`
  for frontend craft, `/animate` and `/animation-performance` for 60fps transitions,
  `/mobile-native` for touch interactions, and `/break-ui` for edge-case stress testing.

## Change workflow

- Use Conventional Commits for all commit messages and pull request titles (`feat:`,
  `fix:`, `refactor:`, `test:`, `docs:`, `chore:`, `build:`).
- Commit atomically: every commit must be a focused, self-contained, logical unit of
  change (code, tests, and documentation). Do not combine unrelated fixes,
  refactoring, and features in the same commit. Every commit must leave the codebase
  in a passing, buildable state.
- Keep branches linear via rebase: always update feature branches with
  `git fetch origin && git rebase origin/main`. Never create merge commits into
  working branches. If a branch has diverged significantly or rebase conflicts become
  tangled, start a clean branch from `origin/main` and cleanly reapply the modifications
  instead of wrestling with an error-prone rebase.
- Inspect the relevant code and existing tests before editing; reuse existing
  patterns rather than introducing a parallel abstraction.
- After changes, run the relevant tests, then lint, formatting, type checks, and
  a production build when applicable. Report any failing check and distinguish
  pre-existing issues from regressions.
