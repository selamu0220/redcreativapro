import { EventType } from '../../types/calendar';
import { parseISO, format } from 'date-fns';
import { cn } from '../../lib/utils';

interface CalendarDayEventsProps {
  events: EventType[];
  onEventClick: (event: EventType) => void;
  isCompact?: boolean;
}

export function CalendarDayEvents({
  events,
  onEventClick,
  isCompact = false,
}: CalendarDayEventsProps) {
  if (events.length === 0) {
    return null;
  }

  const displayEvents = isCompact ? events.slice(0, 3) : events;
  const hasMoreEvents = isCompact && events.length > 3;

  return (
    <div className="mt-1 space-y-1 max-w-full">
      {displayEvents.map((event) => (
        <div
          key={event.id}
          className={cn(
            'px-2 py-1 text-xs rounded truncate cursor-pointer transition-colors',
            event.color || 'bg-primary text-primary-foreground hover:bg-primary/90'
          )}
          onClick={(e) => {
            e.stopPropagation();
            onEventClick(event);
          }}
        >
          {!isCompact && (
            <span className="font-medium mr-1">
              {format(parseISO(event.start), 'h:mm a')}
            </span>
          )}
          <span className="truncate">{event.title}</span>
        </div>
      ))}
      {hasMoreEvents && (
        <div className="px-2 py-1 text-xs text-muted-foreground">
          +{events.length - 3} more
        </div>
      )}
    </div>
  );
}