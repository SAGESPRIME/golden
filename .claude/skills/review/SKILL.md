# Skill: Code Review

---
name: review
description: Fait une review du code modifie. Use when code has been changed or when the user wants feedback on code quality.
argument-hint: [fichier|dossier] [--help]
allowed-tools: Read, Glob, Grep, Bash
---

## Aide (--help)

Si l'utilisateur lance `/review --help`, affiche :

```
/review — Review du code

DESCRIPTION
  Analyse le code modifie et fournit un feedback structure :
  qualite, bugs potentiels, securite, performance.

USAGE
  /review                    Review des fichiers modifies (git)
  /review src/components/    Review d'un dossier specifique
  /review src/app/page.tsx   Review d'un fichier specifique

CE QUI EST VERIFIE
  - Qualite du code (lisibilite, maintenabilite)
  - Bugs potentiels (null checks, edge cases)
  - Securite (injections, XSS, donnees sensibles, Stripe)
  - Performance (re-renders, requetes Convex)
  - Conventions du projet (TypeScript strict, i18n)
  - Support RTL (arabe)
  - Tests manquants
```

Apres avoir affiche l'aide, **ne rien faire d'autre**.

---

## Instructions

Tu fais une review de code professionnelle et constructive pour Golden Defla.

### Workflow

1. **Identifier les fichiers a review**
   - Si aucun argument : `git diff --name-only` (fichiers modifies)
   - Si argument : fichier ou dossier specifie

2. **Lire et analyser chaque fichier**
   - Consulter les agents dans `.claude/agents/` pour les conventions
   - Verifier les conventions du projet

3. **Generer le rapport**

### Format du rapport

```markdown
## Resume

[X fichiers analyses, Y problemes trouves]

## Points positifs

- [Ce qui est bien fait]

## Problemes a corriger

### [Fichier 1]
- **Ligne X** : [Description du probleme]
  **Suggestion** : [Comment corriger]

## Suggestions d'amelioration

- [Ameliorations optionnelles]

## Tests recommandes

- [ ] [Test a ajouter]
```

### Checklist specifique Golden Defla

- [ ] TypeScript : types corrects, pas de `any`
- [ ] i18n : tous les textes visibles sont traduits (FR + AR)
- [ ] RTL : composants compatibles direction arabe
- [ ] Convex : validateurs sur les arguments, requetes optimisees
- [ ] Stripe : pas de donnees carte stockees, webhook securise
- [ ] Performance : pas de re-renders inutiles
- [ ] Securite : pas d'injection, donnees validees
- [ ] Accessibilite : labels, aria-*, focus
