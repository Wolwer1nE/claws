export type Language = 'ru' | 'en';

export interface Translations {
  // Navigation
  home: string;
  courses: string;
  allCourses: string;

  // Course page
  ourCourses: string;
  courseNotFound: string;
  backToCourses: string;
  joinMeeting: string;
  telegramChat: string;
  lessonsSchedule: string;
  scheduleNotReady: string;
  lessonsWillBeAdded: string;
  startLearning: string;
  moreDetails: string;
  watchRecording: string;

  // Lesson types
  lecture: string;
  practice: string;

  // Common
  loading: string;
  loadingCourses: string;
  loadingCourse: string;

  // Home page
  autumnSemester: string;

  // Time
  at: string;
}
