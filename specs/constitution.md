# Constitution du projet Golden Defla

> Ces principes sont NON-NEGOCIABLES. Ralph doit les respecter a chaque implementation.

## Article I : Tests

**Approche : Test-first (TDD)**

- Les tests sont ecrits AVANT le code d'implementation
- Chaque feature commence par les tests unitaires et d'integration
- Un composant sans test ne peut pas etre merge
- Utiliser Vitest + React Testing Library
- Couvrir : logique metier, interactions utilisateur, cas limites
- Les helpers/utils doivent avoir des tests unitaires

## Article II : TypeScript

**Rigueur : Strict**

- `any` est INTERDIT, sans exception
- Types explicites pour chaque prop, argument et retour de fonction
- Interfaces pour toutes les props de composants
- Types partages dans `src/types/`
- Utiliser les validateurs Convex (`v.`) pour les arguments backend
- Zod pour la validation cote client

## Article III : Taille du code

**Limite : < 100 lignes par composant/fonction**

- Un composant React ne doit pas depasser 100 lignes
- Une fonction ne doit pas depasser 100 lignes
- Si la limite est atteinte, decomposer en sous-composants ou helpers
- Les fichiers de configuration et schemas sont exemptes de cette regle

## Article IV : Architecture

**Approche : Modulaire**

- Chaque feature = module isole avec ses propres composants, hooks et types
- Structure d'un module feature :
  ```
  src/features/[feature-name]/
  ├── components/    # Composants specifiques
  ├── hooks/         # Hooks specifiques
  ├── types.ts       # Types specifiques
  └── index.ts       # Exports publics
  ```
- Les composants partages restent dans `src/components/`
- Les hooks partages restent dans `src/hooks/`
- Pas de dependance circulaire entre modules

## Article V : Gestion des erreurs

**Approche : Pragmatique**

- Gerer explicitement les erreurs critiques :
  - Paiement Stripe (checkout, webhooks)
  - Authentification (Convex Auth)
  - Operations panier (ajout, modification, suppression)
  - Appels API / mutations Convex
- Utiliser les error boundaries React pour les erreurs UI
- Messages d'erreur traduits FR + AR
- Les erreurs non critiques remontent naturellement

## Article VI : Internationalisation

- Tout texte visible DOIT etre traduit (FR + AR)
- Support RTL obligatoire sur chaque composant
- Fichiers de traduction dans `src/messages/`
- Utiliser `useTranslations()` de next-intl pour les textes
- Tester chaque composant en mode LTR et RTL
- Utiliser des classes Tailwind logiques (`ms-`, `me-`, `ps-`, `pe-`) au lieu de `ml-`, `mr-`, `pl-`, `pr-`

## Article VII : Principes additionnels

- Utiliser `next/image` pour toutes les images
- Prix toujours en centimes (EUR), formater a l'affichage
- Ne jamais stocker de donnees de carte, utiliser Stripe Checkout Session
- Pas de `console.log` en production
- Pas de dependances lourdes (lodash, moment, etc.)
- Mobile-first responsive design
- Composants fonctionnels uniquement (pas de classes)

---

## Checklist de validation

Avant chaque commit, Ralph verifie :

- [ ] Tests ecrits AVANT le code et passent
- [ ] Pas de `any` dans le code
- [ ] Fichiers < 100 lignes (hors config/schemas)
- [ ] Feature isolee dans son module
- [ ] Textes traduits FR + AR
- [ ] Composant compatible RTL (classes logiques)
- [ ] Erreurs critiques gerees (paiement, auth, panier)
- [ ] Pas de `console.log`
- [ ] TypeScript strict sans erreur
