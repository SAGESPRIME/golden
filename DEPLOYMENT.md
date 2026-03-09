# Guide de déploiement — Golden Defla

Ce guide vous permet de déployer Golden Defla sur vos propres comptes **Convex** et **Vercel** en moins d'une heure.

---

## Prérequis

- [ ] Compte [Convex](https://convex.dev) (gratuit)
- [ ] Compte [Vercel](https://vercel.com) (gratuit)
- [ ] Compte [Stripe](https://stripe.com) (gratuit pour démarrer)
- [ ] [Node.js 18+](https://nodejs.org) installé sur votre machine
- [ ] Accès au repository Git du projet

---

## Étape 1 — Cloner le projet

```bash
git clone <URL_DU_REPO> golden-defla
cd golden-defla
npm install
```

---

## Étape 2 — Créer le projet Convex

### 2.1 Se connecter à Convex

```bash
npx convex login
```

Cela ouvre votre navigateur. Connectez-vous avec votre compte Convex.

### 2.2 Initialiser le projet Convex

```bash
npx convex dev --once
```

- Choisissez **"Create a new project"**
- Donnez-lui un nom (ex: `golden-defla`)
- Convex crée automatiquement le fichier `.env.local` avec `NEXT_PUBLIC_CONVEX_URL`

> Notez l'URL affichée, elle ressemble à :
> `https://XXXXX.convex.cloud`

---

## Étape 3 — Générer les clés JWT (authentification)

L'authentification Convex Auth nécessite une paire de clés RSA. Exécutez ce script :

```bash
node -e "
const { generateKeyPairSync } = require('crypto');
const { privateKey, publicKey } = generateKeyPairSync('rsa', {
  modulusLength: 2048,
  publicKeyEncoding: { type: 'spki', format: 'pem' },
  privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
});

// Affiche la clé privée (JWT_PRIVATE_KEY)
console.log('=== JWT_PRIVATE_KEY ===');
console.log(privateKey);

// Génère le JWKS (clé publique au format JSON)
const keyBase64 = publicKey
  .replace('-----BEGIN PUBLIC KEY-----', '')
  .replace('-----END PUBLIC KEY-----', '')
  .replace(/\n/g, '');
console.log('=== JWKS (copier tel quel) ===');
console.log(JSON.stringify({ keys: [{ kty: 'RSA', use: 'sig', alg: 'RS256', n: keyBase64, e: 'AQAB' }] }));
"
```

> **Important :** Copiez et sauvegardez les deux valeurs dans un endroit sûr.

### 3.1 Configurer les variables Convex en production

```bash
# JWT_PRIVATE_KEY (coller la clé PEM complète)
printf '%s' '-----BEGIN PRIVATE KEY-----
VOTRE_CLE_PRIVEE_ICI
-----END PRIVATE KEY-----' | npx convex env set --prod JWT_PRIVATE_KEY

# JWKS (coller le JSON généré)
npx convex env set --prod JWKS '{"keys":[{"kty":"RSA","use":"sig","alg":"RS256","n":"VOTRE_N","e":"AQAB"}]}'

# CONVEX_SITE_URL (remplacer par votre URL Convex)
npx convex env set --prod CONVEX_SITE_URL https://XXXXX.convex.cloud
```

---

## Étape 4 — Configurer Stripe

### 4.1 Récupérer vos clés Stripe

Connectez-vous sur [dashboard.stripe.com](https://dashboard.stripe.com) :

- **Clé secrète** : `Développeurs` → `Clés API` → `Clé secrète` (commence par `sk_live_...`)
- **Clé publique** : `Clé publiable` (commence par `pk_live_...`)

> Pour les tests, utilisez les clés `sk_test_...` et `pk_test_...`

### 4.2 Créer le webhook Stripe

Dans Stripe : `Développeurs` → `Webhooks` → **Ajouter un endpoint**

- URL : `https://VOTRE-DOMAINE-VERCEL.vercel.app/api/webhooks/stripe`
- Événements à écouter : `checkout.session.completed`
- Copiez le **Secret de signature** du webhook (`whsec_...`)

---

## Étape 5 — Déployer Convex en production

```bash
npx convex deploy --yes
```

Cette commande déploie toutes les fonctions Convex (produits, commandes, auth) en production.

---

## Étape 6 — Déployer sur Vercel

### 6.1 Via l'interface Vercel (recommandé)

1. Allez sur [vercel.com/new](https://vercel.com/new)
2. Importez votre repository GitHub
3. Configurez les **variables d'environnement** (voir ci-dessous)
4. Cliquez sur **Deploy**

### 6.2 Via la CLI Vercel

```bash
npm install -g vercel
vercel login
vercel --prod
```

### Variables d'environnement à configurer dans Vercel

| Variable                             | Valeur                         | Où trouver                        |
| ------------------------------------ | ------------------------------ | --------------------------------- |
| `NEXT_PUBLIC_CONVEX_URL`             | `https://XXXXX.convex.cloud`   | Dashboard Convex                  |
| `STRIPE_SECRET_KEY`                  | `sk_live_...` ou `sk_test_...` | Dashboard Stripe                  |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | `pk_live_...` ou `pk_test_...` | Dashboard Stripe                  |
| `STRIPE_WEBHOOK_SECRET`              | `whsec_...`                    | Webhook Stripe créé à l'étape 4.2 |

> Les variables `JWT_PRIVATE_KEY`, `JWKS` et `CONVEX_SITE_URL` sont configurées directement dans Convex (étape 3), pas dans Vercel.

---

## Étape 7 — Alimenter la base de données (produits)

Une fois déployé, importez les produits de démonstration :

```bash
npx convex run seed:seedProducts --prod
```

> Si la commande n'existe pas, les produits du catalogue seront visibles via les données statiques intégrées au frontend.

---

## Étape 8 — Créer le premier compte administrateur

1. Ouvrez votre site : `https://VOTRE-DOMAINE.vercel.app/fr/auth/signup`
2. Créez un compte avec votre email
3. Puis exécutez cette commande pour lui attribuer le rôle admin :

```bash
npx convex run users:makeAdmin --prod '{"email":"VOTRE-EMAIL@exemple.com"}'
```

4. Accédez au panel admin : `https://VOTRE-DOMAINE.vercel.app/fr/admin`

---

## Étape 9 — Mettre à jour l'URL du webhook Stripe

Maintenant que vous connaissez votre URL Vercel définitive :

1. Retournez dans Stripe → `Développeurs` → `Webhooks`
2. Modifiez l'endpoint créé à l'étape 4.2
3. Mettez à jour l'URL avec votre domaine final

---

## Récapitulatif des URLs importantes

| Page             | URL                                              |
| ---------------- | ------------------------------------------------ |
| Site (FR)        | `https://DOMAINE.vercel.app/fr`                  |
| Site (AR)        | `https://DOMAINE.vercel.app/ar`                  |
| Panel Admin      | `https://DOMAINE.vercel.app/fr/admin`            |
| Inscription      | `https://DOMAINE.vercel.app/fr/auth/signup`      |
| Connexion        | `https://DOMAINE.vercel.app/fr/auth/login`       |
| Webhook Stripe   | `https://DOMAINE.vercel.app/api/webhooks/stripe` |
| Dashboard Convex | `https://dashboard.convex.dev`                   |

---

## Checklist finale

- [ ] Convex déployé (`npx convex deploy --prod`)
- [ ] Variables JWT configurées dans Convex
- [ ] Variables Stripe configurées dans Vercel
- [ ] Webhook Stripe créé et pointant vers la bonne URL
- [ ] Produits importés en base de données
- [ ] Compte admin créé
- [ ] Paiement test effectué avec succès (carte `4242 4242 4242 4242`)

---

## Support

En cas de problème, vérifiez :

1. Les **logs Convex** : `npx convex logs --prod`
2. Les **logs Vercel** : Dashboard Vercel → votre projet → `Functions`
3. Les **logs Stripe** : Dashboard Stripe → `Développeurs` → `Logs`

---

_Guide généré pour Golden Defla — Février 2026_
