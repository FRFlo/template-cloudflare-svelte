---
name: fivedash
description: Design system fivedash — console FiveM originale, inspirée de l'atmosphère côtière nocturne de GTA VI sans reprendre ses actifs de marque.
colors:
  canvas: "#1d1724"
  surface: "#2b2031"
  surface-raised: "#403044"
  rail: "#1d1724"
  content: "#fffaf5"
  content-muted: "#b9aebc"
  action: "#ffad35"
  action-hover: "#ffc663"
  action-content: "#241a2b"
  accent: "#e47b70"
  focus: "#9bd3cc"
  danger: "#ff9b91"
  success: "#9bd3b4"
typography:
  display:
    fontFamily: '"Space Grotesk Variable", "Avenir Next", Avenir, "Segoe UI", sans-serif'
    fontSize: "clamp(2.2rem, 5vw, 4rem)"
    fontWeight: 750
    lineHeight: 1.05
    letterSpacing: "-0.035em"
  title:
    fontFamily: '"Avenir Next", Avenir, "Segoe UI", sans-serif'
    fontSize: "1.25rem"
    fontWeight: 700
    letterSpacing: "-0.02em"
  body:
    fontFamily: '"Avenir Next", Avenir, "Segoe UI", sans-serif'
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: '"Avenir Next", Avenir, "Segoe UI", sans-serif'
    fontSize: "0.8rem"
    fontWeight: 650
  micro: "0.625rem"
  edit-action: "0.68rem"
  caption: "0.7rem"
  small: "0.75rem"
  navigation: "0.875rem"
  button: "0.9rem"
  error-message: "0.95rem"
  brand-mark: "1.4rem"
  error-code: "clamp(8rem, 16vw, 13rem)"
  error-code-mobile: "clamp(7rem, 28vw, 9rem)"
  error-title: "clamp(2rem, 4vw, 3.5rem)"
rounded:
  compact: "0.375rem"
  marker: "0.125rem"
  control: "0.5rem"
  panel: "0.8rem"
  pill: "999px"
spacing:
  xs: "0.25rem"
  sm: "0.5rem"
  md: "0.75rem"
  lg: "1rem"
  xl: "1.5rem"
  2xl: "3rem"
components:
  action:
    backgroundColor: "{colors.action}"
    textColor: "{colors.action-content}"
    rounded: "{rounded.control}"
  panel:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.content}"
    rounded: "{rounded.panel}"
---

# Design System: fivedash

## Vision

**Creative North Star: « La côte après le coucher du soleil »**

Fivedash est une console d’administration FiveM au langage dense et fonctionnel.
Son identité visuelle originale évoque une côte floridienne à la tombée de la
nuit : encre prune, halos corail, lumière ambre et reflets d’eau pâles. GTA VI
sert uniquement de référence d’atmosphère, notamment la page officielle
Rockstar [GTA VI](https://store.rockstargames.com/fr/game/buy-gta-vi). Aucun logo,
artwork, lettrage propriétaire ou composition de Rockstar n’est utilisé.

Le produit ne revendique aucune compatibilité GTA VI. La racine reste
intentionnellement vide tant qu’aucune fonctionnalité ou donnée réelle n’est
disponible; le rail constitue la seule interface applicative actuellement
visible. Ne pas inventer de dashboard, d’intégration ou de capacité.

## Tokens et couleurs

Les valeurs canoniques sont définies dans `src/routes/layout.css` via Tailwind
CSS 4 `@theme`. Les couleurs primitives `vi-*` nourrissent les aliases
sémantiques `canvas`, `surface`, `rail`, `content`, `action`, `accent` et états.
L’interface doit utiliser les aliases sémantiques, pas réintroduire une palette
fivedash indépendante ni des couleurs ponctuelles.

| Token Tailwind                   | Valeur    | Usage                                   |
| -------------------------------- | --------- | --------------------------------------- |
| `vi-plum-950` / `canvas`         | `#1d1724` | Fond nocturne principal                 |
| `vi-plum-900` / `surface`        | `#2b2031` | Fond des éléments élevés                |
| `vi-plum-800` / `surface-raised` | `#403044` | Survol et état actif                    |
| `vi-sunset-400` / `action`       | `#ffad35` | Action principale et repère chaud       |
| `vi-sunset-300` / `action-hover` | `#ffc663` | Survol d’action                         |
| `vi-coral-500` / `accent`        | `#e47b70` | Lueur et accent décoratif               |
| `vi-pink-400`                    | `#f29a9f` | Accent secondaire, usage parcimonieux   |
| `vi-sea-300` / `focus`           | `#9bd3cc` | Focus clavier clairement visible        |
| `vi-sea-100`                     | `#d5e2de` | Reflet clair, détails ponctuels         |
| `vi-white` / `content`           | `#fffaf5` | Texte principal                         |
| `vi-muted` / `content-muted`     | `#b9aebc` | Texte secondaire sur fond sombre        |
| `vi-danger` / `danger`           | `#ff9b91` | Erreurs, toujours accompagnées de texte |
| `vi-success` / `success`         | `#9bd3b4` | Confirmation, jamais couleur seule      |

Le contraste du texte de base est privilégié; le texte secondaire reste réservé
aux contenus non essentiels. L’ambre sur prune sert d’action, et l’encre prune
sur ambre assure la lisibilité des libellés de bouton.

## Typographie

- **Interface:** pile sans-serif système Avenir/Segoe UI, compacte et lisible.
- **Titres d’erreur:** Space Grotesk variable auto-hébergée pour un ton
  géométrique distinctif; ailleurs, graisse forte et tracking légèrement
  resserré. Ne pas reproduire une typographie de logo ou d’affiche Rockstar.
- **Données techniques:** chiffres tabulaires; monospace uniquement pour code,
  identifiants et sorties de console.

## Composition, matières et motifs

- Le shell reste utilitaire: rail latéral persistant et zone de contenu fluide.
- La toile est prune très sombre; des dégradés radiaux corail/ambre très subtils
  suggèrent la lumière du couchant sans nuire à la lecture.
- Les surfaces sont prune relevé, séparées par des bordures claires translucides.
- Un motif original de lignes d’horizon ou de grain CSS léger est permis en
  décoration non interactive; aucun artwork ou logo officiel.
- Pas de cartes, métriques ou contenu fictif pour remplir l’espace vide.

## Interactions et accessibilité

- Utiliser les tokens `action`, `action-hover`, `focus`, `danger` et `success`.
- Chaque contrôle possède un nom accessible; l’état actif est exposé autrement
  que par la couleur seule.
- Conserver le focus clavier visible, des cibles tactiles généreuses, un ordre
  de lecture logique et une mise en page adaptative.
- Respecter `prefers-reduced-motion`; les transitions ne doivent jamais être
  nécessaires à la compréhension.
- Les erreurs utilisent du texte lisible et un retour de navigation explicite.

## Responsive

Le rail devient une navigation mobile ouvrable au clavier et au toucher. Le
contenu conserve une largeur lisible sans débordement horizontal, dès 320px.
Les aplats et effets lumineux restent décoratifs et ne réduisent pas le
contraste en petit écran.

## À faire / À éviter

### À faire

- Ancrer l’interface dans les tokens du `@theme`.
- Garder l’identité GTA VI comme inspiration d’ambiance avec des éléments
  graphiques originaux.
- Distinguer clairement l’état aperçu des capacités réellement livrées.

### À éviter

- Copier les logos, artworks, polices de marque ou compositions Rockstar.
- Suggérer une compatibilité ou une intégration GTA VI inexistante.
- Inventer des données, un tableau de bord, une intégration ou des routes
  fonctionnelles qui ne sont pas implémentées.
