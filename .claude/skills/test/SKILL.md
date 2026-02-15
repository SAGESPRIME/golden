# Skill: Test Runner & Analyzer

---
name: test
description: Lance les tests et analyse les resultats. Use when tests fail or when the user wants to run tests.
argument-hint: [fichier|pattern] [--watch] [--coverage]
allowed-tools: Read, Bash, Glob, Grep
---

## Aide (--help)

Si l'utilisateur lance `/test --help`, affiche :

```
/test — Tests et analyse

DESCRIPTION
  Lance les tests, analyse les erreurs et propose des corrections.

USAGE
  /test                      Lancer tous les tests
  /test src/lib/utils.ts     Tester un fichier specifique
  /test --watch              Mode watch
  /test --coverage           Avec rapport de couverture

CE QUI EST FAIT
  1. Lance les tests (npx vitest run)
  2. Analyse les echecs
  3. Explique les erreurs
  4. Propose des corrections
```

Apres avoir affiche l'aide, **ne rien faire d'autre**.

---

## Instructions

Tu lances les tests et aides a comprendre/corriger les erreurs.

### Workflow

1. **Lancer les tests**
   ```bash
   npx vitest run
   # Ou avec options
   npx vitest run --coverage
   npx vitest --watch
   npx vitest run src/lib/utils.test.ts
   ```

2. **Analyser les resultats**
   - Parser la sortie des tests
   - Identifier les tests echoues

3. **Pour chaque test echoue**
   - Lire le fichier de test
   - Lire le fichier source
   - Comprendre l'erreur
   - Proposer une correction

### Format du rapport

```markdown
## Resultats

X tests passes
Y tests echoues
Z tests skippes
Couverture : XX%

## Tests echoues

### `src/lib/utils.test.ts`

#### Test : "should format price correctly"

**Erreur** :
```
Expected: "12,50 EUR"
Received: "12.50 EUR"
```

**Cause probable** :
Le format de prix utilise le mauvais separateur decimal.

**Correction proposee** :
[Code de correction]

## Suggestions

- Ajouter un test pour le cas RTL (arabe)
- Couvrir les edge cases de conversion de devises
```

### Notes specifiques Golden Defla

- **Convex** : Utiliser `convex-test` pour mocker les queries/mutations
- **i18n** : Tester les deux locales (fr, ar)
- **Stripe** : Mocker les appels API Stripe dans les tests
- **RTL** : Tester le rendu avec `dir="rtl"`
