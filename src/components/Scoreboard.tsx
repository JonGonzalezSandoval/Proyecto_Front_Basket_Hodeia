// import { Button, Card, Col, Form, InputGroup, Row } from "react-bootstrap";

import { useEffect, useState } from "react";
import { Badge, Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import PlayerStatistics from "./PlayersStatistics";
import io from 'socket.io-client';
import { useNavigate } from "react-router";
<link href="https://fonts.googleapis.com/css2?family=Graduate&display=swap" rel="stylesheet"></link>

interface TTeams {
    nombre: string;
    logo: string | null;
    id: string;
}

const socket = io('http://localhost:3001');

export default function Scoreboard() {
    const { matchID } = useParams();
    const [localTeam, setLocalTeam] = useState<TTeams | null>(null);
    const [awayTeam, setAwayTeam] = useState<TTeams | null>(null);

    function getMatch() {
        console.log(matchID)
        fetch(`http://localhost:3000/matches/teamsplayersdate/${matchID}`)
            .then((res) => res.json())
            .then((res) => {
                console.log(res);

                setLocalTeam({
                    nombre: res.localTeamDetails.localid.nombre,
                    logo: res.localTeamDetails.localid.equipoLogo,
                    id: res.localTeamDetails.localid.equipoid,
                });
                setAwayTeam({
                    nombre: res.visitorTeamDetails.visitanteid.nombre,
                    logo: res.visitorTeamDetails.visitanteid.equipoLogo,
                    id: res.visitorTeamDetails.visitanteid.equipoid,
                });
            });
    }

    const [time, setTime] = useState(70000);
    const [isRunning, setIsRunning] = useState(true);
    const [localScore] = useState(Math.floor(((Math.random() * 100))))
    const [visitorScore] = useState(Math.floor(((Math.random() * 100))))

    const [faltasLocal] = useState(Math.floor(((Math.random() * 15))))
    const [faltasVisitante] = useState(Math.floor(((Math.random() * 15))))

    const [user, setUser] = useState<any | null>(null);

    const navigate = useNavigate();

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

    useEffect(() => {
        if (localStorage.getItem("SavedToken") !== null) {
            fetch("http://localhost:3000/auth/profile", {
                headers: { Authorization: localStorage.getItem("SavedToken") || "" },
            })
                .then((res) => {
                    if (res.status >= 400) {
                        setUser(null);
                        navigate("/login");
                        console.log(res.statusText)
                        return;
                    }
                    return res.json();
                })
                .then((res) => {
                    setUser(res);
                });
        } else {
            navigate("/login");
        }
    }, [])

    useEffect(() => {
        getMatch();
    }, []);


    return (
        <>
            <Container className="text-center my-1">

                <Row>
                    <Col>
                        <Card

                            key={matchID}
                            style={{
                                marginBottom: "3vh",
                                marginTop: "5vh",
                                boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
                            }}
                        >
                            <Row>
                                {/* Equipo Local */}
                                <Col className="d-flex flex-column justify-content-center align-items-center">
                                    <ListGroup className="align-items-center">
                                        <Card.Img
                                            src={`http://localhost:3000/${localTeam?.logo}`} // Asegúrate de que esta URL sea correcta
                                            alt="team-logo"
                                            style={{
                                                maxWidth: "100px",
                                                margin: "10px",
                                                borderRadius: "50px",
                                            }} // Ajusta el estilo según sea necesario
                                        />
                                    </ListGroup>
                                    <p>{localTeam?.nombre}</p>
                                </Col>
                                {/* Separador */}
                                <Col
                                    className="d-flex flex-column justify-content-center align-items-center"
                                    style={{ width: "15%", maxWidth: "15%" }}
                                >
                                    <h5>
                                        <Badge
                                            style={{ boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)" }}
                                            bg="danger"
                                        >
                                            VS
                                        </Badge>
                                    </h5>
                                </Col>

                                {/* Equipo Visitante */}
                                <Col className="d-flex flex-column justify-content-center align-items-center">
                                    <ListGroup variant="flush" className="align-items-center justify-content-center">
                                        <Card.Img
                                            src={`http://localhost:3000/${awayTeam?.logo}`}
                                            alt="team-logo"
                                            style={{
                                                maxWidth: "100px",
                                                margin: "10px",

                                                borderRadius: "50px",
                                            }} // Ajusta el estilo según sea necesario
                                        />
                                        <p>{awayTeam?.nombre}</p>
                                    </ListGroup>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>

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
                {/* <PlayerStatistics></PlayerStatistics> */}
            </Container>
        </>
    );
}
