import React, { useState, ChangeEvent, useEffect, Dispatch, SetStateAction } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './myCalendar.css' 

interface MyCalendarProps {
  setterFecha: Dispatch<SetStateAction<Date>>;
  fecha: Date;
  fechasPartidos: string[];
}

const MyCalendar: React.FC<MyCalendarProps> = ({setterFecha, fecha}) => {
  const [events, setEvents] = useState<Date[]>([
    new Date(2023, 11, 5), // Sample events on specific dates
    new Date(2023, 11, 10),
    new Date(2023, 11, 15),
  ]);



  const onChange = (newDate: Date | Date[]) => {
    // Assuming the calendar allows selecting multiple dates
    if (Array.isArray(newDate)) {
      // Handle array of dates if needed
    } else {
      setterFecha(newDate);
    }
  };

  const tileContent: any = ({ date, view }:any) => {
    if (view === 'month') {
      const hasEvent = events.find((eventDate) => eventDate.getTime() === date.getTime());
      return hasEvent ? <span className="event-dot" /> : null;
    }
  };


  return (
    <div>
      <Calendar onChange={onChange as any} value={fecha} />
      <div>

      </div>
    </div>
  );
};

export default MyCalendar;
