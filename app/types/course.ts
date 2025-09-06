export interface Lesson {
  id: number;
  title: string;
  type: 'лекция' | 'практика';
  date: string;
  time: string;
  recordingLink?: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  image: string;
  meetingLink: string;
  telegramChat?: string;
  lessons?: Lesson[];
}

export interface CourseListItem {
  id: string;
  title: string;
  description: string;
  image: string;
  meetingLink: string;
  telegramChat?: string;
}
