# template-cloudflare-svelte

Template GitHub privé pour applications SvelteKit déployées sur Cloudflare Workers avec base de données D1, Better Auth, Effect, Tailwind CSS 4 et Paraglide.

## Stack technique

- **Framework :** [SvelteKit 5](https://svelte.dev/) avec runes et adaptateur Cloudflare Workers (`@sveltejs/adapter-cloudflare`)
- **Plateforme :** [Cloudflare Workers](https://workers.cloudflare.com/) + [Cloudflare D1](https://developers.cloudflare.com/d1/)
- **Authentification :** [Better Auth](https://www.better-auth.com/) avec plugin D1 (`better-auth-cloudflare`)
- **Architecture serveur :** [Effect](https://effect.website/) pour la gestion des services contextuels de requête
- **Style :** [Tailwind CSS v4](https://tailwindcss.com/) (`@tailwindcss/vite`)
- **Internationalisation :** [Paraglide JS](https://inlang.com/m/gerre34r/library-inlang-paraglideJs)
- **Qualité de code :** [Oxlint](https://oxc.rs/docs/guide/usage/linter.html) & [Oxfmt](https://oxc.rs/)
- **Tests :** [Vitest](https://vitest.dev/) (unitaires & composants navigateur) + [Playwright](https://playwright.dev/) (e2e)
- **Package Manager :** [Bun](https://bun.sh/)

## Installation

Installez les dépendances avec Bun :

```sh
bun install
```

## Configuration locale et base de données

Copiez `.dev.vars.example` vers `.dev.vars` et renseignez les valeurs de développement :

```sh
cp .dev.vars.example .dev.vars
```

- `BETTER_AUTH_SECRET` : chaîne aléatoire sécurisée d'au moins 32 caractères. Vous pouvez en générer une avec OpenSSL :

  ```sh
  openssl rand -base64 32
  ```

- `BETTER_AUTH_URL` : URL locale (`http://127.0.0.1:4173`).

Appliquez les migrations initiales Better Auth sur la base D1 locale :

```sh
bunx wrangler d1 migrations apply template-cloudflare-svelte --local
```

Pour la production :

```sh
bunx wrangler d1 migrations apply template-cloudflare-svelte --remote
```

## Développement

Lancer le serveur de développement SvelteKit classique :

```sh
bun run dev:vite
```

Lancer l'aperçu sous l'environnement d'exécution Cloudflare Workers local :

```sh
bun run dev
```

## Vérification et tests

```sh
bun run lint
bun run format:check
bun run build
bun run check
bun run test:unit -- --run
bun run test:e2e:install
bun run test:e2e
```

## Architecture serveur & Effect

Les traitements côté serveur utilisent [Effect](https://effect.website/) comme cœur applicatif. Déclarez les dépendances liées à une requête comme services Effect dans `src/lib/server/effect.ts`, composez les traitements sous forme d'Effects et exécutez-les avec `runWithCloudflareEnv`. Les liaisons Cloudflare sont fournies à chaque requête : ne conservez pas de runtime global qui capture l'environnement du Worker.
