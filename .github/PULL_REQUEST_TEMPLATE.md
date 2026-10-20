<!--
Le titre de la pull request DOIT respecter la convention Conventional Commits :
<type>(<scope optionnel>): <description>

Exemples :
- feat(auth): ajouter la connexion OAuth Google
- fix(worker): corriger la résolution des variables d’environnement
- refactor: simplifier le routage des messages Paraglide
- test: ajouter les tests de composants pour AuthPanel
- chore(deps): mettre à jour les dépendances
-->

## Type de changement

- [ ] `feat:` Nouvelle fonctionnalité
- [ ] `fix:` Correction de bogue
- [ ] `refactor:` Refactorisation de code
- [ ] `docs:` Documentation
- [ ] `test:` Ajout ou modification de tests
- [ ] `chore:` Maintenance ou configuration
- [ ] `build:` Dépendances ou chaîne de compilation

## Résumé

<!-- Décrivez les changements et leur objectif. -->

## Vérifications

- [ ] Le titre de la PR suit la spécification Conventional Commits
- [ ] Tests unitaires ou de composants ajoutés/mis à jour si nécessaire
- [ ] `bun run lint`
- [ ] `bun run format:check`
- [ ] `bun run build`
- [ ] `bun run check`
- [ ] `bun run test:unit -- --run`
- [ ] `bun run test:e2e`
