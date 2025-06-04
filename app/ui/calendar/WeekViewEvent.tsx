import { EventType } from '@/types/calendar';
import { parseISO, format, differenceInMinutes } from 'date-fns';
import { cn } from '@/lib/utils';

interface WeekViewEventProps {
  event: EventType;
  onClick: () => void;
}

export function WeekViewEvent({ event, onClick }: WeekViewEventProps) {
  const startTime = parseISO(event.start);
  const endTime = parseISO(event.end);
  
  const startMinutes = startTime.getHours() * 60 + startTime.getMinutes();
  const durationMinutes = differenceInMinutes(endTime, startTime);
  
  const top = (startMinutes / 60) * 60;
  const height = (durationMinutes / 60) * 60;
  
  return (
    <div
      className={cn(
        'absolute left-1 right-1 rounded-md p-1 text-xs overflow-hidden cursor-pointer',
        event.color || 'bg-primary text-primary-foreground'
      )}
      style={{
        top: `${top}px`,
        height: `${height}px`,
      }}
      onClick={onClick}
    >
      <div className="font-medium truncate">{event.title}</div>
      {height > 40 && (
        <div className="text-[10px] opacity-90">
          {format(startTime, 'h:mm a')} - {format(endTime, 'h:mm a')}
        </div>
      )}
    </div>
  );
}