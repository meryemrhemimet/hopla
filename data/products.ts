export type ProductImage = {
  src: string;
  alt: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  price: number | null;
  category: "Tapis de sieste" | "Couvertures";
  ageRange?: string;
  shortDescription: string;
  description: string;
  details?: {
    material?: string;
    dimensions?: string;
    care?: string;
    color?: string;
    other?: string[];
  };
  images: ProductImage[];
  video?: string;
  sizes?: string[];
  colors?: string[];
  badge?: "new" | "popular";
  inStock: boolean;
  createdAt: string;
};

export const products: Product[] = [
  {
    id: "nap-dino-bleu",
    slug: "matelas-nomade-dino-bleu",
    name: "Tapis de sieste Dino bleu",
    price: 399,
    category: "Tapis de sieste",
    ageRange: "TODO: confirmer l'âge conseillé",
    shortDescription:
      "Motif dinosaures bleu et jaune, pensé pour les siestes et les petites sorties.",
    description:
      "Modèle nomade avec motif dinosaures. Les photos montrent un ensemble roulable avec oreiller intégré ou assorti.",
    details: {
      material: "TODO: confirmer la matière",
      dimensions: "TODO: confirmer les dimensions",
      care: "TODO: confirmer les conseils d'entretien",
      color: "Bleu, jaune, blanc",
    },
    images: [
      { src: "/images/dino.png", alt: "Tapis de sieste Hopla motif dinosaures bleu et jaune" },
      { src: "/images/product.png", alt: "Aperçu des nouveaux motifs Hopla avec modèle Dino bleu" },
    ],
    colors: ["Bleu"],
    badge: "popular",
    inStock: true,
    createdAt: "2026-09-10",
  },
  {
    id: "nap-dino-green",
    slug: "matelas-nomade-dino-green",
    name: "Tapis de sieste Dino green",
    price: 399,
    category: "Tapis de sieste",
    ageRange: "TODO: confirmer l'âge conseillé",
    shortDescription:
      "Motif dinosaures verts et roses, avec une ambiance douce et ludique.",
    description:
      "Modèle nomade motif Dino green. Les visuels montrent le produit roulé et déplié.",
    details: {
      material: "TODO: confirmer la matière",
      dimensions: "TODO: confirmer les dimensions",
      care: "TODO: confirmer les conseils d'entretien",
      color: "Vert, rose, beige",
    },
    images: [
      { src: "/images/dino_vert.png", alt: "Tapis de sieste Hopla Dino green déplié" },
      { src: "/images/Dinosaur_20260910_095758_0000.png", alt: "Tapis de sieste Hopla Dino green roulé" },
    ],
    colors: ["Vert"],
    badge: "new",
    inStock: true,
    createdAt: "2026-09-10",
  },
  {
    id: "nap-dino-jaune",
    slug: "matelas-nomade-dino-jaune",
    name: "Tapis de sieste Dino jaune",
    price: 399,
    category: "Tapis de sieste",
    ageRange: "TODO: confirmer l'âge conseillé",
    shortDescription:
      "Version lumineuse du motif dinosaure, avec détails jaunes et orange.",
    description:
      "Modèle nomade Dino jaune. Les photos fournies montrent le produit roulé sur fond illustré.",
    details: {
      material: "TODO: confirmer la matière",
      dimensions: "TODO: confirmer les dimensions",
      care: "TODO: confirmer les conseils d'entretien",
      color: "Jaune, orange, bleu clair",
    },
    images: [
      { src: "/images/dino_jaune.png", alt: "Tapis de sieste Hopla Dino jaune roulé" },
      { src: "/images/dino_jaune2.jpg", alt: "Deuxième photo du tapis de sieste Dino jaune" },
    ],
    colors: ["Jaune"],
    inStock: true,
    createdAt: "2026-09-10",
  },
  {
    id: "nap-sous-leau",
    slug: "matelas-nomade-sous-leau",
    name: "Tapis de sieste Sous l'eau",
    price: 399,
    category: "Tapis de sieste",
    ageRange: "TODO: confirmer l'âge conseillé",
    shortDescription:
      "Motif marin bleu clair avec poissons, coraux et tortue.",
    description:
      "Modèle nomade inspiré du monde marin. Le visuel fourni montre le produit roulé avec son motif aquatique.",
    details: {
      material: "TODO: confirmer la matière",
      dimensions: "TODO: confirmer les dimensions",
      care: "TODO: confirmer les conseils d'entretien",
      color: "Bleu clair, multicolore",
    },
    images: [
      { src: "/images/sous_leau.png", alt: "Tapis de sieste Hopla Sous l'eau roulé" },
      { src: "/images/product2.png", alt: "Aperçu du motif marin Hopla" },
    ],
    colors: ["Bleu"],
    badge: "new",
    inStock: true,
    createdAt: "2026-09-10",
  },
  {
    id: "nap-koala",
    slug: "matelas-nomade-koala-dream",
    name: "Tapis de sieste Koala dream",
    price: 399,
    category: "Tapis de sieste",
    ageRange: "TODO: confirmer l'âge conseillé",
    shortDescription:
      "Motif koala rose, doux et joyeux pour les moments de repos.",
    description:
      "Modèle nomade Koala dream. Le visuel fourni montre le produit roulé avec motifs koalas et feuillage.",
    details: {
      material: "TODO: confirmer la matière",
      dimensions: "TODO: confirmer les dimensions",
      care: "TODO: confirmer les conseils d'entretien",
      color: "Rose, vert, gris",
    },
    images: [
      { src: "/images/koala_dream.png", alt: "Tapis de sieste Hopla Koala dream roulé" },
    ],
    colors: ["Rose"],
    inStock: true,
    createdAt: "2026-09-10",
  },
  {
    id: "nap-elephant",
    slug: "matelas-nomade-elephants-rayures",
    name: "Tapis de sieste Éléphants rayés",
    price: 399,
    category: "Tapis de sieste",
    ageRange: "TODO: confirmer l'âge conseillé",
    shortDescription:
      "Motif animaux sur rayures roses, avec éléphants, girafes et petits véhicules.",
    description:
      "Modèle nomade avec rayures roses et animaux. Les photos montrent le produit déplié et un détail de motif.",
    details: {
      material: "TODO: confirmer la matière",
      dimensions: "TODO: confirmer les dimensions",
      care: "TODO: confirmer les conseils d'entretien",
      color: "Rose, blanc, bleu doux",
    },
    images: [
      { src: "/images/elephant.png", alt: "Tapis de sieste Hopla motif éléphants et rayures roses" },
      { src: "/images/elephant2.png", alt: "Détail du motif éléphants Hopla" },
    ],
    colors: ["Rose"],
    inStock: true,
    createdAt: "2026-09-10",
  },
  {
    id: "blanket-panda",
    slug: "couverture-panda",
    name: "Couverture Panda",
    price: 159,
    category: "Couvertures",
    ageRange: "TODO: confirmer l'âge conseillé",
    shortDescription:
      "Couverture motif panda disponible en tons jaune et bleu selon les photos.",
    description:
      "Couverture à motif panda. Les photos fournies montrent une version jaune et une version bleue.",
    details: {
      material: "TODO: confirmer la matière",
      dimensions: "TODO: confirmer les dimensions",
      care: "TODO: confirmer les conseils d'entretien",
      color: "Jaune ou bleu",
    },
    images: [
      { src: "/images/panda2.png", alt: "Couverture Hopla Panda jaune pliée" },
      { src: "/images/blanket_panda.png", alt: "Couvertures Hopla Panda jaune et bleue" },
    ],
    colors: ["Jaune", "Bleu"],
    badge: "new",
    inStock: true,
    createdAt: "2026-09-09",
  },
  {
    id: "blanket-broderie",
    slug: "couverture-broderie-fleurie",
    name: "Couverture broderie fleurie",
    price: 149,
    category: "Couvertures",
    ageRange: "TODO: confirmer l'âge conseillé",
    shortDescription:
      "Couverture brodée aux détails fleuris, avec finitions douces et colorées.",
    description:
      "Couverture brodée. Les photos montrent plusieurs variations de couleurs avec détails floraux.",
    details: {
      material: "TODO: confirmer la matière",
      dimensions: "TODO: confirmer les dimensions",
      care: "TODO: confirmer les conseils d'entretien",
      color: "Rose, blanc, bleu selon modèle",
    },
    images: [
      { src: "/images/blanket.jpg", alt: "Couverture Hopla brodée rose" },
      { src: "/images/blanket2.png", alt: "Couverture Hopla brodée blanche et bleue" },
      { src: "/images/blanket3.png", alt: "Autre variation de couverture brodée Hopla" },
    ],
    colors: ["Rose", "Blanc"],
    inStock: true,
    createdAt: "2026-09-09",
  },
];

export const categories = Array.from(new Set(products.map((product) => product.category)));

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getRelatedProducts(product: Product, limit = 4) {
  return products
    .filter((item) => item.id !== product.id)
    .sort((a, b) => {
      if (a.category === product.category && b.category !== product.category) return -1;
      if (a.category !== product.category && b.category === product.category) return 1;
      return Date.parse(b.createdAt) - Date.parse(a.createdAt);
    })
    .slice(0, limit);
}
