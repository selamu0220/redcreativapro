import { useMemo } from 'react';
import {
  format,
  addDays,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameDay,
  isToday,
  parse,
  addHours,
} from 'date-fns';
import { EventType } from '../../types/calendar';
import { cn } from '../../lib/utils';
import { ScrollArea } from '../../ui/scroll-area';
import { WeekViewEvent } from './WeekViewEvent';

interface WeekViewProps {
  events: EventType[];
  currentDate: Date;
  onEventClick: (event: EventType) => void;
  onDateClick: (date: Date) => void;
}

export function WeekView({
  events,
  currentDate,
  onEventClick,
  onDateClick,
}: WeekViewProps) {
  const weekDays = useMemo(() => {
    const start = startOfWeek(currentDate, { weekStartsOn: 0 });
    const end = endOfWeek(currentDate, { weekStartsOn: 0 });
    return eachDayOfInterval({ start, end });
  }, [currentDate]);

  const hours = Array.from({ length: 24 }, (_, i) => i);

  const getEventsForDay = (date: Date) => {
    return events.filter((event) => {
      const eventDate = new Date(event.start);
      return isSameDay(eventDate, date);
    });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="grid grid-cols-8 border-b sticky top-0 bg-background">
        <div className="p-2 border-r w-[60px]"></div>
        {weekDays.map((day, i) => (
          <div
            key={i}
            className={cn(
              'p-2 text-center border-r',
              isToday(day) && 'bg-accent/30'
            )}
          >
            <div className="text-sm font-medium">{format(day, 'EEE')}</div>
            <div
              className={cn(
                'text-2xl font-bold w-9 h-9 mx-auto rounded-full flex items-center justify-center',
                isToday(day) && 'bg-primary text-primary-foreground'
              )}
            >
              {format(day, 'd')}
            </div>
          </div>
        ))}
      </div>
      
      <ScrollArea className="flex-1 h-[600px]">
        <div className="grid grid-cols-8 h-[1440px]">
          <div className="border-r w-[60px]">
            {hours.map((hour) => (
              <div
                key={hour}
                className="h-[60px] border-b text-xs text-muted-foreground relative"
              >
                <span className="absolute -top-2.5 left-2">{hour === 0 ? '12am' : hour < 12 ? `${hour}am` : hour === 12 ? '12pm' : `${hour - 12}pm`}</span>
              </div>
            ))}
          </div>
          
          {weekDays.map((day, dayIndex) => {
            const dayEvents = getEventsForDay(day);
            return (
              <div key={dayIndex} className="relative border-r h-full">
                {hours.map((hour) => (
                  <div
                    key={hour}
                    className="h-[60px] border-b hover:bg-accent/20 transition-colors"
                    onClick={() => onDateClick(addHours(day, hour))}
                  ></div>
                ))}
                
                {dayEvents.map((event) => (
                  <WeekViewEvent
                    key={event.id}
                    event={event}
                    onClick={() => onEventClick(event)}
                  />
                ))}
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}