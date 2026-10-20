# Contribuer au projet

## Environnement

- Utilisez Bun : `bun install`.
- Copiez `.dev.vars.example` vers `.dev.vars` et renseignez des valeurs locales
  non réutilisées en production.
- N’ajoutez jamais de secrets, de données réelles ou de fichiers générés au
  dépôt.

## Modifications et stratégie Git

- Consultez `AGENTS.md` pour les conventions techniques du projet.
- **Conventional Commits :** utilisez impérativement la spécification
  Conventional Commits (`feat:`, `fix:`, `refactor:`, `test:`, `docs:`,
  `chore:`, `build:`) pour tous les commits et titres de pull request.
- **Commits atomiques :** chaque commit doit représenter un changement unitaire,
  cohérent et complet (code, tests et documentation associés). Chaque commit
  doit laisser le projet dans un état compilable et vert (`check`, `lint` et
  `test`). Ne mélangez pas refactorisation, formatage et nouvelle fonctionnalité
  dans un même commit.
- **Politique de synchronisation (rebase vs refaire les modifications) :**
  - **Rebase obligatoire :** maintenez votre branche à jour exclusivement via
    `git rebase origin/main`. Les commits de merge intermédiaires (`Merge branch
    'main' into ...`) sont proscrits.
  - **Refaire les modifications :** si votre branche diverge fortement, que
    l'historique est brouillon ou que les conflits de rebase s'avèrent
    complexes/risqués, ne perdez pas de temps à forcer un rebase instable :
    recréez une branche propre depuis le dernier `origin/main` et réappliquez vos
    modifications (via un report propre des fichiers modifiés ou cherry-pick).
- Pour toute modification de comportement, appliquez le TDD : écrivez d’abord
  un test qui échoue, puis l’implémentation minimale et enfin les tests de
  régression.
- Ajoutez des tests unitaires pour la logique et des tests de composants pour
  les changements d’interface.
- N’affirmez pas de prise en charge de fonctionnalités serveur qui ne sont pas
  effectivement implémentées.

## Vérifications avant une pull request

```sh
bun run lint
bun run format:check
bun run build
bun run check
bun run test:unit -- --run
bun run test:e2e:install
bun run test:e2e
```

Décrivez le besoin, la solution, les vérifications exécutées et toute limite
connue dans la pull request. Ne cochez pas les contrôles qui n’ont pas été
effectués.
