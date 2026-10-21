# Assistant Setup Protocol

> **Instructions pour l'agent IA :**
> Quand l'utilisateur vous demande de configurer son projet à partir de ce template (ex: _"Configure mon projet en suivant SETUP.md"_), suivez strictement les étapes ci-dessous. Posez les questions de personnalisation à l'utilisateur de manière interactive ou en un seul formulaire clair avant d'appliquer les modifications dans le codebase.

---

## 1. Questions de personnalisation pour l'utilisateur

Posez à l'utilisateur les questions suivantes pour adapter le projet à ses besoins :

1. **Identité du projet :**
   - Quel est le nom de l'application / du produit ? (ex: `my-saas`)
   - Quelle est la description courte du projet ?
   - Avez-vous une URL de production ou de domaine cible ? (ex: `https://app.monproduit.com`)

2. **Identité visuelle & Design System :**
   - Quelle est votre ambiance / palette de couleurs souhaitée ?
     - Minimaliste sombre (zinc/slate par défaut)
     - Palette de marque spécifique (fournissez une couleur primaire d'accent et une ambiance de fond)
   - Quelle police d'écriture souhaitez-vous privilégier ? (ex: sans-serif système, Inter, Geist, etc.)
   - Quel style de bordures / arrondis préférez-vous ? (doux/arrondi, compact, sharp/carré)

3. **Internationalisation (i18n / Paraglide) :**
   - Quelles sont les langues cibles ? (Par défaut : français `fr-fr` et anglais `en`)
   - Quelle est la langue par défaut principale ?

4. **Authentification & Cloudflare D1 :**
   - Quels fournisseurs d'authentification souhaitez-vous activer dans Better Auth ?
     - Email/Mot de passe uniquement (par défaut)
     - OAuth social (GitHub, Google, etc.)
   - Quel nom pour votre base de données Cloudflare D1 locale et de production ?

---

## 2. Checklist d'application pour l'agent IA

Une fois les réponses obtenues, l'agent doit appliquer les modifications de manière atomique en respectant la structure du template :

### A. Métadonnées du projet

- [ ] Mettre à jour `name` dans `package.json`.
- [ ] Adapter le titre et les métadonnées SEO dans `src/routes/+layout.svelte` et `src/routes/(app)/+page.svelte`.
- [ ] Adapter les chaînes traduites dans `messages/fr-fr.json` et `messages/en.json`, puis exécuter `bun run paraglide:compile`.

### B. Design System & Tokens (`DESIGN.md` et CSS)

- [ ] Mettre à jour `DESIGN.md` avec les couleurs sémantiques, polices et intentions de design choisies.
- [ ] Adapter `.impeccable/design.json` pour aligner les métadonnées de l'audit de style.
- [ ] Ajuster `src/routes/layout.css` avec les variables sous `@theme` correspondant aux tokens choisis (`--color-canvas`, `--color-surface`, `--color-action`, `--color-accent`, etc.).
- [ ] Adapter `components.json` si une couleur de base spécifique de shadcn-svelte est demandée (ex: `zinc`, `slate`, `mauve`).

### C. Cloudflare & D1

- [ ] Vérifier ou renommer le binding D1 dans `wrangler.jsonc` si nécessaire.
- [ ] Générer un secret Better Auth fort (`openssl rand -base64 32`) et préparer `.dev.vars` à partir de `.dev.vars.example`.

### D. Validation & Qualité

Exécuter la chaîne de vérification complète dans l'ordre strict :

```sh
bun run lint
bun run format:check
bun run check
bun run test:unit -- --run
bun run build
bunx playwright test
```

- [ ] Confirmer que la compilation et tous les tests sont au vert.
- [ ] Rédiger un commit clair au format Conventional Commits (`feat(setup): configurer l'identite du projet <nom>`).
