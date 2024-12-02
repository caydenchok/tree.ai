import React from 'react';
import { Box, useColorModeValue } from '@chakra-ui/react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarEvent } from './types';

interface CalendarViewProps {
  events: CalendarEvent[];
  onEventClick: (event: any) => void;
  onDateClick: (date: any) => void;
}

const CalendarView: React.FC<CalendarViewProps> = ({ events, onEventClick, onDateClick }) => {
  const calendarBg = "rgba(205, 246, 131, 0.02)";
  const borderColor = "rgba(205, 246, 131, 0.2)";
  const headerBg = "rgba(205, 246, 131, 0.05)";
  const todayBg = "rgba(205, 246, 131, 0.1)";
  const eventColors = ['#FF6B6B', '#4FACFE', '#43E97B'];

  return (
    <Box
      bg={calendarBg}
      borderRadius="xl"
      overflow="hidden"
      border="1px solid"
      borderColor={borderColor}
      boxShadow="0 4px 20px rgba(205, 246, 131, 0.1)"
      backdropFilter="blur(10px)"
      p={4}
      sx={{
        '.fc': {
          height: '750px',
          '--fc-border-color': borderColor,
          '--fc-button-text-color': '#CDF683',
          '--fc-button-bg-color': 'rgba(205, 246, 131, 0.1)',
          '--fc-button-border-color': 'rgba(205, 246, 131, 0.3)',
          '--fc-button-hover-bg-color': 'rgba(205, 246, 131, 0.15)',
          '--fc-button-hover-border-color': 'rgba(205, 246, 131, 0.4)',
          '--fc-button-active-bg-color': 'rgba(205, 246, 131, 0.2)',
          '--fc-button-active-border-color': 'rgba(205, 246, 131, 0.5)',
          '--fc-event-bg-color': 'rgba(205, 246, 131, 0.15)',
          '--fc-event-border-color': 'rgba(205, 246, 131, 0.3)',
          '--fc-event-text-color': '#CDF683',
          '--fc-today-bg-color': todayBg,
          '--fc-page-bg-color': 'transparent',
          '--fc-highlight-color': 'rgba(205, 246, 131, 0.1)',
          '--fc-non-business-color': 'rgba(0, 0, 0, 0.2)',
          'transform': 'translate3d(0, 0, 0)',
          'backface-visibility': 'hidden',
          'perspective': 1000,
          'will-change': 'transform'
        },
        '.fc .fc-toolbar': {
          gap: '1rem',
          flexWrap: 'wrap',
          padding: '1rem',
          background: headerBg,
          borderRadius: 'lg',
          marginBottom: '1rem',
          backdropFilter: 'blur(10px)',
        },
        '.fc .fc-toolbar-title': {
          fontSize: '1.5rem',
          fontWeight: '600',
          color: '#CDF683',
          letterSpacing: 'tight',
        },
        '.fc .fc-button': {
          padding: '0.5rem 1rem',
          fontWeight: '500',
          transition: 'all 0.2s',
          textTransform: 'capitalize',
          borderRadius: 'md',
          fontSize: '0.875rem',
          backdropFilter: 'blur(5px)',
        },
        '.fc .fc-button:focus': {
          boxShadow: '0 0 0 2px rgba(205, 246, 131, 0.4)',
        },
        '.fc-theme-standard th, .fc-theme-standard td': {
          borderColor: borderColor,
        },
        '.fc-theme-standard td': {
          background: 'rgba(205, 246, 131, 0.02)',
        },
        '.fc .fc-scrollgrid': {
          borderColor: borderColor,
          borderRadius: 'lg',
          overflow: 'hidden',
          'transform': 'translate3d(0, 0, 0)',
          'backface-visibility': 'hidden',
          'will-change': 'transform'
        },
        '.fc .fc-scrollgrid-section > td': {
          border: 'none',
        },
        '.fc-theme-standard td, .fc-theme-standard th': {
          border: '1px solid',
          borderColor: 'rgba(205, 246, 131, 0.15) !important'
        },
        '.fc-timegrid-divider': {
          display: 'none'
        },
        '.fc-timegrid-slots tr': {
          backgroundColor: 'transparent !important',
          borderColor: 'rgba(205, 246, 131, 0.15) !important'
        },
        '.fc-timegrid-slot': {
          backgroundColor: 'transparent !important',
          '&:hover': {
            backgroundColor: 'rgba(205, 246, 131, 0.05) !important'
          }
        },
        '.fc-timegrid-col': {
          background: 'transparent !important'
        },
        '.fc-timegrid-col-frame': {
          background: 'transparent !important'
        },
        '.fc-timegrid-now-indicator-line': {
          borderColor: '#CDF683',
          opacity: 0.5
        },
        '.fc-timegrid-now-indicator-arrow': {
          borderColor: '#CDF683',
          opacity: 0.5
        },
        '.fc .fc-col-header': {
          background: headerBg,
          backdropFilter: 'blur(10px)',
        },
        '.fc .fc-col-header-cell': {
          padding: '1rem 0',
          color: '#CDF683',
          fontWeight: '600',
          letterSpacing: 'tight',
        },
        '.fc .fc-timegrid-slot': {
          height: '3rem',
        },
        '.fc .fc-timegrid-slot-label': {
          color: 'rgba(205, 246, 131, 0.7)',
          fontSize: '0.875rem',
        },
        '.fc .fc-event': {
          borderRadius: '8px',
          padding: '0.25rem',
          fontSize: '0.875rem',
          fontWeight: '600',
          transition: 'all 0.2s',
          cursor: 'pointer',
          backdropFilter: 'blur(5px)',
          background: 'rgba(205, 246, 131, 0.1) !important',
          border: '1px solid rgba(205, 246, 131, 0.3) !important',
          '&:hover': {
            transform: 'translateY(-1px)',
            boxShadow: '0 4px 12px rgba(205, 246, 131, 0.2)',
            background: 'rgba(205, 246, 131, 0.15) !important',
            borderColor: 'rgba(205, 246, 131, 0.4) !important'
          }
        },
        '.fc .fc-event-main': {
          padding: '0.5rem',
        },
        '.fc .fc-event-title': {
          color: '#CDF683 !important',
          fontWeight: '600',
          letterSpacing: '0.02em',
          textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        },
        '.fc .fc-event-time': {
          color: 'rgba(205, 246, 131, 0.9) !important',
          fontWeight: '500',
          fontSize: '0.8rem',
          marginBottom: '0.25rem',
          textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
        },
        '.fc-v-event': {
          background: 'rgba(205, 246, 131, 0.1) !important',
          border: '1px solid rgba(205, 246, 131, 0.3) !important',
          '& .fc-event-main': {
            padding: '0.5rem',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            gap: '0.25rem'
          }
        },
        '.fc-daygrid-event': {
          margin: '0.25rem 0.5rem !important',
          background: 'rgba(205, 246, 131, 0.1) !important',
          border: '1px solid rgba(205, 246, 131, 0.3) !important',
          '& .fc-event-main': {
            padding: '0.5rem',
          }
        },
        '.fc-direction-ltr .fc-timegrid-col-events': {
          marginRight: '1rem',
          marginLeft: '1rem',
        },
        '.fc .fc-day-today': {
          background: todayBg + ' !important',
        },
        '.fc-theme-standard .fc-scrollgrid-section-header td': {
          background: headerBg,
        },
      }}
    >
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
        events={events}
        eventClick={onEventClick}
        dateClick={onDateClick}
        editable={true}
        nowIndicator={true}
        slotMinTime="08:00:00"
        slotMaxTime="22:00:00"
        allDaySlot={false}
        slotDuration="00:30:00"
        weekends={true}
        dayMaxEvents={true}
        eventTimeFormat={{
          hour: '2-digit',
          minute: '2-digit',
          meridiem: 'short'
        }}
      />
    </Box>
  );
};

export default CalendarView;
