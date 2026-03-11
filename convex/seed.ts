import { mutation } from './_generated/server';

const dahliaProducts = [
  {
    name: { fr: 'Miel & Gelée Royale', ar: 'عسل وغذاء الملكات' },
    description: {
      fr: "Sélection Bien-Être DAHLIA. Le miel et la gelée royale s'unissent pour une combinaison puissante : renforcent l'immunité, boostent l'énergie et luttent contre la fatigue. Doux, floral et légèrement sucré, avec une touche distinctive de la gelée royale. 100% Agriculture Naturel — Origine Espagne.",
      ar: 'تشكيلة العناية من داليا. يجتمع العسل وغذاء الملكات في توليفة قوية: تعزز المناعة وتزيد الطاقة وتكافح الإرهاق. حلو وزهري مع لمسة مميزة من غذاء الملكات. 100% طبيعي — أصل إسبانيا.',
    },
    slug: 'miel-gelee-royale',
    price: 1690,
    images: ['/images/products/9.jpg'],
    category: 'bien-etre',
    weight: 450,
    inStock: true,
    featured: true,
  },
  {
    name: { fr: 'Miel de Lavande Sauvage', ar: 'عسل اللافندر البري' },
    description: {
      fr: "Issu des fleurs de lavande sauvage récoltées dans l'arrière-pays espagnol. Ce miel rare et aromatique est légèrement apaisant, antiseptique et digestif. Il offre une expérience gustative unique — tout en douceur, parfait pour votre bien-être. Origine Espagne.",
      ar: 'من أزهار اللافندر البري في الريف الإسباني. عسل نادر وعطري، مهدئ طفيف، مطهر ومساعد على الهضم. تجربة فريدة بكل رقة — مثالي لعنايتك. أصل إسبانيا.',
    },
    slug: 'miel-lavande-sauvage',
    price: 1590,
    images: ['/images/products/miel-lavande-1.png'],
    category: 'lavande',
    weight: 450,
    inStock: true,
    featured: true,
  },
  {
    name: { fr: 'Miel de Forêt', ar: 'عسل الغابة' },
    description: {
      fr: "Dahlia sélectionne et récolte pour vous les meilleurs miels des grandes forêts espagnoles. Ce miel foncé aux arômes boisés garantit une traçabilité totale : origine certifiée, pureté contrôlée rigoureusement. Bois, crémeux, d'une douceur incomparable. Origine Espagne.",
      ar: 'تختار داليا وتحصد لكم أجود عسل من الغابات الإسبانية الكبيرة. هذا العسل الداكن ذو النكهة الخشبية يضمن التتبع الكامل: أصل معتمد ونقاء مُراقَب بدقة. خشبي وكريمي. أصل إسبانيا.',
    },
    slug: 'miel-foret',
    price: 1490,
    images: ['/images/products/FORETMIEL.jpg'],
    category: 'foret',
    weight: 450,
    inStock: true,
    featured: true,
  },
  {
    name: { fr: 'Miel de Garrigue', ar: 'عسل الغريك' },
    description: {
      fr: 'Principalement cultivé en Espagne, ce miel de garrigue provient de terroirs soigneusement sélectionnés où les abeilles butinent dans les plaines. Ses arômes de thym, romarin et ciste en font un trésor de la nature. Parfait pour un goûter convivial. Origine Espagne.',
      ar: 'يُزرع أساساً في إسبانيا، يأتي عسل الغريك من أراضٍ منتقاة بعناية. نكهات الزعتر وإكليل الجبل تجعله كنزاً طبيعياً. مثالي للتناول العائلي. أصل إسبانيا.',
    },
    slug: 'miel-garrigue',
    price: 1390,
    images: ['/images/products/miel-sapin-1.png'],
    category: 'foret',
    weight: 450,
    inStock: true,
    featured: false,
  },
  {
    name: { fr: 'Miel de Châtaignier', ar: 'عسل الكستناء' },
    description: {
      fr: "Que vous l'aimiez à la cuillère, sur une tartine ou infusé dans une tisane, le miel de châtaignier Dahlia vous invite à un voyage gustatif unique. Ses arômes riches et sa texture veloutée en font un ingrédient précieux. Production limitée — Origine Espagne.",
      ar: 'سواء أحببته بالملعقة أو على الخبز أو في الشاي، يدعوك عسل كستناء داليا لرحلة فريدة. نكهاته الغنية وقوامه المخملي يجعلانه مكوناً ثميناً. إنتاج محدود — أصل إسبانيا.',
    },
    slug: 'miel-chataignier',
    price: 1890,
    compareAtPrice: 2190,
    images: ['/images/products/miel-cevennes-1.png'],
    category: 'rare',
    weight: 450,
    inStock: true,
    featured: true,
  },
  {
    name: { fr: 'Miel Toutes Fleurs', ar: 'عسل متعدد الأزهار' },
    description: {
      fr: "Le miel est l'un des trésors les plus précieux de la ruche. Notre miel toutes fleurs, idéal pour les amateurs de saveurs authentiques, provient de terroirs espagnols soigneusement sélectionnés. Bois, crémeux et d'une douceur incomparable. Origine Espagne.",
      ar: 'العسل أحد أثمن كنوز الخلية. عسل متعدد الأزهار لدينا يأتي من أراضٍ إسبانية منتقاة بعناية. كريمي وبحلاوة لا مثيل لها. أصل إسبانيا.',
    },
    slug: 'miel-toutes-fleurs',
    price: 1190,
    images: ['/images/products/miel-bio-1.png'],
    category: 'fleurs',
    weight: 450,
    inStock: true,
    featured: false,
  },
  {
    name: { fr: 'Miel de Romarin', ar: 'عسل إكليل الجبل' },
    description: {
      fr: "Récolté dans les collines espagnoles parfumées au romarin sauvage. Ce miel clair et délicat est reconnu pour ses vertus apaisantes et digestives. Chaque goutte est le reflet d'un terroir préservé, offrant des saveurs uniques et une richesse nutritionnelle incomparable. Origine Espagne.",
      ar: 'يُحصد في التلال الإسبانية العطرة بإكليل الجبل البري. معروف بفوائده المهدئة والهضمية. كل قطرة تعكس أرضاً محفوظة تقدم نكهات فريدة. أصل إسبانيا.',
    },
    slug: 'miel-romarin',
    price: 1490,
    images: ['/images/products/miel-romarin-1.png'],
    category: 'fleurs',
    weight: 450,
    inStock: false,
    featured: false,
  },
  {
    name: { fr: 'Miel & Nigelle', ar: 'عسل والحبة السوداء' },
    description: {
      fr: "Sélection Bien-Être DAHLIA. Le miel et la nigelle forment une alliance millénaire aux vertus exceptionnelles : antibactériennes, anti-inflammatoires et immunostimulantes. Ce duo légendaire, trésor de l'apithérapie, fortifie l'organisme en profondeur. 100% Agriculture Naturel — Origine Espagne.",
      ar: 'تشكيلة العناية من داليا. يشكّل العسل والحبة السوداء تحالفاً عريقاً بخواص استثنائية: مضادة للبكتيريا، مضادة للالتهابات ومعززة للمناعة. هذا الثنائي الأسطوري كنز من الطب بالنحل. 100% طبيعي — أصل إسبانيا.',
    },
    slug: 'miel-nigelle',
    price: 1690,
    images: ['/images/products/mnig.jpg'],
    category: 'bien-etre',
    weight: 450,
    inStock: true,
    featured: false,
  },
  {
    name: {
      fr: 'Miel & Curcuma + Poivre Noir + Citron',
      ar: 'عسل والكركم والفلفل الأسود والليمون',
    },
    description: {
      fr: "Sélection Bien-Être DAHLIA. Ce mélange puissant associe le miel au curcuma anti-inflammatoire, au poivre noir qui renforce la digestion, et au citron qui stimule le métabolisme et optimise l'absorption de la curcumine. Un trio d'exception. 100% Agriculture Naturel — Origine Espagne.",
      ar: 'تشكيلة العناية من داليا. يجمع هذا المزيج القوي العسل مع الكركم المضاد للالتهابات، والفلفل الأسود لتحسين الهضم، والليمون الذي يحفز التمثيل الغذائي ويعزز امتصاص الكركمين. 100% طبيعي — أصل إسبانيا.',
    },
    slug: 'miel-curcuma-poivre-citron',
    price: 1790,
    images: ['/images/products/mcu.jpg'],
    category: 'bien-etre',
    weight: 450,
    inStock: true,
    featured: true,
  },
  {
    name: { fr: 'Miel & Ginseng + Citron', ar: 'عسل والجينسنغ والليمون' },
    description: {
      fr: "Sélection Bien-Être DAHLIA. Le miel et le ginseng s'associent au citron pour une combinaison revitalisante : stimulent l'énergie, améliorent la concentration et renforcent les défenses naturelles. Parfait pour les moments de fatigue intense. 100% Agriculture Naturel — Origine Espagne.",
      ar: 'تشكيلة العناية من داليا. يتحد العسل والجينسنغ مع الليمون لمزيج منشط: يحفز الطاقة ويحسّن التركيز ويعزز دفاعات الجسم الطبيعية. مثالي في أوقات التعب الشديد. 100% طبيعي — أصل إسبانيا.',
    },
    slug: 'miel-ginseng-citron',
    price: 1890,
    images: ['/images/products/mgin.jpg'],
    category: 'bien-etre',
    weight: 450,
    inStock: true,
    featured: false,
  },
  {
    name: { fr: 'Miel & Propolis + Citron', ar: 'عسل والعكبر والليمون' },
    description: {
      fr: "Sélection Bien-Être DAHLIA. La propolis, bouclier naturel de la ruche, s'unit au miel et au citron pour une triple action défensive : antibactérienne, antivirale et antioxydante. Un allié exceptionnel pour votre système immunitaire. 100% Agriculture Naturel — Origine Espagne.",
      ar: 'تشكيلة العناية من داليا. العكبر، الدرع الطبيعي للخلية، يتحد مع العسل والليمون لعمل دفاعي ثلاثي: مضاد للبكتيريا، للفيروسات وللأكسدة. حليف استثنائي لمناعتك. 100% طبيعي — أصل إسبانيا.',
    },
    slug: 'miel-propolis-citron',
    price: 1790,
    images: ['/images/products/mpro.jpg'],
    category: 'bien-etre',
    weight: 450,
    inStock: true,
    featured: false,
  },
  {
    name: { fr: 'Miel & Spiruline', ar: 'عسل والسبيرولينا' },
    description: {
      fr: "Sélection Bien-Être DAHLIA. La spiruline, super-aliment riche en protéines et en fer, combinée au miel crée une synergie nutritionnelle exceptionnelle. Booste l'énergie, combat l'anémie et revitalise l'organisme en profondeur. 100% Agriculture Naturel — Origine Espagne.",
      ar: 'تشكيلة العناية من داليا. السبيرولينا، الغذاء الخارق الغني بالبروتينات والحديد، مع العسل تخلق تآزراً غذائياً استثنائياً. تعزز الطاقة وتكافح فقر الدم وتنشّط الجسم. 100% طبيعي — أصل إسبانيا.',
    },
    slug: 'miel-spiruline',
    price: 1890,
    images: ['/images/products/10.jpg'],
    category: 'bien-etre',
    weight: 450,
    inStock: true,
    featured: false,
  },
  {
    name: { fr: 'Miel & Moringa', ar: 'عسل والمورينغا' },
    description: {
      fr: "Sélection Bien-Être DAHLIA. Le miel et le moringa offrent une combinaison puissante d'antioxydants, de vitamines et de minéraux, renforçant le système immunitaire, luttant contre la fatigue et améliorant la santé de la peau. Légèrement herbacé, équilibré par la douceur du miel. 100% Agriculture Naturel — Origine Espagne.",
      ar: 'تشكيلة العناية من داليا. يقدم العسل والمورينغا مزيجاً قوياً من مضادات الأكسدة والفيتامينات والمعادن، يعزز المناعة ويكافح الإرهاق ويحسّن صحة البشرة. 100% طبيعي — أصل إسبانيا.',
    },
    slug: 'miel-moringa',
    price: 1790,
    images: ['/images/products/mmor.jpg'],
    category: 'bien-etre',
    weight: 450,
    inStock: true,
    featured: false,
  },
];

export const seedProducts = mutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query('products').first();
    if (existing) return 'Products already seeded';
    for (const product of dahliaProducts) {
      await ctx.db.insert('products', product);
    }
    return `Seeded ${dahliaProducts.length} products`;
  },
});

export const clearAndReseed = mutation({
  args: {},
  handler: async (ctx) => {
    // Delete all existing products
    const all = await ctx.db.query('products').collect();
    for (const p of all) {
      await ctx.db.delete(p._id);
    }
    // Insert DAHLIA products
    for (const product of dahliaProducts) {
      await ctx.db.insert('products', product);
    }
    return `Cleared and reseeded ${dahliaProducts.length} DAHLIA products`;
  },
});
