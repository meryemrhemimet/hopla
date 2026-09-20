export type TextReview = {
  id: string;
  type: "text";
  name: string;
  city?: string;
  quote: string;
  productSlug?: string;
  placeholder?: boolean;
};

export type ScreenshotReview = {
  id: string;
  type: "screenshot";
  name: string;
  city?: string;
  src: string;
  alt: string;
  productSlug?: string;
  placeholder?: boolean;
};

export type Review = TextReview | ScreenshotReview;

export const reviews: Review[] = [
  {
    id: "amina-casa-dino-bleu",
    type: "text",
    name: "Amina",
    city: "Casablanca",
    productSlug: "matelas-nomade-dino-bleu",
    quote:
      "Super pratique pour les sorties. Mon fils reconnait son petit coin tout de suite et s'installe sans stress.",
  },
  {
    id: "salma-rabat-koala",
    type: "text",
    name: "Salma",
    city: "Rabat",
    productSlug: "matelas-nomade-koala-dream",
    quote:
      "Le motif koala est tres doux. Je le roule en deux minutes et il garde bien sa forme dans le sac.",
  },
  {
    id: "yasmine-marrakech-panda",
    type: "text",
    name: "Yasmine",
    city: "Marrakech",
    productSlug: "couverture-panda",
    quote:
      "La couverture panda a fait son petit effet. Elle est jolie sur le lit et facile a prendre pour la creche.",
  },
  {
    id: "nora-tanger-sous-leau",
    type: "text",
    name: "Nora",
    city: "Tanger",
    productSlug: "matelas-nomade-sous-leau",
    quote:
      "Les couleurs sont joyeuses sans etre trop fortes. Parfait pour les siestes chez les grands-parents.",
  },
];
