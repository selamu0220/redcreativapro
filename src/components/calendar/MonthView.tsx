import { useMemo } from 'react';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  addDays,
  startOfWeek,
  endOfWeek,
  isSameMonth,
  isToday,
  isSameDay,
} from 'date-fns';
import { EventType } from '@/types/calendar';
import { cn } from '@/lib/utils';
import { CalendarDayEvents } from './CalendarDayEvents';

interface MonthViewProps {
  events: EventType[];
  currentDate: Date;
  onEventClick: (event: EventType) => void;
  onDateClick: (date: Date) => void;
}

export function MonthView({
  events,
  currentDate,
  onEventClick,
  onDateClick,
}: MonthViewProps) {
  const days = useMemo(() => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const calendarStart = startOfWeek(monthStart, { weekStartsOn: 0 });
    const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });

    return eachDayOfInterval({ start: calendarStart, end: calendarEnd });
  }, [currentDate]);

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getEventsForDay = (date: Date) => {
    return events.filter((event) => {
      const eventDate = new Date(event.start);
      return isSameDay(eventDate, date);
    });
  };

  return (
    <div className="h-full">
      <div className="grid grid-cols-7 border-b">
        {weekDays.map((day) => (
          <div
            key={day}
            className="p-2 text-center text-sm font-medium text-muted-foreground"
          >
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 grid-rows-6 h-[calc(100%-36px)]">
        {days.map((day, index) => {
          const dayEvents = getEventsForDay(day);
          return (
            <div
              key={index}
              className={cn(
                'border-b border-r min-h-[100px] p-1 transition-colors hover:bg-accent/20',
                !isSameMonth(day, currentDate) && 'bg-muted/20',
                isToday(day) && 'bg-accent/30'
              )}
              onClick={() => onDateClick(day)}
            >
              <div className="flex justify-between items-start">
                <span
                  className={cn(
                    'text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full',
                    isToday(day) && 'bg-primary text-primary-foreground'
                  )}
                >
                  {format(day, 'd')}
                </span>
              </div>
              <CalendarDayEvents
                events={dayEvents}
                onEventClick={onEventClick}
                isCompact={true}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}