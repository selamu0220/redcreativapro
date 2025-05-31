import { format, isToday, isYesterday, isTomorrow } from 'date-fns';

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  
  if (isToday(date)) {
    return 'Today';
  }
  
  if (isYesterday(date)) {
    return 'Yesterday';
  }
  
  if (isTomorrow(date)) {
    return 'Tomorrow';
  }
  
  return format(date, 'MMM d');
}