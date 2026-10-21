---
name: template-app
description: Spécification des tokens et du design system de base pour l'application.
colors:
  canvas: "#09090b"
  surface: "#18181b"
  surface-raised: "#27272a"
  border: "#3f3f46"
  content: "#fafafa"
  content-muted: "#a1a1aa"
  action: "#ffffff"
  action-hover: "#e4e4e7"
  action-content: "#09090b"
  accent: "#8b5cf6"
  focus: "#a855f7"
  danger: "#ef4444"
  success: "#22c55e"
typography:
  display:
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    fontSize: "clamp(2rem, 4vw, 3rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.03em"
  title:
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    fontSize: "1.25rem"
    fontWeight: 600
    letterSpacing: "-0.02em"
  body:
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  small: "0.875rem"
  micro: "0.75rem"
rounded:
  compact: "0.375rem"
  control: "0.5rem"
  panel: "0.75rem"
  pill: "999px"
spacing:
  xs: "0.25rem"
  sm: "0.5rem"
  md: "1rem"
  lg: "1.5rem"
  xl: "2rem"
---

# Design System Specification

## Vision

Ce document définit les tokens sémantiques et principes visuels de l'application. Il sert de contrat unique entre le design, le code et les assistants IA.

Pour personnaliser ce design system et adapter l'identité visuelle de votre produit, suivez les étapes décrites dans [SETUP.md](./SETUP.md).

## Tokens sémantiques

| Rôle Tailwind    | Usage                                                           |
| ---------------- | --------------------------------------------------------------- |
| `canvas`         | Arrière-plan principal de l'application                         |
| `surface`        | Surfaces élevées (cartes, barres, conteneurs de premier niveau) |
| `surface-raised` | Éléments interactifs au survol, boîtes de dialogue              |
| `border`         | Délimitations discrètes et séparateurs                          |
| `content`        | Typographie principale à contraste élevé                        |
| `content-muted`  | Typographie secondaire, légendes et métadonnées                 |
| `action`         | Boutons et contrôles interactifs principaux                     |
| `action-hover`   | État de survol de l'action principale                           |
| `accent`         | Éléments distinctifs et repères de navigation                   |
| `focus`          | Anneau de mise au point clavier visible                         |
| `danger`         | Erreurs, confirmations destructives                             |
| `success`        | Validations et indicateurs d'état nominal                       |

## Typographie & Échelle

- **Polices :** pile système sans-serif moderne privilégiant lisibilité et neutralité.
- **Hiérarchie :** contrastes de graisse et d'échelle prononcés (`display`, `title`, `body`, `small`, `micro`).

## Interactions & Mouvement

- Transitions courtes (150ms-200ms) basées sur l'accélération matérielle (`opacity`, `transform`).
- Respect strict de la préférence utilisateur `prefers-reduced-motion`.
- Focus clavier toujours visible (`outline-offset`, anneau distinct).
