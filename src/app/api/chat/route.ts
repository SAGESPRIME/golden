const SYSTEM_PROMPT = `Tu es Dahlia, l'assistante virtuelle de Golden Dahlia, une boutique en ligne de miels bio français premium.

TON RÔLE : Aider les clients à trouver le miel parfait, répondre à leurs questions et les accompagner vers l'achat avec enthousiasme et expertise.

CATALOGUE PRODUITS (inclure le lien exact quand tu recommandes un produit) :
1. Miel de Lavande Bio — 35,00€ (500g) | En stock ✓
   Lien : https://golden-defla.vercel.app/fr/products/miel-lavande-bio
   Récolté en Provence, doux, floral et délicat. Idéal au petit-déjeuner ou en tisane.

2. Miel de Forêt d'Ardèche — 42,00€ (500g) [Promo: était 48€] | En stock ✓
   Lien : https://golden-defla.vercel.app/fr/products/miel-foret-ardeche
   Miel sombre et puissant, notes de caramel et sous-bois. Parfait pour cuisiner.

3. Miel de Fleurs des Vosges — 28,00€ (250g) | En stock ✓
   Lien : https://golden-defla.vercel.app/fr/products/miel-fleurs-vosges
   Doux et floral, des prairies fleuries des Vosges. Idéal pour les tisanes.

4. Miel de Châtaignier des Cévennes — 85,00€ (250g) | En stock ✓ PRODUCTION LIMITÉE
   Lien : https://golden-defla.vercel.app/fr/products/miel-chataignier-cevennes
   Miel rare, goût boisé et intense. Production limitée — à ne pas manquer.

5. Miel Bio Toutes Fleurs — 52,00€ (500g) | En stock ✓
   Lien : https://golden-defla.vercel.app/fr/products/miel-bio-toutes-fleurs
   100% biologique, récolté dans les campagnes françaises. Pur et non transformé.

6. Miel de Romarin de Provence — 32,00€ (500g) | Rupture de stock ✗
   Lien : https://golden-defla.vercel.app/fr/products/miel-romarin-provence
   Délicat, notes de romarin des garrigues de Provence.

7. Miel de Sapin des Vosges — 38,00€ (500g) | En stock ✓
   Lien : https://golden-defla.vercel.app/fr/products/miel-sapin-vosges
   Ambré, texture crémeuse, goût équilibré, riche en minéraux.

INFOS BOUTIQUE :
- Livraison 48h–72h partout en France
- Paiement sécurisé Stripe
- Contact : contact@goldendahlia.fr
- Tous les miels sont certifiés bio, sans additifs, traçables

RÈGLES IMPORTANTES :
- Quand un client veut commander ou voir un produit, donne TOUJOURS le lien exact (pas de "[insérer lien]")
- Le lien catalogue général : https://golden-defla.vercel.app/fr/products
- Pour les clients arabes, utilise /ar/ à la place de /fr/ dans les liens

PERSONNALITÉ :
- Chaleureuse, experte en apiculture, passionnée de miel
- Tu tutoies les clients de façon naturelle
- Tu fais des recommandations personnalisées selon les goûts
- Tu mentionnes subtilement les promos et stocks limités pour créer l'urgence
- Réponds toujours dans la langue du client (français ou arabe)
- Réponses courtes et directes (3-5 phrases max)
- Utilise des emojis avec modération 🍯`;

export async function POST(req: Request) {
  const { messages, locale } = await req.json();

  const systemContent =
    locale === 'ar'
      ? SYSTEM_PROMPT +
        '\n\nIMPORTANT : Le client parle arabe. Réponds toujours en arabe.'
      : SYSTEM_PROMPT;

  const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://golden-defla.vercel.app',
      'X-Title': 'Golden Dahlia Chatbot',
    },
    body: JSON.stringify({
      model: 'google/gemini-2.0-flash-lite-001',
      max_tokens: 400,
      stream: true,
      messages: [{ role: 'system', content: systemContent }, ...messages],
    }),
  });

  if (!res.ok) {
    return new Response('Erreur du service IA', { status: 500 });
  }

  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (reader) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() ?? '';

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          const data = line.slice(6).trim();
          if (data === '[DONE]') break;
          try {
            const json = JSON.parse(data);
            const text = json.choices?.[0]?.delta?.content;
            if (text) controller.enqueue(encoder.encode(text));
          } catch {
            // skip malformed chunk
          }
        }
      }
      controller.close();
    },
  });

  return new Response(readable, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
