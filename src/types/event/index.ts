export interface Participant {
  name: string;
}

export interface Tag {
  id: string;
  name: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:MM
  endTime: string;   // HH:MM
  location: string;
  participants: Participant[]; // 이제 name만!
  tags: Tag[];
}
