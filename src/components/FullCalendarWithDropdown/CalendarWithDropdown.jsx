import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Select, MenuItem, FormControl, IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function CalendarWithDropdown() {
  const [currentView, setCurrentView] = useState('dayGridMonth');
  const [events, setEvents] = useState([
    { title: 'Meeting', start: '2024-10-15T09:00:00' },
    { title: 'Lunch', start: '2024-10-16T12:30:00' }
  ]);
  const calendarRef = React.createRef();

  const handleViewChange = (event) => {
    const newView = event.target.value;
    setCurrentView(newView);
    const calendarApi = calendarRef.current.getApi();
    calendarApi.changeView(newView);
  };

  const handleEventDrop = (eventDropInfo) => {
    const { event } = eventDropInfo;
    setEvents(prevEvents => {
      return prevEvents.map(evt => 
        evt.id === event.id 
          ? { 
              ...evt, 
              start: event.startStr,
              end: event.endStr
            }
          : evt
      );
    });
  };

  const handleDateSelect = (selectInfo) => {
    const title = prompt('Please enter a title for your event');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect();

    if (title) {
      const newEvent = {
        id: String(events.length + 1),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      };
      
      setEvents([...events, newEvent]);
    }
  };

  const handlePrev = () => {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.prev();
  };

  const handleNext = () => {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.next();
  };

  const handleToday = () => {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.today();
  };

  const CustomToolbar = () => {
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <IconButton onClick={handlePrev}>
            <ChevronLeft />
          </IconButton>
          <IconButton onClick={handleNext}>
            <ChevronRight />
          </IconButton>
          <IconButton onClick={handleToday} style={{marginLeft: '120px'}}>
            Today
          </IconButton>
        </div>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <Select
            value={currentView}
            onChange={handleViewChange}
          >
            <MenuItem value="dayGridMonth">Month</MenuItem>
            <MenuItem value="timeGridWeek">Week</MenuItem>
            <MenuItem value="timeGridDay">Day</MenuItem>
          </Select>
        </FormControl>
      </div>
    );
  };

  return (
    <div>
      <CustomToolbar />
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={currentView}
        headerToolbar={true}
        events={events}
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        eventDrop={handleEventDrop}
        select={handleDateSelect}
      />
    </div>
  );
}