# Skill: PRD Generator

---
name: prd
description: Genere un PRD detaille avec clarifications et user stories
argument-hint: [description] [--help]
allowed-tools: Read, Write, AskUserQuestion, Glob, Grep
disable-model-invocation: true
---

## Aide (--help)

Si `/prd --help`, affiche :

```
/prd — Generateur de PRD

DESCRIPTION
  Genere un PRD (Product Requirements Document) structure.
  Force les clarifications pour eliminer les ambiguites.

USAGE
  /prd "Description de la feature"
  /prd --help

WORKFLOW COMPLET
  1. /constitution          → Definir les principes (une fois)
  2. /prd "description"     → Generer le PRD
  3. /plan                  → Plan technique
  4. /ralph                 → Lancer l'implementation

CE QUI EST CREE
  → specs/XXX-nom-feature-YYYY-MM-DD/prd.md
```

---

## Instructions

Tu generes un PRD structure en forcant les clarifications.

### Workflow

1. **Verifier la constitution**
   - Si `specs/constitution.md` n'existe pas, suggerer `/constitution`

2. **Analyser le codebase**
   - Lire `CLAUDE.md` pour le contexte
   - Scanner les features existantes
   - Identifier les patterns a reutiliser

3. **Phase de clarification** (OBLIGATOIRE)

   Poser des questions via `AskUserQuestion` pour eliminer les ambiguites :

   **Clarifications obligatoires** :
   - Qui sont les utilisateurs de cette feature ?
   - Quels sont les 3 cas d'usage principaux ?
   - Y a-t-il des contraintes techniques specifiques ?

   **Clarifications conditionnelles** :
   - Si UI : Quels composants principaux ? (formulaire, liste, modal...)
   - Si donnees : Schema Convex necessaire ? Quelles collections ?
   - Si paiement : Integration Stripe necessaire ?
   - Si i18n : Specificites FR/AR pour cette feature ?

   **Marquer les incertitudes** :
   - Si une reponse reste vague, ajouter `[NEEDS CLARIFICATION]` dans le PRD

4. **Decouper en user stories**
   - Petites (1 contexte = 1 story)
   - Independantes autant que possible
   - Avec dependances explicites (`blockedBy`)

5. **Creer le dossier spec**
   - Format : `specs/XXX-nom-feature-YYYY-MM-DD/`
   - XXX = numero incremental (001, 002, 003...)
   - Verifier le dernier numero existant dans `specs/`

6. **Generer** `specs/XXX-nom-feature-YYYY-MM-DD/prd.md`

### Format du PRD

```markdown
# PRD: [Feature Name]

> Spec : XXX-[feature]-[date]
> Cree le : [DATE]
> Constitution : specs/constitution.md

## Contexte

### Utilisateurs cibles
[Qui utilise cette feature]

### Probleme a resoudre
[Quel probleme on resout]

### Objectifs
- [Objectif 1]
- [Objectif 2]

## Clarifications

### Questions posees

| Question | Reponse |
|----------|---------|
| Utilisateurs ? | [Reponse] |
| Cas d'usage ? | [Reponse] |
| Contraintes ? | [Reponse] |

### Points a clarifier

> [NEEDS CLARIFICATION] : [Point ambigu restant]

## Perimetre

### Inclus
- [Ce qui est inclus]

### Exclus
- [Ce qui n'est PAS inclus]

## User Stories

### US-001: [Titre]

**Priorite** : 1
**Bloque par** : -
**Estimation** : S/M/L

**Description** :
En tant que [utilisateur], je veux [action] afin de [benefice].

**Criteres d'acceptation** :
- [ ] [Critere fonctionnel 1]
- [ ] [Critere fonctionnel 2]
- [ ] typecheck passe
- [ ] tests passent
- [ ] Traductions FR + AR presentes
- [ ] Compatible RTL

**Notes techniques** :
[Indices pour l'implementation]

---

## Criteres de succes globaux

- [ ] Toutes les US implementees
- [ ] Tests > 80% coverage
- [ ] Pas d'erreur TypeScript
- [ ] Traductions completes FR + AR
- [ ] Compatible RTL
- [ ] Review effectuee
```
