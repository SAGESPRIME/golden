# Onboarding automatique

## Detection de nouveau projet

Quand l'utilisateur demarre une conversation sur ce projet, **verifie d'abord l'etat du projet** avant de repondre a sa demande.

### Fichiers a verifier

| Fichier | Signification |
|---------|---------------|
| `specs/constitution.md` | Principes definis |
| `specs/*/prd.md` | PRD existant |
| `specs/*/plan.md` | Plan technique |
| `specs/*/prd.json` | Ralph configure |
| `src/**/*.{ts,tsx}` | Code existant |

### Comportement selon l'etat

#### Projet vierge (rien n'existe)

Si c'est la **premiere interaction** et que le projet est vierge :

```
Bienvenue sur Golden Defla ! Je vois que c'est un nouveau projet.

Pour commencer efficacement, je te propose de suivre le workflow Ralph :

1. /constitution — Definir les principes du projet (5 min)
2. /prd "ta feature" — Specifier ce que tu veux construire
3. /plan — Creer le plan technique
4. /ralph — Lancer l'implementation autonome

Tu veux qu'on commence par /constitution ?
```

Puis attendre la reponse avant de continuer.

#### Constitution existe, pas de PRD

```
Constitution definie !

Prochaine etape : creer ton premier PRD.
Decris-moi la feature que tu veux construire, ou lance /prd "description".
```

#### PRD existe, pas de Plan

```
PRD cree pour [feature] !

Prochaine etape : creer le plan technique.
Lance /plan pour definir l'architecture.
```

#### Tout est pret, Ralph pas lance

```
Tout est pret pour Ralph !

- Constitution : OK
- PRD : OK [feature]
- Plan : OK

Lance /ralph pour demarrer l'implementation autonome.
```

#### Ralph en cours

```
Ralph est en cours sur [feature].

Statut : X/Y stories completees

Pour reprendre : ./.claude/scripts/ralph/ralph.sh specs/[dir] 25
Pour voir le statut : cat specs/*/prd.json | jq '.userStories[] | {id, title, status}'
```

### Exceptions

**Ne PAS proposer l'onboarding si** :
- L'utilisateur demande explicitement autre chose (bug fix, question, etc.)
- L'utilisateur tape une commande slash (`/...`)
- Le message contient "skip", "passer", "ignore"

Dans ces cas, repondre directement a la demande.

### Commande /start

L'utilisateur peut lancer `/start` a tout moment pour voir l'etat du projet et les prochaines etapes recommandees.
