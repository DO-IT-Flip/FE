export const COLORS = {
  gray1: "#1F1F1F",
  gray2: "#3A3A3A",
  gray3: "#6E6E6E",
  gray4: "#B2B2B2",
  gray5: "#D8D8D8",
  gray6: "#F0F0F0",
  bg: "#FFFFFF",
} as const;

export type ColorKey = keyof typeof COLORS;
export const COLOR_KEYS = Object.keys(COLORS) as ColorKey[];
