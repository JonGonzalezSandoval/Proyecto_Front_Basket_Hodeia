// import { Button, Card, Col, Form, InputGroup, Row } from "react-bootstrap";

import { useEffect, useState } from "react";
import { Badge, Col, Container, Row } from "react-bootstrap";
import PlayerStatistics from "./PlayersStatistics";
<link href="https://fonts.googleapis.com/css2?family=Graduate&display=swap" rel="stylesheet"></link>

export default function Scoreboard() {
    const [time, setTime] = useState(70000);
    const [isRunning, setIsRunning] = useState(true);
    const [localScore] = useState(Math.floor(((Math.random() * 100))))
    const [visitorScore] = useState(Math.floor(((Math.random() * 100))))

    const [faltasLocal] = useState(Math.floor(((Math.random() * 15))))
    const [faltasVisitante] = useState(Math.floor(((Math.random() * 15))))

    useEffect(() => {
        let intervalId: number;
        if (isRunning) {
            // setting time from 0 to 1 every 10 milisecond using javascript setInterval method
            intervalId = setInterval(() => setTime(time + 1), 10);
        }
        return () => clearInterval(intervalId);
    }, [isRunning, time]);

    // Minutes calculation
    const minutes = Math.floor((time % 360000) / 6000);

    // Seconds calculation
    const seconds = Math.floor((time % 6000) / 100);


    return (
        <>
            <Container className="text-center my-1">

                <Row className="mb-3">
                    <Col>
                        <link href="https://fonts.googleapis.com/css2?family=Graduate&display=swap" rel="stylesheet"></link>
                        <h1 style={{ fontSize: '3rem', fontWeight: 'bold', fontFamily: "'Graduate', 'serif'" }}>
                            {minutes.toString().padStart(2, "0")}:{seconds.toString().padStart(2, "0")}
                        </h1>
                    </Col>
                </Row>

                <Row className="mb-2">
                    <Col>
                        <h3 className="local-color-nonbg" style={{ fontFamily: "'Graduate', 'serif'" }}>Local</h3>
                    </Col>
                    <Col>
                        <h3 className="visitor-color-nonbg" style={{ color: '#28a745', fontFamily: "'Graduate', 'serif'" }}>Visitante</h3>
                    </Col>
                  
                </Row>
                <Row className="mb-2">
                    <Col>
                        <h3> <Badge bg="secondary" style={{ fontFamily: "'Graduate', 'serif'" }}>Quarter: {Math.floor(((minutes / 10) + 1))}</Badge></h3>
                    </Col>
                </Row>

                <Row className="mb-2">
                    <Col>
                        <h2>
                            <Badge bg="local-color" className="local-color" style={{ fontSize: '2.5rem', fontFamily: "'Graduate', 'serif'" }}>{localScore}</Badge>
                        </h2>
                    </Col>
                    <Col>

                    </Col>
                    <Col>
                        <h2>
                            <Badge bg="visitor-color" className="visitor-color" style={{ fontSize: '2.5rem', fontFamily: "'Graduate', 'serif'" }}>{visitorScore}</Badge>
                        </h2>
                    </Col>
                </Row>

                <Row>
                    <Col >
                        <h2>
                            <Badge bg="fouls-color" className="fouls-color" style={{ fontSize: '2.5rem', fontFamily: "'Graduate', 'serif'" }}>{faltasLocal.toString()}</Badge>
                        </h2>
                    </Col>

                    <Col >
                        <h2>
                            <Badge bg="fouls-color" className="fouls-color" style={{ fontSize: '2.5rem', fontFamily: "'Graduate', 'serif'" }}>{faltasVisitante.toString()}</Badge>
                        </h2>
                    </Col>
                </Row>
                <PlayerStatistics></PlayerStatistics>
            </Container>
        </>
    );
}
