export const COLORS = {
  tag1: "#FF6B6B",
  tag2: "#FF884B",
  tag3: "#FFD93D",
  tag4: "#80B918",
  tag5: "#3FC1C9",
  tag6: "#4D96FF",
  tag7: "#5F6CAF",
  tag8: "#A076F9",
  tag9: "#C084FC",
  tag10: "#F472B6",
  tag11: "#A0E7E5",
  tag12: "#FFBCBC",
} as const;

export type ColorKey = keyof typeof COLORS;
export const COLOR_KEYS = Object.keys(COLORS) as ColorKey[];
