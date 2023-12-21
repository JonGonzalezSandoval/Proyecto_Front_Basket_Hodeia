// import { Button, Card, Col, Form, InputGroup, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Badge, Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import PlayerStatistics from "./PlayersStatistics";
import io from "socket.io-client";
import { useNavigate } from "react-router";
<link
  href="https://fonts.googleapis.com/css2?family=Graduate&display=swap"
  rel="stylesheet"
></link>;

interface TTeams {
  nombre: string;
  logo: string | null;
  id: string;
  score: number;
  // fouls: number;
}

const socket = io("http://localhost:3001");

export default function Scoreboard() {
  const { matchID } = useParams();
  const [localTeam, setLocalTeam] = useState<any>();
  const [awayTeam, setAwayTeam] = useState<any>();
  const [localPlayers, setLocalPlayers] = useState<any>()
  const [awayPlayers, setAwayPlayers] = useState<any>()
  const [teamsCharged, setTeamsCharged] = useState<boolean>(false);

  async function getMatch() {
    console.log('getmatch');
    
    console.log(matchID);
    const response = await fetch(`http://localhost:3000/matches/teamsplayersdate/${matchID}`)
    const res = await response.json();

        setLocalTeam({
          nombre: res.localTeamDetails.localid.nombre,
          logo: res.localTeamDetails.localid.equipoLogo,
          id: res.localTeamDetails.localid.equipoid,
          score: res.localTeamDetails.puntuacion_equipo_local,
          fouls: 0
        });
        setAwayTeam({
          nombre: res.visitorTeamDetails.visitanteid.nombre,
          logo: res.visitorTeamDetails.visitanteid.equipoLogo,
          id: res.visitorTeamDetails.visitanteid.equipoid,
          score: res.visitorTeamDetails.puntuacion_equipo_visitante,
          fouls: 0
        });
      //setTeamsCharged(true);
  }

  
  useEffect(()=>{
    if (localStorage.getItem("SavedToken") !== null) {
      fetch("http://localhost:3000/auth/profile", {
        headers: { Authorization: localStorage.getItem("SavedToken") || "" },
      })
        .then((res) => {
          if (res.status >= 400) {
            setUser(null);
            navigate("/login");
            console.log(res.statusText);
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

    socket.on("connect", () => {
      console.log("Connected to server!");
    });

    socket.on("timerUpdate", (data) => {
      setMinutes(data.minutes)
      setSeconds(data.seconds)
      setCuartos(data.cuartos)
    });

    socket.on("startingPlayers", (data) => {
      setLocalPlayers(data.selectedLocalCheckboxes);
      setAwayPlayers(data.selectedAwayCheckboxes);
    })

    socket.connect();
    return () => {
      socket.off("connect");
      socket.off("substitutionUpdate")
      socket.off("startingPlayers")
    };
  
  },[])

  useEffect(()=> {
    socket.on("scoreUpdateTeams", (data) => {   

      if(awayTeam?.id === data.equipoToUpdate){        //equipoToUpdate
        awayTeam.score += data.puntos;
               
        setAwayTeam({...awayTeam});
      } else if(localTeam?.id === data.equipoToUpdate){
        localTeam.score += data.puntos;
            
        setLocalTeam({...localTeam}); 
      }
         
    })

    socket.on("substitutionUpdate", (data) => {
      console.log(data);

      if(data.equipoid === awayTeam?.id) {
        setAwayPlayers([...data.players])
      } else if(data.equipoid === localTeam?.id){
        setLocalPlayers([...data.players])
      }
      
    })

    socket.on("foulUpdate", (data) => {
      console.log(data);

      if(awayTeam?.id === data.equipoId){        //equipoToUpdate
        // const tempTeam = {...awayTeam};
        console.log(awayTeam);
        awayTeam.fouls += 1;
        
        
        setAwayTeam({...awayTeam});
      } else if(localTeam?.id === data.equipoId){
        console.log('localteamscoreupdate');
        console.log(localTeam);
        localTeam.fouls += 1;
        
        
        setLocalTeam({...localTeam}); 
      }
    })

    return () => {
      socket.off("scoreUpdateTeams")
      socket.off("foulUpdate")
      socket.off("substitutionUpdate")
    }
  },[localTeam, awayTeam, localPlayers, awayPlayers])

  const [time, setTime] = useState(70000);
  const [isRunning, setIsRunning] = useState(true);
  const [localScore] = useState(Math.floor(Math.random() * 100));
  const [visitorScore] = useState(Math.floor(Math.random() * 100));

  const [faltasLocal] = useState(Math.floor(Math.random() * 15));
  const [faltasVisitante] = useState(Math.floor(Math.random() * 15));

  const [user, setUser] = useState<any | null>(null);
  const [minutes, setMinutes] = useState<number>(10);
  const [seconds, setSeconds] = useState<number>(0);
  const [cuartos, setCuartos] = useState<number>(1);

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
  // const minutes = Math.floor((time % 360000) / 6000);

  // // Seconds calculation
  // const seconds = Math.floor((time % 6000) / 100);

  useEffect(() => {
    socket.emit('joinMatchRoom', matchID );
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
                  <ListGroup
                    variant="flush"
                    className="align-items-center justify-content-center"
                  >
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
            <link
              href="https://fonts.googleapis.com/css2?family=Graduate&display=swap"
              rel="stylesheet"
            ></link>
            <h1
              style={{
                fontSize: "3rem",
                fontWeight: "bold",
                fontFamily: "'Graduate', 'serif'",
              }}
            >
              {minutes.toString().padStart(2, "0")}:
              {seconds.toString().padStart(2, "0")}
            </h1>
          </Col>
        </Row>

        <Row className="mb-2">
          <Col>
            <h3
              className="local-color-nonbg"
              style={{ fontFamily: "'Graduate', 'serif'" }}
            >
              Local
            </h3>
          </Col>
          <Col>
            <h3
              className="visitor-color-nonbg"
              style={{ color: "#28a745", fontFamily: "'Graduate', 'serif'" }}
            >
              Visitante
            </h3>
          </Col>
        </Row>
        <Row className="mb-2">
          <Col>
            <h3>
              {" "}
              <Badge
                bg="secondary"
                style={{ fontFamily: "'Graduate', 'serif'" }}
              >
                Quarter: {cuartos}
              </Badge>
            </h3>
          </Col>
        </Row>

        <Row className="mb-2">
          <Col>
            <h2>
              <Badge
                bg="local-color"
                className="local-color"
                style={{
                  fontSize: "2.5rem",
                  fontFamily: "'Graduate', 'serif'",
                }}
              >
                {localTeam?.score}
              </Badge>
            </h2>
          </Col>
          <Col></Col>
          <Col>
            <h2>
              <Badge
                bg="visitor-color"
                className="visitor-color"
                style={{
                  fontSize: "2.5rem",
                  fontFamily: "'Graduate', 'serif'",
                }}
              >
                {awayTeam?.score}
              </Badge>
            </h2>
          </Col>
        </Row>

        <Row>
          <Col>
            <h2>
              <Badge
                bg="fouls-color"
                className="fouls-color"
                style={{
                  fontSize: "2.5rem",
                  fontFamily: "'Graduate', 'serif'",
                }}
              >
                {localTeam?.fouls}
              </Badge>
            </h2>
          </Col>

          <Col>
            <h2>
              <Badge
                bg="fouls-color"
                className="fouls-color"
                style={{
                  fontSize: "2.5rem",
                  fontFamily: "'Graduate', 'serif'",
                }}
              >
                {awayTeam?.fouls}
              </Badge>
            </h2>
          </Col>
        </Row>
        <Row>
          <Col>
          <h2
          className="local-color-nonbg"
          style={{ fontFamily: "'Graduate', 'serif'", marginTop: "5vh", marginBottom: "3vh" }}
          >Local Players</h2>
                {localPlayers?.length === 5 ?
                localPlayers.map((player: any) => (
                  <h5 key={player.id}>{player.nombre} {player.apellido}</h5>
                ))
              :''}
          </Col>
          <Col>
          <h2
           className="visitor-color-nonbg"
           style={{ color: "#28a745", fontFamily: "'Graduate', 'serif'", marginTop: "5vh", marginBottom: "3vh" }}
          >Away Players</h2>
                {awayPlayers?.length === 5 ?
                awayPlayers.map((player: any) => (
                  <h5 key={player.id}>{player.nombre} {player.apellido}</h5>
                ))
              :''}
          </Col>
        </Row>
      </Container>
    </>
  );
}
