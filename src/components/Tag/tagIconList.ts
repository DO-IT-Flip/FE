export const TAG_ICON_IDS = [
  "document",
  "alcohol",
  "friends",
  "hairsalon",
  "hospital",
  "coffee",
  "meal",
  "shopping",
  "sports",
  "school",
  "study",
  "book",
  "camera",
  "clock",
] as const;

export type TagIconId = (typeof TAG_ICON_IDS)[number];