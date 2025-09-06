import type { Course, CourseListItem } from "~/types/course";

export async function getCourses(): Promise<CourseListItem[]> {
  try {
    const response = await fetch('/data/courses.json');
    if (!response.ok) {
      throw new Error('Failed to fetch courses');
    }
    return await response.json();
  } catch (error) {
    console.error('Error loading courses:', error);
    return [];
  }
}

export async function getCourse(courseId: string): Promise<Course | null> {
  try {
    // Загружаем общую информацию о курсе
    const coursesResponse = await fetch('/data/courses.json');
    if (!coursesResponse.ok) {
      throw new Error('Failed to fetch courses list');
    }
    const courses: CourseListItem[] = await coursesResponse.json();
    const courseInfo = courses.find(course => course.id === courseId);

    if (!courseInfo) {
      return null;
    }

    // Загружаем расписание занятий для конкретного курса
    const scheduleResponse = await fetch(`/data/${courseId}.json`);
    if (!scheduleResponse.ok) {
      // Если расписание не найдено, возвращаем курс без занятий
      return {
        ...courseInfo,
        lessons: []
      };
    }

    const scheduleData = await scheduleResponse.json();

    // Объединяем общую информацию с расписанием
    return {
      ...courseInfo,
      lessons: scheduleData.lessons || []
    };
  } catch (error) {
    console.error(`Error loading course ${courseId}:`, error);
    return null;
  }
}
