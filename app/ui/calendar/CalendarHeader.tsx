import { Button } from '../../ui/button';
import { CalendarIcon, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { format, addMonths, addWeeks, addDays, subMonths, subWeeks, subDays } from 'date-fns';
import { Tabs, TabsList, TabsTrigger } from '../../ui/tabs';

type CalendarViewType = 'month' | 'week' | 'day';

interface CalendarHeaderProps {
  viewType: CalendarViewType;
  currentDate: Date;
  onViewChange: (view: CalendarViewType) => void;
  onDateChange: (date: Date) => void;
  onAddEvent: () => void;
}

export function CalendarHeader({
  viewType,
  currentDate,
  onViewChange,
  onDateChange,
  onAddEvent,
}: CalendarHeaderProps) {
  const goToPrevious = () => {
    switch (viewType) {
      case 'month':
        onDateChange(subMonths(currentDate, 1));
        break;
      case 'week':
        onDateChange(subWeeks(currentDate, 1));
        break;
      case 'day':
        onDateChange(subDays(currentDate, 1));
        break;
    }
  };

  const goToNext = () => {
    switch (viewType) {
      case 'month':
        onDateChange(addMonths(currentDate, 1));
        break;
      case 'week':
        onDateChange(addWeeks(currentDate, 1));
        break;
      case 'day':
        onDateChange(addDays(currentDate, 1));
        break;
    }
  };

  const goToToday = () => {
    onDateChange(new Date());
  };

  const getHeaderTitle = () => {
    switch (viewType) {
      case 'month':
        return format(currentDate, 'MMMM yyyy');
      case 'week':
        return `Week of ${format(currentDate, 'MMM d, yyyy')}`;
      case 'day':
        return format(currentDate, 'EEEE, MMMM d, yyyy');
      default:
        return '';
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
        <p className="text-muted-foreground">
          Schedule events and manage your creative workflow.
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
        <Tabs
          value={viewType}
          onValueChange={(value) => onViewChange(value as CalendarViewType)}
          className="w-full sm:w-auto"
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="month">Month</TabsTrigger>
            <TabsTrigger value="week">Week</TabsTrigger>
            <TabsTrigger value="day">Day</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <Button variant="outline" size="icon" onClick={goToPrevious}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" onClick={goToToday}>
            Today
          </Button>
          <Button variant="outline" size="icon" onClick={goToNext}>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button onClick={onAddEvent} className="ml-2 gap-2">
            <Plus className="h-4 w-4" />
            <span>Event</span>
          </Button>
        </div>
      </div>
    </div>
  );
}