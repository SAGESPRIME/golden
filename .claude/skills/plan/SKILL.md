# Skill: Technical Plan

---
name: plan
description: Cree un plan technique d'implementation a partir d'un PRD
argument-hint: [--help]
allowed-tools: Read, Write, Glob, Grep, AskUserQuestion
disable-model-invocation: true
---

## Aide (--help)

Si `/plan --help`, affiche :

```
/plan — Plan technique

DESCRIPTION
  Cree un plan technique d'implementation a partir d'un PRD.
  Definit l'architecture, les fichiers a creer, et le data model.

USAGE
  /plan                     Plan pour le dernier PRD cree
  /plan --help              Afficher cette aide

PREREQUIS
  → PRD existant (cree avec /prd)
  → Constitution du projet (cree avec /constitution)

CE QUI EST CREE
  Dans le meme dossier que le PRD (specs/XXX-feature-date/) :
  → plan.md        Architecture et decisions
  → data-model.md  Modele de donnees (schema Convex)
  → contracts.md   Interfaces TypeScript
```

---

## Instructions

Tu crees un plan technique detaille a partir d'un PRD.

### Workflow

1. **Detecter le dernier dossier spec**
   ```bash
   ls -d specs/[0-9]*/ | sort -r | head -1
   ```

2. **Lire les fichiers requis**
   - `specs/constitution.md` (principes a respecter)
   - Le PRD dans le dossier spec detecte
   - `CLAUDE.md` (stack du projet)

3. **Analyser le codebase existant**
   - Structure des dossiers
   - Schema Convex existant (`convex/schema.ts`)
   - Composants reutilisables
   - Fichiers de traduction existants

4. **Poser des questions de clarification** si necessaire

5. **Generer les fichiers du plan** dans le dossier spec

### Format des fichiers

#### plan.md

```markdown
# Plan technique : [Feature Name]

> Spec : XXX-[feature]-[date]
> PRD : ./prd.md
> Constitution : ../constitution.md

## Vue d'ensemble

[Resume de l'approche technique]

## Decisions d'architecture

### 1. [Decision]

**Choix** : [Option choisie]
**Alternatives considerees** : [Autres options]
**Justification** : [Pourquoi ce choix]

## Structure des fichiers

```
src/
├── app/[locale]/[feature]/
│   ├── page.tsx
│   └── layout.tsx
├── components/[feature]/
│   ├── [Component].tsx
│   └── [Component].test.tsx
├── convex/
│   └── [feature].ts
└── messages/
    ├── fr.json    # + nouvelles cles
    └── ar.json    # + nouvelles cles
```

## Fichiers a creer

| Fichier | Description | US liee |
|---------|-------------|---------|
| `src/components/X/Y.tsx` | Composant principal | US-001 |

## Fichiers a modifier

| Fichier | Modification | Raison |
|---------|--------------|--------|
| `convex/schema.ts` | Ajouter table | Nouveau modele |
| `messages/fr.json` | Ajouter cles | Traduction FR |
| `messages/ar.json` | Ajouter cles | Traduction AR |

## Dependances

### Packages a installer

```bash
npm install [package]
```

### Composants shadcn/ui a ajouter

```bash
npx shadcn@latest add [component]
```
```

#### data-model.md

```markdown
# Data Model : [Feature Name]

## Schema Convex

```typescript
// convex/schema.ts
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  [table]: defineTable({
    field: v.string(),
  }),
});
```

## Relations

```
[Entity A] 1──n [Entity B]
```
```

#### contracts.md

```markdown
# Contracts : [Feature Name]

## Types TypeScript

```typescript
export interface [Entity] {
  _id: Id<"[table]">;
  // ...
}

export interface [Component]Props {
  // ...
}
```
```
