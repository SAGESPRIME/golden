import { mutation } from './_generated/server';

const seedProducts = [
  {
    name: { fr: 'Miel de Lavande Bio', ar: 'عسل اللافندر العضوي' },
    description: {
      fr: 'Miel de lavande recolte en Provence, certifie bio. Doux, floral et delicat.',
      ar: 'عسل لافندر يُحصد في بروفانس، معتمد عضوي. حلو وزهري ورقيق.',
    },
    slug: 'miel-lavande-bio',
    price: 3500,
    images: ['/images/products/miel-lavande-1.jpg'],
    category: 'flower',
    weight: 500,
    inStock: true,
    featured: true,
  },
  {
    name: { fr: "Miel de Foret d'Ardeche", ar: 'عسل غابة أرديش' },
    description: {
      fr: "Miel sombre et puissant, recolte dans les forets d'Ardeche. Notes de caramel et de sous-bois.",
      ar: 'عسل داكن وقوي، يُحصد من غابات أرديش. نكهات الكراميل والأعشاب.',
    },
    slug: 'miel-foret-ardeche',
    price: 4200,
    compareAtPrice: 4800,
    images: [
      '/images/products/miel-ardeche-1.jpg',
      '/images/products/miel-ardeche-2.jpg',
    ],
    category: 'forest',
    weight: 500,
    inStock: true,
    featured: true,
  },
  {
    name: { fr: 'Miel de Fleurs des Vosges', ar: 'عسل أزهار الفوج' },
    description: {
      fr: 'Miel doux et floral, issu des prairies fleuries des Vosges. Ideal pour les tisanes.',
      ar: 'عسل حلو وزهري، من مروج الفوج المزهرة. مثالي للمشروبات الساخنة.',
    },
    slug: 'miel-fleurs-vosges',
    price: 2800,
    images: ['/images/products/miel-vosges-1.jpg'],
    category: 'flower',
    weight: 250,
    inStock: true,
    featured: false,
  },
  {
    name: { fr: 'Miel de Chataignier des Cevennes', ar: 'عسل كستناء سيفين' },
    description: {
      fr: 'Miel rare de chataignier, repute pour son gout boise et intense. Production limitee.',
      ar: 'عسل كستناء نادر، معروف بنكهته الخشبية والغنية. إنتاج محدود.',
    },
    slug: 'miel-chataignier-cevennes',
    price: 8500,
    images: [
      '/images/products/miel-cevennes-1.jpg',
      '/images/products/miel-cevennes-2.jpg',
    ],
    category: 'rare',
    weight: 250,
    inStock: true,
    featured: true,
  },
  {
    name: { fr: 'Miel Bio Toutes Fleurs', ar: 'عسل عضوي متعدد الأزهار' },
    description: {
      fr: 'Miel biologique certifie, recolte dans les campagnes francaises. Pur et non transforme.',
      ar: 'عسل عضوي معتمد، يُحصد من الريف الفرنسي. نقي وغير معالج.',
    },
    slug: 'miel-bio-toutes-fleurs',
    price: 5200,
    images: ['/images/products/miel-bio-1.jpg'],
    category: 'organic',
    weight: 500,
    inStock: true,
    featured: false,
  },
  {
    name: {
      fr: 'Miel de Romarin de Provence',
      ar: 'عسل إكليل الجبل من بروفانس',
    },
    description: {
      fr: 'Miel delicat aux notes de romarin, recolte dans les garrigues de Provence.',
      ar: 'عسل رقيق بنكهة إكليل الجبل، يُحصد من أراضي بروفانس.',
    },
    slug: 'miel-romarin-provence',
    price: 3200,
    images: ['/images/products/miel-romarin-1.jpg'],
    category: 'flower',
    weight: 500,
    inStock: false,
    featured: false,
  },
  {
    name: { fr: 'Miel de Sapin des Vosges', ar: 'عسل صنوبر الفوج' },
    description: {
      fr: 'Miel ambree de sapin des Vosges. Texture cremeuse et gout equilibre, riche en mineraux.',
      ar: 'عسل صنوبر عنبري من الفوج. قوام كريمي ونكهة متوازنة، غني بالمعادن.',
    },
    slug: 'miel-sapin-vosges',
    price: 3800,
    images: [
      '/images/products/miel-sapin-1.jpg',
      '/images/products/miel-sapin-2.jpg',
    ],
    category: 'forest',
    weight: 500,
    inStock: true,
    featured: false,
  },
];

export const products = mutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query('products').first();
    if (existing) return 'Products already seeded';

    for (const product of seedProducts) {
      await ctx.db.insert('products', product);
    }
    return `Seeded ${seedProducts.length} products`;
  },
});
