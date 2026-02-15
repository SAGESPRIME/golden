# Skill: Project Constitution

---
name: constitution
description: Definit les principes architecturaux non-negociables du projet
argument-hint: [--help] [--edit]
allowed-tools: Read, Write, AskUserQuestion, Glob
disable-model-invocation: true
---

## Aide (--help)

Si `/constitution --help`, affiche :

```
/constitution — Principes du projet

DESCRIPTION
  Definit les principes architecturaux non-negociables du projet.
  Ces regles guident toutes les implementations de Ralph.

USAGE
  /constitution           Creer la constitution (interactif)
  /constitution --edit    Modifier la constitution existante
  /constitution --help    Afficher cette aide

CE QUI EST CREE
  → specs/constitution.md

EXEMPLES DE PRINCIPES
  - Test-first obligatoire
  - Pas de any en TypeScript
  - Composants < 200 lignes
  - Tout texte visible traduit FR + AR
  - Support RTL sur chaque composant
```

---

## Instructions

Tu definis les principes architecturaux du projet via un questionnaire.

### Workflow

1. **Verifier si constitution existe**
   - Si oui et pas `--edit` : afficher et proposer de modifier
   - Si non : lancer le questionnaire

2. **Questionnaire interactif**

   Poser ces questions via `AskUserQuestion` :

   **Q1 : Approche des tests**
   - Test-first (TDD) — Tests avant le code (Recommande)
   - Test-after — Tests apres le code
   - Minimal — Tests critiques uniquement

   **Q2 : Rigueur TypeScript**
   - Strict — No any, types explicites partout (Recommande)
   - Moderate — Any autorise en dernier recours
   - Flexible — Types optionnels

   **Q3 : Taille des composants/fonctions**
   - Petit (< 100 lignes) — Maximise la lisibilite
   - Moyen (< 200 lignes) — Equilibre (Recommande)
   - Flexible — Pas de limite stricte

   **Q4 : Architecture des features**
   - Modulaire — Chaque feature = module isole (Recommande)
   - Integree — Features dans la structure existante
   - Hybride — Selon la complexite

   **Q5 : Gestion des erreurs**
   - Exhaustive — Try/catch partout, messages explicites
   - Pragmatique — Erreurs critiques uniquement (Recommande)
   - Minimale — Laisser remonter

   **Q6 : Principes additionnels** (question ouverte)
   - Laisser l'utilisateur ajouter des regles custom
   - Suggerer : "Support RTL obligatoire", "Toute feature i18n FR+AR"

3. **Generer** `specs/constitution.md`

### Format de sortie

```markdown
# Constitution du projet Golden Defla

> Ces principes sont NON-NEGOCIABLES. Ralph doit les respecter a chaque implementation.

## Article I : Tests

[Approche choisie et details]

## Article II : TypeScript

[Rigueur choisie et details]

## Article III : Taille du code

[Limite choisie et details]

## Article IV : Architecture

[Approche choisie et details]

## Article V : Gestion des erreurs

[Approche choisie et details]

## Article VI : Internationalisation

- Tout texte visible DOIT etre traduit (FR + AR)
- Support RTL obligatoire sur chaque composant
- Fichiers de traduction dans messages/

## Article VII : Principes additionnels

[Principes custom de l'utilisateur]

---

## Checklist de validation

Avant chaque commit, Ralph verifie :

- [ ] Tests ecrits et passent
- [ ] Pas de `any` (si strict)
- [ ] Fichiers < X lignes
- [ ] Feature isolee (si modulaire)
- [ ] Textes traduits FR + AR
- [ ] Composant compatible RTL
- [ ] Erreurs gerees selon l'article V
```
