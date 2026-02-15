# Skill: Ralph Launcher

---
name: ralph
description: Convertit PRD+Plan en prd.json et lance la boucle autonome Ralph
argument-hint: [--dry-run] [--help]
allowed-tools: Read, Write, Glob, Bash
disable-model-invocation: true
---

## Aide (--help)

Si `/ralph --help`, affiche :

```
/ralph — Lanceur Ralph

DESCRIPTION
  Convertit le PRD et le Plan en prd.json, puis lance la boucle
  Ralph pour implementer les user stories.

USAGE
  /ralph              Convertir et lancer (detecte le dernier spec)
  /ralph --dry-run    Convertir sans lancer
  /ralph --pr         Creer une PR pour le spec actuel (sans lancer)
  /ralph --help       Afficher cette aide

PREREQUIS
  → specs/constitution.md
  → specs/XXX-feature-date/prd.md
  → specs/XXX-feature-date/plan.md (recommande)

WORKFLOW
  1. Detecte le dernier dossier spec
  2. Convertit prd.md → prd.json (dans le meme dossier)
  3. Initialise progress.txt (dans le meme dossier)
  4. Cree la branche si besoin
  5. Lance ralph.sh specs/XXX-feature-date 25
```

---

## Instructions

### Workflow

1. **Detecter le dernier dossier spec**
   ```bash
   ls -d specs/[0-9]*/ | sort -r | head -1
   ```

2. **Verifier les prerequis**
   - Constitution existe (`specs/constitution.md`) ?
   - PRD existe (`specs/XXX-feature-date/prd.md`) ?
   - Plan existe (`specs/XXX-feature-date/plan.md`) ? (warning si absent)

3. **Generer prd.json dans le dossier spec**

   Emplacement : `specs/XXX-feature-date/prd.json`

4. **Initialiser progress.txt dans le dossier spec**

   Emplacement : `specs/XXX-feature-date/progress.txt`

5. **Creer la branche** si elle n'existe pas

6. **Lancer ralph.sh** (sauf si `--dry-run`)
   ```bash
   ./.claude/scripts/ralph/ralph.sh specs/XXX-feature-date 25
   ```

### Format prd.json

```json
{
  "version": "2.0",
  "branchName": "feature/[nom]",
  "constitution": "specs/constitution.md",
  "spec": "specs/XXX-feature-date",
  "plan": "specs/XXX-feature-date/plan.md",
  "validation": {
    "preCommit": [
      "npm run typecheck",
      "npm run lint",
      "npx vitest run"
    ],
    "checklist": [
      "Tests ecrits",
      "Pas de any",
      "Fichiers < 200 lignes",
      "Traductions FR + AR",
      "Compatible RTL"
    ]
  },
  "userStories": [
    {
      "id": "US-001",
      "title": "Titre de la story",
      "description": "En tant que...",
      "acceptanceCriteria": ["Critere 1", "Critere 2"],
      "technicalNotes": "Utiliser le composant X",
      "filesToCreate": ["src/features/X/components/Y.tsx"],
      "filesToModify": ["src/app/[locale]/page.tsx"],
      "priority": 1,
      "blockedBy": [],
      "estimatedSize": "S",
      "status": "pending"
    }
  ]
}
```

### Status des stories

| Status | Description |
|--------|-------------|
| `pending` | Pas encore commencee |
| `in_progress` | En cours d'implementation |
| `completed` | Implementee et testee |
| `failed` | Echec (tests ne passent pas) |

### Option --pr (creation manuelle de PR)

Si `/ralph --pr` :

1. **Detecter le dossier spec actif**
2. **Lire prd.json** pour recuperer les infos
3. **Creer la PR** :

```bash
gh pr create --title "feat: [Feature Name]" --body "$(cat <<'EOF'
## Summary

Implementation of **[Feature Name]** according to the PRD.

**Spec**: `specs/XXX-feature-date/`

## Documentation

- PRD: `specs/XXX-feature-date/prd.md`
- Plan: `specs/XXX-feature-date/plan.md`
- Progress: `specs/XXX-feature-date/progress.txt`

## User Stories

- [x] US-001: [Title]
- [x] US-002: [Title]

## Test plan

- [ ] Typecheck passes
- [ ] Lint passes
- [ ] Tests pass
- [ ] i18n FR + AR verified
- [ ] RTL layout verified
- [ ] Manual review

---

Generated with Ralph Loop
EOF
)"
```
