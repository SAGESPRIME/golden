# Guide de demarrage - Golden Defla

## Demarrage rapide

```bash
# 1. Lancer Claude Code
claude

# 2. Voir l'etat du projet et les prochaines etapes
/start
```

C'est tout. `/start` detecte l'etat et te guide automatiquement.

## Workflow Ralph

```
/start         →  Detecte l'etat, propose la suite
      ↓
/constitution  →  Principes du projet (une seule fois)
      ↓
/prd [feature] →  PRD avec user stories
      ↓
/plan          →  Plan technique
      ↓
/ralph         →  Implementation autonome + PR
```

## Skills disponibles

| Skill | Description |
|-------|-------------|
| `/start` | Point d'entree : detecte l'etat et guide |
| `/init` | Initialise le projet si necessaire |
| `/constitution` | Definir les principes du projet |
| `/prd [description]` | Creer un PRD |
| `/plan` | Creer le plan technique |
| `/ralph` | Lancer l'implementation autonome |
| `/review` | Review du code |
| `/test` | Lancer et analyser les tests |
| `/fix [erreur]` | Corriger une erreur |

## Agents disponibles

| Agent | Usage |
|-------|-------|
| `fullstack-architect` | Architecture Next.js + Convex, routing, i18n, performance |
| `git-workflow` | Branches, PR, merges, releases |

## MCP Servers

Les tokens sont dans `.mcp.json` a la racine. `.mcp.json` est dans `.gitignore`.

### Configuration des tokens

Ouvre `.mcp.json` et remplace les placeholders :

- `YOUR_BRIGHTDATA_TOKEN_HERE` → Token Bright Data (5000 requetes/mois gratuites sur brightdata.com)

### Verifier que ca fonctionne

```bash
claude
/mcp
```

## Surveiller Ralph

```bash
# Voir l'avancement
/start

# Ou manuellement
cat specs/*/prd.json | jq '.userStories[] | {id, status}'
```
