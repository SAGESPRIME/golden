# Skill: Project Initializer

---
name: init
description: Initialise le projet Golden Defla (dependances, configuration, verification). Use when starting a new project or after cloning.
argument-hint: [--help]
allowed-tools: Read, Write, Bash, Glob
---

## Aide (--help)

Si l'utilisateur lance `/init --help`, affiche :

```
/init — Initialisation du projet

DESCRIPTION
  Initialise le projet : installe les dependances, configure
  l'environnement et verifie que tout fonctionne.

USAGE
  /init          Initialiser le projet
  /init --help   Afficher cette aide

CE QUE CA FAIT
  1. Verifie les prerequis (Node.js, npm)
  2. Installe les dependances (npm install)
  3. Configure Convex (npx convex dev)
  4. Verifie TypeScript, ESLint, Prettier
  5. Affiche un resume
```

Apres avoir affiche l'aide, **ne rien faire d'autre**.

---

## Instructions

Tu initialises le projet Golden Defla pour qu'il soit pret a l'emploi.

### Etapes

1. **Verifier les prerequis**
   ```bash
   node --version  # Doit etre >= 18
   npm --version
   ```

2. **Installer les dependances**
   ```bash
   npm install
   ```

3. **Verifier la configuration**
   - TypeScript : `tsconfig.json` existe
   - ESLint : `.eslintrc` ou `eslint.config` existe
   - Prettier : `.prettierrc` ou `prettier.config` existe
   - Convex : `convex/` dossier existe

4. **Initialiser Convex** (si pas deja fait)
   ```bash
   npx convex dev
   ```

5. **Lancer les verifications**
   ```bash
   npm run lint
   npm run typecheck
   ```

6. **Afficher le resume**
   ```
   Projet Golden Defla initialise !

   Dependances : X packages installes
   TypeScript  : OK
   ESLint      : OK
   Convex      : OK

   Pour commencer :
      npm run dev          # Next.js
      npx convex dev       # Convex (dans un autre terminal)
   ```

### En cas d'erreur

Si une etape echoue, afficher l'erreur et proposer une solution.
