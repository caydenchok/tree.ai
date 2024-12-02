export interface ScheduleItem {
  id: string;
  courseName: string;
  instructor: string;
  startTime: string;
  endTime: string;
  type: 'lecture' | 'assignment' | 'exam';
  status: 'upcoming' | 'ongoing' | 'completed';
  link?: string;
}

export interface CalendarEvent {
  title: string;
  start: string;
  end: string;
  backgroundColor: string;
  borderColor: string;
  extendedProps: {
    instructor: string;
    type: string;
    status: string;
    link?: string;
  };
}
