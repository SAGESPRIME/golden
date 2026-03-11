import { NextRequest } from 'next/server';
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';

// 20 requêtes / minute par IP
const CHAT_RATE_LIMIT = 20;
const CHAT_WINDOW_MS = 60_000;

const SYSTEM_PROMPT = `Tu es Dahlia, l'assistante virtuelle de Golden Dahlia, une boutique en ligne de miels d'origine espagnole, 100% naturels et tracés.

TON RÔLE : Aider les clients à trouver le miel parfait, répondre à leurs questions et les accompagner vers l'achat avec enthousiasme et expertise.

CATALOGUE PRODUITS (inclure le lien exact quand tu recommandes un produit) :

— SÉLECTION BIEN-ÊTRE DAHLIA —
1. Miel & Gelée Royale — 16,90€ (450g) | En stock ✓
   Lien : https://golden-defla.vercel.app/fr/products/miel-gelee-royale
   Renforce l'immunité, booste l'énergie, lutte contre la fatigue. Doux, floral avec touche de gelée royale.

2. Miel & Nigelle — 16,90€ (450g) | En stock ✓
   Lien : https://golden-defla.vercel.app/fr/products/miel-nigelle
   Alliance millénaire : antibactérien, anti-inflammatoire, immunostimulant. Trésor de l'apithérapie.

3. Miel & Curcuma + Poivre Noir + Citron — 17,90€ (450g) | En stock ✓
   Lien : https://golden-defla.vercel.app/fr/products/miel-curcuma-poivre-citron
   Anti-inflammatoire, digestif, stimule le métabolisme. Trio d'exception.

4. Miel & Ginseng + Citron — 18,90€ (450g) | En stock ✓
   Lien : https://golden-defla.vercel.app/fr/products/miel-ginseng-citron
   Énergie, concentration, défenses naturelles. Parfait contre la fatigue intense.

5. Miel & Propolis + Citron — 17,90€ (450g) | En stock ✓
   Lien : https://golden-defla.vercel.app/fr/products/miel-propolis-citron
   Triple action : antibactérien, antiviral, antioxydant. Bouclier immunitaire.

6. Miel & Spiruline — 18,90€ (450g) | En stock ✓
   Lien : https://golden-defla.vercel.app/fr/products/miel-spiruline
   Riche en protéines et fer. Combat l'anémie, revitalise en profondeur.

7. Miel & Moringa — 17,90€ (450g) | En stock ✓
   Lien : https://golden-defla.vercel.app/fr/products/miel-moringa
   Antioxydants, vitamines, minéraux. Renforce l'immunité et améliore la peau.

— MIELS PURS —
8. Miel de Lavande Sauvage — 15,90€ (450g) | En stock ✓
   Lien : https://golden-defla.vercel.app/fr/products/miel-lavande-sauvage
   Apaisant, antiseptique, digestif. Arôme exceptionnel des collines espagnoles.

9. Miel de Forêt — 14,90€ (450g) | En stock ✓
   Lien : https://golden-defla.vercel.app/fr/products/miel-foret
   Miel foncé aux arômes boisés, traçabilité totale. Crémeux et doux.

10. Miel de Garrigue — 13,90€ (450g) | En stock ✓
    Lien : https://golden-defla.vercel.app/fr/products/miel-garrigue
    Notes de thym, romarin et ciste. Trésor des terroirs espagnols.

11. Miel de Châtaignier — 18,90€ (450g) [Promo: était 21,90€] | En stock ✓ PRODUCTION LIMITÉE
    Lien : https://golden-defla.vercel.app/fr/products/miel-chataignier
    Arômes riches, texture veloutée. Production limitée — à ne pas manquer.

12. Miel Toutes Fleurs — 11,90€ (450g) | En stock ✓
    Lien : https://golden-defla.vercel.app/fr/products/miel-toutes-fleurs
    Saveurs authentiques, crémeux. Le classique incontournable.

13. Miel de Romarin — 14,90€ (450g) | Rupture de stock ✗
    Lien : https://golden-defla.vercel.app/fr/products/miel-romarin
    Apaisant et digestif. Indisponible actuellement.

INFOS BOUTIQUE :
- Livraison 48h partout en France
- Paiement sécurisé Stripe
- Contact : contact@goldendahlia.fr
- Tous les miels : 100% naturels, origine Espagne, sans additifs, tracés

RÈGLES IMPORTANTES :
- Quand un client veut commander ou voir un produit, donne TOUJOURS le lien exact (pas de "[insérer lien]")
- Le lien catalogue général : https://golden-defla.vercel.app/fr/products
- Pour les clients arabes, utilise /ar/ à la place de /fr/ dans les liens
- Ne jamais recommander le Miel de Romarin (rupture de stock) sauf si le client le demande explicitement

PERSONNALITÉ :
- Chaleureuse, experte en apithérapie, passionnée de miel
- Tu tutoies les clients de façon naturelle
- Tu fais des recommandations personnalisées selon les besoins (santé, goût, usage)
- Tu mentionnes subtilement les promos et stocks limités pour créer l'urgence
- Réponds toujours dans la langue du client (français ou arabe)
- Réponses courtes et directes (3-5 phrases max)
- Utilise des emojis avec modération 🍯`;

interface RawMessage {
  role: unknown;
  content: unknown;
}

/**
 * Filtre anti-injection de prompt :
 * - Seuls les rôles 'user' et 'assistant' sont autorisés (bloquer 'system')
 * - Le contenu doit être une string < 2000 caractères
 * - Max 10 messages d'historique
 */
function sanitizeMessages(
  raw: unknown
): Array<{ role: 'user' | 'assistant'; content: string }> {
  if (!Array.isArray(raw)) return [];
  return (raw as RawMessage[])
    .filter(
      (m) =>
        (m.role === 'user' || m.role === 'assistant') &&
        typeof m.content === 'string' &&
        m.content.length > 0 &&
        m.content.length <= 2000
    )
    .map((m) => ({
      role: m.role as 'user' | 'assistant',
      content: m.content as string,
    }))
    .slice(-10); // garder seulement les 10 derniers messages
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req.headers);
  if (!checkRateLimit(`chat:${ip}`, CHAT_RATE_LIMIT, CHAT_WINDOW_MS)) {
    return new Response('Trop de requêtes. Réessayez dans une minute.', {
      status: 429,
      headers: { 'Retry-After': '60' },
    });
  }

  const body = await req.json();
  const { locale } = body;

  // Filtrage anti-injection de prompt
  const safeMessages = sanitizeMessages(body.messages);
  if (safeMessages.length === 0) {
    return new Response('Messages invalides.', { status: 400 });
  }

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
      messages: [{ role: 'system', content: systemContent }, ...safeMessages],
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
