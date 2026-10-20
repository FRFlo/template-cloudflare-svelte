# template-cloudflare-svelte

Template GitHub pour applications SvelteKit déployées sur Cloudflare Workers avec base de données D1, Better Auth, Effect, Tailwind CSS 4 et Paraglide.

## Stack technique

- **Framework :** [SvelteKit 5](https://svelte.dev/) avec runes et adaptateur Cloudflare Workers (`@sveltejs/adapter-cloudflare`)
- **Plateforme :** [Cloudflare Workers](https://workers.cloudflare.com/) + [Cloudflare D1](https://developers.cloudflare.com/d1/)
- **Authentification :** [Better Auth](https://www.better-auth.com/) avec plugin D1 (`better-auth-cloudflare`)
- **Architecture serveur :** [Effect](https://effect.website/) pour la gestion des services contextuels de requête
- **Style & Icônes :** [Tailwind CSS v4](https://tailwindcss.com/) (`@tailwindcss/vite`) + [Lucide Icons](https://lucide.dev/guide/svelte/) (`@lucide/svelte`)
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

Les types des bindings Cloudflare sont générés localement par Wrangler et ne
sont pas versionnés. Après un nouveau clone ou une modification de
`wrangler.jsonc`, générez-les avant les vérifications TypeScript :

```sh
bun run gen
```

```sh
bun run lint
bun run format:check
bun run build
bun run check
bun run test:unit -- --run
bun run test:e2e:install
bun run test:e2e
```

Les tests Playwright vérifient les pages, les métadonnées SEO, `robots.txt` et
le sitemap. Ils ne valident pas l’authentification : aucun parcours utilisateur
de connexion ou d’inscription n’est encore fourni par ce template.

## Premier provisionnement et déploiement Cloudflare

Lors de la création d'un nouveau projet à partir de ce template, suivez ces étapes pour configurer et déployer votre environnement distant sur Cloudflare :

### 1. Renommer le projet et créer la base D1 distante

1. Modifiez le champ `"name"` dans `package.json` et `wrangler.jsonc` avec le nom de votre projet.
2. Créez votre base de données D1 sur votre compte Cloudflare :

   ```sh
   bunx wrangler d1 create <nom-de-votre-base>
   ```

3. Notez le `database_id` retourné par la commande et reportez-le dans `wrangler.jsonc` :

   ```jsonc
   "d1_databases": [
     {
       "binding": "DATABASE",
       "database_name": "<nom-de-votre-base>",
       "database_id": "<database_id_retourné_par_wrangler>",
       "migrations_dir": "migrations"
     }
   ]
   ```

### 2. Configurer les secrets de production

1. Générez un secret fort pour Better Auth en production :

   ```sh
   openssl rand -base64 32
   ```

2. Enregistrez-le comme secret de Worker sur Cloudflare :

   ```sh
   bunx wrangler secret put BETTER_AUTH_SECRET
   ```

3. Configurez l'URL finale de votre domaine de production dans le Worker :

   ```sh
   bunx wrangler secret put BETTER_AUTH_URL
   # ou ajoutez-le dans la section "vars" de wrangler.jsonc si l'URL est publique
   ```

### 3. Appliquer les migrations sur la base distante

Exécutez les migrations D1 sur l'instance distante Cloudflare :

```sh
bunx wrangler d1 migrations apply <nom-de-votre-base> --remote
```

### 4. Déployer le Worker

Compilez l'application puis déployez sur Cloudflare Workers :

```sh
bun run build
bunx wrangler deploy
```

## Architecture serveur & Effect

Les traitements côté serveur utilisent [Effect](https://effect.website/) comme cœur applicatif. Déclarez les dépendances liées à une requête comme services Effect dans `src/lib/server/effect.ts`, composez les traitements sous forme d'Effects et exécutez-les avec `runWithCloudflareEnv`. Les liaisons Cloudflare sont fournies à chaque requête : ne conservez pas de runtime global qui capture l'environnement du Worker.
