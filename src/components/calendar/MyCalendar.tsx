import React, { useState, ChangeEvent, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './myCalendar.css' 

const MyCalendar: React.FC = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [events, setEvents] = useState<Date[]>([
    new Date(2023, 11, 5), // Sample events on specific dates
    new Date(2023, 11, 10),
    new Date(2023, 11, 15),
  ]);

  const formatDate = (date: Date): string => {
    // Format date as 'yyyy-mm-dd'
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  const onChange = (newDate: Date | Date[]) => {
    // Assuming the calendar allows selecting multiple dates
    if (Array.isArray(newDate)) {
      // Handle array of dates if needed
    } else {
      setDate(newDate);
    }
  };

  const tileContent: any = ({ date, view }:any) => {
    if (view === 'month') {
      const hasEvent = events.find((eventDate) => eventDate.getTime() === date.getTime());
      return hasEvent ? <span className="event-dot" /> : null;
    }
  };

  useEffect(() => {
    console.log(formatDate(date))
  }, [date, setDate])

  return (
    <div>
      <Calendar onChange={onChange as any} value={date} />
      <div>
        Selected date: {formatDate(date)}
      </div>
    </div>
  );
};

export default MyCalendar;
