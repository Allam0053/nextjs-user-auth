const nachos = {
  TITLE: "FLAMIN HOT NACHOS",
  TITLE_P1: "FLAMIN HOT",
  TITLE_P2: "NACHOS",
  DESCRIPTION: `Presenting the Classic Nachos with a Flaming Hot Twist. It will Rock your taste buds with Chilli & Lime.`,
  BUTTON: "FLAMIN HOT NACHOS",
} as const;
const tomato = {
  TITLE: "TOMATO TWIST" as const,
  TITLE_P1: "TOMATO SWEET",
  TITLE_P2: "TWIST",
  DESCRIPTION: `Presenting the Classic Nachos with a Flaming Hot Twist. It will Rock your taste buds with Chilli & Lime.`,
  BUTTON: "TOMATO TWIST",
} as const;
const crunchex = {
  TITLE: "CRUNCHEX CHILLI" as const,
  TITLE_P1: "CRUNCHEX CRUNCH",
  TITLE_P2: "CHILLI",
  DESCRIPTION: `Presenting the Classic Nachos with a Flaming Hot Twist. It will Rock your taste buds with Chilli & Lime.`,
  BUTTON: "CRUNCHEX CHILLI",
} as const;
const chaska = {
  TITLE: "CHAAT CHASKA" as const,
  TITLE_P1: "CHAAT UNIQUE",
  TITLE_P2: "CHASKA",
  DESCRIPTION: `Presenting the Classic Nachos with a Flaming Hot Twist. It will Rock your taste buds with Chilli & Lime.`,
  BUTTON: "CHAAT CHASKA",
} as const;
const wording = {
  nachos,
  tomato,
  crunchex,
  chaska,
  form: {
    VARIANT_LABEL: "Variants",
    QTY: "Quantity",
    SUBMIT: "Add to Cart",
  },
} as const;
export default wording;
