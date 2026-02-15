# Workflow de developpement

## Utilisation des agents

Ce projet utilise des agents specialises. Consulte leurs conventions avant de travailler.

### Architecture et structure

Quand tu travailles sur l'architecture, le routing, ou la structure du projet :
→ Consulte `.claude/agents/fullstack-architect.md`

**Inclut** :
- Creation de nouvelles pages
- Structure des composants
- Routing et navigation (App Router + i18n)
- Performance et optimisation
- State management (Zustand)
- Integration Convex (queries, mutations, actions)
- Support RTL pour l'arabe
- Integration Stripe (checkout, webhooks)

### Git et GitHub

Quand tu travailles sur les branches, PR, ou releases :
→ Consulte `.claude/agents/git-workflow.md`

**Inclut** :
- Gestion des branches
- Pull requests
- Merges et releases
- Resolution de conflits

## Regles generales

1. **Toujours consulter l'agent pertinent** avant de commencer une tache
2. **Respecter les conventions** definies dans chaque agent
3. **TypeScript strict** : pas de `any`, types explicites
4. **i18n** : tout texte visible doit etre traduit (FR + AR)
5. **RTL** : tester chaque composant en mode RTL
6. **Convex** : utiliser les validateurs Convex (`v.`) pour les arguments
7. **Stripe** : ne jamais stocker de donnees de carte, utiliser Checkout Session

## Skills disponibles

| Skill | Usage |
|-------|-------|
| `/start` | Point d'entree : detecte l'etat et guide |
| `/init` | Initialiser le projet (dependances, structure) |
| `/constitution` | Definir les principes du projet |
| `/prd [feature]` | Creer un PRD avec user stories |
| `/plan` | Creer le plan technique |
| `/ralph` | Lancer l'implementation autonome |
| `/review` | Faire une review du code modifie |
| `/test` | Lancer les tests et analyser les erreurs |
| `/fix [erreur]` | Corriger une erreur specifique |
