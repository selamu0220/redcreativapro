'use client';

import React, { useState } from 'react';
import { CalendarHeader } from './CalendarHeader';
import { MonthView } from './MonthView';
import { WeekView } from './WeekView';
import { DayView } from './DayView';
import { CalendarEventDialog } from './CalendarEventDialog';
import { EventType } from '../../types/calendar';
import { useEventsStorage } from '../../hooks/useLocalStorage';
import { CSVManager } from '../common/CSVManager';
import { useToast } from '../../hooks/use-toast';
import { useCalendarSEO } from '../../hooks/useSEO';

type CalendarViewType = 'month' | 'week' | 'day';

export function CalendarView() {
  const [viewType, setViewType] = useState<CalendarViewType>('month');
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const { events, addEvent, updateEvent, deleteEvent, importFromCSV, exportToCSV, hasUnsavedChanges } = useEventsStorage();
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);
  const { toast } = useToast();

  // Aplicar SEO específico para la página del calendario
  useCalendarSEO();

  const handleAddEvent = (event: EventType) => {
    addEvent(event);
    setIsEventDialogOpen(false);
  };

  const handleEditEvent = (updatedEvent: EventType) => {
    updateEvent(updatedEvent.id, updatedEvent);
    setIsEventDialogOpen(false);
    setSelectedEvent(null);
  };

  const handleDeleteEvent = (eventId: string) => {
    deleteEvent(eventId);
    setIsEventDialogOpen(false);
    setSelectedEvent(null);
  };

  const handleImportCSV = async (file: File) => {
    try {
      await importFromCSV(file);
      toast({
        title: 'Éxito',
        description: 'Eventos importados correctamente desde CSV',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Error al importar eventos desde CSV',
        variant: 'destructive',
      });
    }
  };

  const handleExportCSV = () => {
    try {
      exportToCSV();
      toast({
        title: 'Éxito',
        description: 'Eventos exportados correctamente a CSV',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Error al exportar eventos a CSV',
        variant: 'destructive',
      });
    }
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
      <div className="flex justify-between items-center">
        <CalendarHeader
          viewType={viewType}
          currentDate={currentDate}
          onViewChange={setViewType}
          onDateChange={setCurrentDate}
          onAddEvent={openNewEventDialog}
        />
        <CSVManager
          onImport={handleImportCSV}
          onExport={handleExportCSV}
          hasUnsavedChanges={hasUnsavedChanges}
          dataType="eventos"
        />
      </div>
      
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