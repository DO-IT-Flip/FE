import { TAG_COLOR } from "@styles/tag_color";
export interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:MM
  endTime: string;   // HH:MM
  location: string;
  participants: string;
  tagColor?: keyof typeof TAG_COLOR;
  category: string;
  tagIcon?: string;
}
