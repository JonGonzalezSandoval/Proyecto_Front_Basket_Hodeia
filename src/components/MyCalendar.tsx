import React, { useState, ChangeEvent, useEffect, Dispatch, SetStateAction } from "react";
import { Badge, Col, Container, Row } from "react-bootstrap";
import "../custom-styles.css";
import Calendar from "react-calendar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBasketballBall } from "@fortawesome/free-solid-svg-icons";

interface MyCalendarProps {
  setterFecha: Dispatch<SetStateAction<Date>>;
  fecha: Date;
  fechasPartidos: string[];
}

const MyCalendar:React.FC<MyCalendarProps> = ({setterFecha, fecha}) => {
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
      return hasEvent ? <FontAwesomeIcon icon={faBasketballBall} className="event-icon" /> : null;
    }
  };

  const formatDate = (date: Date): string => {
    // Format date as 'yyyy-mm-dd'
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  return (
    <Container className="my-calendar" style={{ justifyContent: "center", marginTop: "3vw" }}>
      <Row>
        <Col>
          <Calendar onChange={onChange as any} value={fecha} tileContent={tileContent}/>
        </Col>
        <Col>
          <h5>
          <Badge pill bg="myCustomBadge" className="myCustomBadge">
              Fecha seleccionada: {formatDate(fecha)}
            </Badge>
          </h5>
        </Col>
      </Row>
    </Container>
  );
};

export default MyCalendar;
