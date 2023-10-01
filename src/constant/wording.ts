const nachos = {
  TITLE: "FLAMIN HOT NACHOS",
  DESCRIPTION: `Presenting the Classic Nachos with a Flaming Hot Twist. It will Rock your taste buds with Chilli & Lime.`,
  BUTTON: "FLAMIN HOT NACHOS",
} as const;
const tomato = {
  TITLE: "TOMATO TWIST" as const,
  DESCRIPTION: `Presenting the Classic Nachos with a Flaming Hot Twist. It will Rock your taste buds with Chilli & Lime.`,
  BUTTON: "TOMATO TWIST",
} as const;
const crunchex = {
  TITLE: "CRUNCHEX CHILLI" as const,
  DESCRIPTION: `Presenting the Classic Nachos with a Flaming Hot Twist. It will Rock your taste buds with Chilli & Lime.`,
  BUTTON: "CRUNCHEX CHILLI",
} as const;
const chaska = {
  TITLE: "CHAAT CHASKA" as const,
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
