export const TAG_COLOR = {
  red: "#FF6B6B",
  orange: "#FF884B",
  yellow: "#FFD93D",
  green: "#80B918",
  mint: "#3FC1C9",
  blue: "#4D96FF",
  navy: "#5F6CAF",
  purple: "#A076F9",
  violet: "#C084FC",
  pink: "#F472B6",
  aqua: "#A0E7E5",
  peach: "#FFBCBC",
} as const;

export type ColorKey = keyof typeof TAG_COLOR;
export const COLOR_KEYS = Object.keys(TAG_COLOR) as ColorKey[];