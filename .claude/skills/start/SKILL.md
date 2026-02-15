# Skill: Project Onboarding

---
name: start
description: Point d'entree du projet. Detecte l'etat et guide vers les prochaines etapes.
argument-hint: [--auto] [--help]
allowed-tools: Read, Glob, Bash, Skill
---

## Options

| Option | Description |
|--------|-------------|
| `--auto` | Lance automatiquement la prochaine etape sans demander |
| `--help` | Affiche l'aide |

## Instructions

Tu es le point d'entree du projet Golden Defla. Tu detectes l'etat et guides l'utilisateur.

### Etape 1 : Verifier l'initialisation

Verifie si le projet est initialise :

| Element | Chemin | Signification |
|---------|--------|---------------|
| package.json | `./package.json` | Projet npm initialise |
| node_modules | `./node_modules/` | Dependances installees |
| Config TS | `./tsconfig.json` | TypeScript configure |
| Convex | `./convex/` | Backend Convex configure |

**Si `node_modules/` n'existe pas** → Proposer `/init`

### Etape 2 : Verifier l'etat Ralph (si initialise)

| Element | Chemin |
|---------|--------|
| Constitution | `specs/constitution.md` |
| PRD | `specs/*/prd.md` |
| Plan | `specs/*/plan.md` |
| prd.json | `specs/*/prd.json` |

### Etape 3 : Afficher le statut

```
ETAT DU PROJET - Golden Defla

INITIALISATION
  Package.json    : [OK/MANQUANT]
  Dependances     : [OK/MANQUANT] → /init
  TypeScript      : [OK/MANQUANT]
  Convex          : [OK/MANQUANT]

RALPH
  Constitution    : [OK/MANQUANT] → /constitution
  PRD             : [OK] X feature(s) / [MANQUANT] → /prd
  Plan technique  : [OK/MANQUANT] → /plan
  Pret a lancer   : [OK] → /ralph

PROCHAINE ETAPE : [commande]
```

### Etape 4 : Proposer la prochaine etape

| Etat | Prochaine etape |
|------|-----------------|
| Pas de node_modules | `/init` |
| Pas de constitution | `/constitution` |
| Pas de PRD | `/prd` |
| Pas de plan | `/plan` |
| Tout pret | `/ralph` |

### Etape 5 : Executer ou demander

**Si `--auto` est passe** :
- Lance directement la prochaine etape avec le tool `Skill`

**Sinon** :
- Demande confirmation avant de lancer
- "Veux-tu que je lance [commande] ?"
