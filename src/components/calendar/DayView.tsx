import { useMemo } from 'react';
import {
  format,
  isSameDay,
  addHours,
  parseISO,
  differenceInMinutes,
} from 'date-fns';
import { EventType } from '@/types/calendar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface DayViewProps {
  events: EventType[];
  currentDate: Date;
  onEventClick: (event: EventType) => void;
  onDateClick: (date: Date) => void;
}

export function DayView({
  events,
  currentDate,
  onEventClick,
  onDateClick,
}: DayViewProps) {
  const hours = Array.from({ length: 24 }, (_, i) => i);

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const eventDate = parseISO(event.start);
      return isSameDay(eventDate, currentDate);
    });
  }, [events, currentDate]);

  return (
    <div className="flex flex-col h-full">
      <div className="border-b sticky top-0 bg-background p-4 text-center">
        <h2 className="text-xl font-bold">
          {format(currentDate, 'EEEE, MMMM d, yyyy')}
        </h2>
      </div>
      
      <ScrollArea className="flex-1 h-[600px]">
        <div className="grid grid-cols-[60px_1fr] h-[1440px]">
          <div className="border-r">
            {hours.map((hour) => (
              <div
                key={hour}
                className="h-[60px] border-b text-xs text-muted-foreground relative"
              >
                <span className="absolute -top-2.5 left-2">
                  {hour === 0 ? '12am' : hour < 12 ? `${hour}am` : hour === 12 ? '12pm' : `${hour - 12}pm`}
                </span>
              </div>
            ))}
          </div>
          
          <div className="relative">
            {hours.map((hour) => (
              <div
                key={hour}
                className="h-[60px] border-b hover:bg-accent/20 transition-colors"
                onClick={() => onDateClick(addHours(currentDate, hour))}
              ></div>
            ))}
            
            {filteredEvents.map((event) => {
              const startTime = parseISO(event.start);
              const endTime = parseISO(event.end);
              const startMinutes = startTime.getHours() * 60 + startTime.getMinutes();
              const durationMinutes = differenceInMinutes(endTime, startTime);
              const top = (startMinutes / 60) * 60;
              const height = (durationMinutes / 60) * 60;
              
              return (
                <div
                  key={event.id}
                  className={cn(
                    'absolute left-1 right-1 rounded-md p-2 text-sm overflow-hidden cursor-pointer',
                    event.color || 'bg-primary text-primary-foreground'
                  )}
                  style={{
                    top: `${top}px`,
                    height: `${height}px`,
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onEventClick(event);
                  }}
                >
                  <div className="font-medium">{event.title}</div>
                  <div className="text-xs">
                    {format(startTime, 'h:mm a')} - {format(endTime, 'h:mm a')}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}