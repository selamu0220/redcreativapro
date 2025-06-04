'use client';

import React, { useState } from 'react';
import { CalendarHeader } from './CalendarHeader';
import { MonthView } from './MonthView';
import { WeekView } from './WeekView';
import { DayView } from './DayView';
import { CalendarEventDialog } from './CalendarEventDialog';
import { EventType } from '@/types/calendar';
import { mockEvents } from '@/data/mockEvents';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useCalendarSEO } from '@/hooks/useSEO';

type CalendarViewType = 'month' | 'week' | 'day';

export function CalendarView() {
  const [viewType, setViewType] = useState<CalendarViewType>('month');
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [events, setEvents] = useState<EventType[]>(mockEvents);
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();

  // Aplicar SEO específico para la página del calendario
  useCalendarSEO();

  const handleAddEvent = (event: EventType) => {
    setEvents([...events, event]);
    setIsEventDialogOpen(false);
  };

  const handleEditEvent = (updatedEvent: EventType) => {
    setEvents(events.map(e => e.id === updatedEvent.id ? updatedEvent : e));
    setIsEventDialogOpen(false);
    setSelectedEvent(null);
  };

  const handleDeleteEvent = (eventId: string) => {
    setEvents(events.filter(e => e.id !== eventId));
    setIsEventDialogOpen(false);
    setSelectedEvent(null);
  };

  const openNewEventDialog = (date?: Date) => {
    setSelectedEvent(null);
    setIsEventDialogOpen(true);
  };

  const openEditEventDialog = (event: EventType) => {
    setSelectedEvent(event);
    setIsEventDialogOpen(true);
  };

  const renderCalendarView = () => {
    switch (viewType) {
      case 'month':
        return (
          <MonthView
            events={events}
            currentDate={currentDate}
            onEventClick={openEditEventDialog}
            onDateClick={openNewEventDialog}
          />
        );
      case 'week':
        return (
          <WeekView
            events={events}
            currentDate={currentDate}
            onEventClick={openEditEventDialog}
            onDateClick={openNewEventDialog}
          />
        );
      case 'day':
        return (
          <DayView
            events={events}
            currentDate={currentDate}
            onEventClick={openEditEventDialog}
            onDateClick={openNewEventDialog}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <CalendarHeader
        viewType={viewType}
        currentDate={currentDate}
        onViewChange={setViewType}
        onDateChange={setCurrentDate}
        onAddEvent={openNewEventDialog}
      />
      
      <div className="border rounded-lg overflow-hidden">
        {renderCalendarView()}
      </div>

      <CalendarEventDialog
        open={isEventDialogOpen}
        onOpenChange={setIsEventDialogOpen}
        onSave={selectedEvent ? handleEditEvent : handleAddEvent}
        onDelete={selectedEvent ? handleDeleteEvent : undefined}
        event={selectedEvent}
        defaultDate={currentDate}
      />
    </div>
  );
}