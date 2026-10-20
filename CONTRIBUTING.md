# Contribuer au projet

## Environnement

- Utilisez Bun : `bun install`.
- Copiez `.dev.vars.example` vers `.dev.vars` et renseignez des valeurs locales
  non réutilisées en production.
- N’ajoutez jamais de secrets, de données réelles ou de fichiers générés au
  dépôt.

## Modifications

- Consultez `AGENTS.md` pour les conventions techniques du projet.
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
