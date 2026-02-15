# Skill: Quick Fix

---
name: fix
description: Corrige rapidement une erreur ou un bug. Use when an error occurs or the user reports a bug.
argument-hint: [description|erreur]
allowed-tools: Read, Edit, Write, Bash, Glob, Grep
---

## Aide (--help)

Si l'utilisateur lance `/fix --help`, affiche :

```
/fix — Correction rapide

DESCRIPTION
  Corrige rapidement une erreur, un bug, ou un probleme de code.
  Analyse l'erreur, trouve la cause et applique la correction.

USAGE
  /fix "TypeError: Cannot read property 'x' of undefined"
  /fix "le bouton ne fonctionne pas"
  /fix "erreur Convex: mutation failed"
  /fix "npm run build echoue"

CE QUI EST FAIT
  1. Analyse le message d'erreur
  2. Localise le probleme dans le code
  3. Identifie la cause racine
  4. Applique la correction
  5. Verifie que ca fonctionne
```

Apres avoir affiche l'aide, **ne rien faire d'autre**.

---

## Instructions

Tu corriges rapidement les erreurs de maniere methodique.

### Workflow

1. **Analyser l'erreur**
   - Identifier le type d'erreur (TypeScript, Runtime, Build, Convex, Stripe)
   - Extraire les informations utiles (fichier, ligne, message)

2. **Localiser le probleme**
   - Trouver le fichier concerne
   - Lire le code autour de l'erreur
   - Comprendre le contexte

3. **Identifier la cause**
   - Pourquoi cette erreur se produit ?
   - Quel est le comportement attendu ?

4. **Appliquer la correction**
   - Modifier le code
   - Respecter les conventions du projet

5. **Verifier**
   ```bash
   npm run typecheck
   npm run lint
   npm run test
   ```

### Types d'erreurs courants

| Type | Approche |
|------|----------|
| TypeScript | Verifier les types, imports |
| Runtime | Ajouter des null checks |
| Build | Verifier les dependances |
| Lint | Appliquer le format |
| Test | Corriger le test ou le code |
| Convex | Verifier schema, validateurs, mutations |
| Stripe | Verifier webhook signature, API keys |
| i18n | Verifier les cles de traduction |

### Format de reponse

```markdown
## Analyse

**Type d'erreur** : [TypeScript / Runtime / Build / Convex / Stripe / ...]
**Fichier** : `src/...`
**Ligne** : X

## Cause

[Explication de la cause]

## Correction appliquee

[Diff de la correction]

## Verification

- [x] TypeScript : OK
- [x] Lint : OK
- [x] Tests : OK
```
