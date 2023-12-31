import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import MatchTimer from "./MatchTimer";
import io from 'socket.io-client';
import { useNavigate, useParams } from "react-router-dom";
import {
  Badge,
  Button,
  ButtonGroup,
  ButtonToolbar,
  Col,
  Container,
  Row,
  Spinner,
} from "react-bootstrap";
<link
  href="https://fonts.googleapis.com/css2?family=Graduate&display=swap"
  rel="stylesheet"
></link>;

interface TPlayer {
  jugadorid: string;
  equipoid: string;
  nombre: string;
  apellido: string;
  dorsal: number;
  puntosPartido: number;
  faltasPartido: number;
}

interface TTeams {
  nombre: string;
  logo: string | null;
  id: string;
  score: number;
}

const socket = io('http://localhost:3001');
export default function RefereeScreenManagement() {
  const { matchID } = useParams();
  const [timer, setTimer] = useState();

  const [localModalShow, setLocalModalShow] = useState(false);
  const [awayModalShow, setAwayModalShow] = useState(false);

  const [localTeam, setLocalTeam] = useState<any>();
  const [awayTeam, setAwayTeam] = useState<any>();

  const [localTeamPlayers, setLocalTeamPlayers] = useState<TPlayer[] | null>(
    null
  );
  const [localFieldPlayers, setLocalFieldPlayers] = useState<TPlayer[] | null>(
    null
  );
  const [awayTeamPlayers, setAwayTeamPlayers] = useState<TPlayer[] | null>(
    null
  );
  const [awayFieldPlayers, setAwayFieldPlayers] = useState<TPlayer[] | null>(
    null
  );

  const [selectedLocalCheckboxes, setSelectedLocalCheckboxes] = useState<
    TPlayer[]
  >([]);

  const [holdTimeout, setHoldTimeout] = useState<number | null>(null);
  const [user, setUser] = useState<any | null>(null);

  const navigate = useNavigate();

  const handleLocalCheckboxChange = (checkboxValue: TPlayer) => {
    // Toggle the checkbox value in the selectedLocalCheckboxes array
    setSelectedLocalCheckboxes((prevSelected) => {
      if (prevSelected.includes(checkboxValue)) {
        return prevSelected.filter((value) => value !== checkboxValue);
      } else {
        return [...prevSelected, checkboxValue];
      }
    });
  };

  // Trigger an event when 5 checkboxes are selected

  const handleLocalEvent = () => {
    if (selectedLocalCheckboxes.length === 5) {
      setLocalFieldPlayers(selectedLocalCheckboxes);
      // Add your custom logic or function call here
    }
  };

  useEffect(() => {
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

    handleLocalEvent();
    console.log(selectedLocalCheckboxes);
  }, [selectedLocalCheckboxes, setSelectedLocalCheckboxes]);

  const [selectedAwayCheckboxes, setSelectedAwayCheckboxes] = useState<
    TPlayer[]
  >([]);

  const handleAwayCheckboxChange = (checkboxValue: TPlayer) => {
    // Toggle the checkbox value in the selectedAwayCheckboxes array
    setSelectedAwayCheckboxes((prevSelected) => {
      if (prevSelected.includes(checkboxValue)) {
        return prevSelected.filter((value) => value !== checkboxValue);
      } else {
        return [...prevSelected, checkboxValue];
      }
    });
  };

  // Trigger an event when 5 checkboxes are selected

  const handleAwayEvent = () => {
    if (selectedAwayCheckboxes.length === 5) {
      setAwayFieldPlayers(selectedAwayCheckboxes);
      // Add your custom logic or function call here
    }
  };

  useEffect(() => {
    handleAwayEvent();
    console.log(selectedAwayCheckboxes);
  }, [selectedAwayCheckboxes, setSelectedAwayCheckboxes]);

  useEffect(()=>{
    if(selectedAwayCheckboxes.length === selectedLocalCheckboxes.length){
      socket.emit("startingPlayers",{selectedAwayCheckboxes, selectedLocalCheckboxes, matchID})
    }
  },[selectedAwayCheckboxes, selectedLocalCheckboxes])

  function getPlayers() {
    fetch(`http://localhost:3000/matches/teamsplayersdate/${matchID}`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);

        setLocalTeam({
          nombre: res.localTeamDetails.localid.nombre,
          logo: res.localTeamDetails.localid.equipoLogo,
          id: res.localTeamDetails.localid.equipoid,
          score: res.localTeamDetails.puntuacion_equipo_local
        });
        setAwayTeam({
          nombre: res.visitorTeamDetails.visitanteid.nombre,
          logo: res.visitorTeamDetails.visitanteid.equipoLogo,
          id: res.visitorTeamDetails.visitanteid.equipoid,
          score: res.visitorTeamDetails.puntuacion_equipo_visitante
        });

        const localPlayers = res.localTeamDetails.localid.players.map(
          (jugador: any) => {
            const { faltas, genero, puntuacion, ...result } = jugador;
            return { ...result, puntosPartido: 0, faltasPartido: 0 };
          }
        );

        const awayPlayers = res.visitorTeamDetails.visitanteid.players.map(
          (jugador: any) => {
            const { faltas, genero, puntuacion, ...result } = jugador;
            return { ...result, puntosPartido: 0, faltasPartido: 0 };
          }
        );

        console.log(localPlayers);

        setLocalTeamPlayers(localPlayers);
        setAwayTeamPlayers(awayPlayers);
      });
  }

  const [changeLocal, setChangeLocal] = useState<string | null>(null);

  function handleChangeLocalPlayer(player: TPlayer) {
    if (localFieldPlayers !== null && changeLocal !== null) {
      const newArray: TPlayer[] = localFieldPlayers.map((playerOnTheField) =>
        playerOnTheField.jugadorid === changeLocal ? player : playerOnTheField
      );
      
      setLocalFieldPlayers(newArray);
      setChangeLocal(null);
      setLocalModalShow(false);

      socket.emit("substitutionUpdate", {players: newArray, equipoid: newArray[0].equipoid, partidoid: matchID})
    }
  }

  

  function handlePressStartLocal(player: TPlayer) {
    setChangeLocal(player.jugadorid);
    setLocalModalShow(true);
  }
  const [changeAway, setChangeAway] = useState<string | null>(null);

  function handleChangeAwayPlayer(player: TPlayer) {
    if (awayFieldPlayers !== null && changeAway !== null) {
      const newArray: TPlayer[] = awayFieldPlayers.map((playerOnTheField) =>
        playerOnTheField.jugadorid === changeAway ? player : playerOnTheField
      );

      setAwayFieldPlayers(newArray);
      setChangeAway(null);
      setAwayModalShow(false);

      socket.emit("substitutionUpdate", {players: newArray, equipoid: newArray[0].equipoid, partidoid: matchID})
    }
  }

  function handlePressStartAway(player: TPlayer) {
    setChangeAway(player.jugadorid);
    setAwayModalShow(true);

    // // Set a timeout for one second
    // setTimeout(() => {
    // console.log(pressStartTime)

    //   // Check if the user is still pressing after one second
    //   if (pressStartTime) {
    //     handleChangePlayer();
    //     // Perform your action here
    //   }
    // }, 1000);
  }

  // const handlePressEnd = () => {
  //   // Clear the press start time on press release
  //   setPressStartTime(null);
  // };

  function handlePointScored(player: TPlayer, points: number) {
    console.log(player, points);
    
    socket.emit("scoreUpdateTeams", {
      jugadorid: player.jugadorid,
      puntos: points,
      partidoid: matchID,
    })

    socket.on("scoreUpdateTeams", (data) =>{
      console.log(data);
      if(data.equipoToUpdate === localTeam?.id) {
        localTeam.score += data.puntos;
        setLocalTeam({...localTeam})
      } else if(data.equipoToUpdate === awayTeam?.id) {
        awayTeam.score += data.puntos
        setAwayTeam({...awayTeam})
      }
      socket.off("scoreUpdateTeams")
    })
    
    let arrayDeJugadores: TPlayer[] = [];
    let local = true;
    if (localTeamPlayers !== null && player.equipoid === localTeam?.id) {
      arrayDeJugadores = localTeamPlayers;
    } else if (awayTeamPlayers !== null) {
      arrayDeJugadores = awayTeamPlayers;
      local = false;
    }

    const indiceJugadorAActualizar = arrayDeJugadores.findIndex(
      (jugador) => jugador.jugadorid === player.jugadorid
    );

    if (indiceJugadorAActualizar !== -1) {
      const nuevoArrayDeJugadores = [...arrayDeJugadores];
      nuevoArrayDeJugadores[indiceJugadorAActualizar].puntosPartido +=
        points;

      local
        ? setLocalTeamPlayers(nuevoArrayDeJugadores)
        : setAwayTeamPlayers(nuevoArrayDeJugadores);
    } else {
      console.log(
        `Jugador con jugadorid ${player.jugadorid} no encontrado`
      );
    }
  }

  function handleFault(player: TPlayer) {
    
    socket.emit('foulUpdate', {
      jugadorId: player.jugadorid,
      partidoId: matchID,
      equipoId: player.equipoid
    });

    let arrayDeJugadores: TPlayer[] = [];
    let arrayDeJugadoresPista: TPlayer[] = [];
    let local = true;

    if (
      localTeamPlayers !== null &&
      localFieldPlayers !== null &&
      player.equipoid === localTeam?.id
    ) {
      arrayDeJugadores = localTeamPlayers;
      arrayDeJugadoresPista = localFieldPlayers;
    } else if (awayTeamPlayers !== null && awayFieldPlayers !== null) {
      arrayDeJugadores = awayTeamPlayers;
      arrayDeJugadoresPista = awayFieldPlayers;
      local = false;
    }

    const indiceJugadorAActualizar = arrayDeJugadores.findIndex(
      (jugador) => jugador.jugadorid === player.jugadorid
    );

    const indiceJugadorCampoAActualizar = arrayDeJugadoresPista.findIndex(
      (jugador) => jugador.jugadorid === player.jugadorid
    );

    console.log("Indice Jugador Banquillo" + indiceJugadorAActualizar);
    console.log("Indice Jugador Campo" + indiceJugadorCampoAActualizar);

    if (
      indiceJugadorAActualizar !== -1 &&
      indiceJugadorCampoAActualizar !== -1
    ) {
      const nuevoArrayDeJugadores = [...arrayDeJugadores];
      console.log(
        nuevoArrayDeJugadores[indiceJugadorAActualizar].faltasPartido
      );
      // nuevoArrayDeJugadores[indiceJugadorAActualizar].faltasPartido += 1;

      const nuevoArrayDeJugadoresPista = [...arrayDeJugadoresPista];
      console.log(
        nuevoArrayDeJugadoresPista[indiceJugadorCampoAActualizar]
          .faltasPartido
      );
      nuevoArrayDeJugadoresPista[
        indiceJugadorCampoAActualizar
      ].faltasPartido += 1;

      console.log(
        nuevoArrayDeJugadores[indiceJugadorAActualizar].faltasPartido
      );
      console.log(
        nuevoArrayDeJugadoresPista[indiceJugadorCampoAActualizar]
          .faltasPartido
      );
      local
        ? setLocalTeamPlayers(nuevoArrayDeJugadores)
        : setAwayTeamPlayers(nuevoArrayDeJugadores);
      local
        ? setLocalFieldPlayers(nuevoArrayDeJugadoresPista)
        : setAwayFieldPlayers(nuevoArrayDeJugadoresPista);
    } else {
      console.log(
        `Jugador con jugadorid ${player.jugadorid} no encontrado`
      );
    }

  }

  function handleFinish() {}

  useEffect(() => {
    socket.emit('joinMatchRoom', matchID);
    getPlayers();
  }, []);

  return (
    <>
      {localTeam !== null && awayTeam !== null ? (
        <>
          <MatchTimer partidoId={matchID} />

          <Container className="mt-3">
            <Row>
              <Col md={3}>
                <Badge
                  bg="local-color"
                  className="local-color mb-3"
                  style={{
                    fontSize: "1.3rem",
                    fontFamily: "'Graduate', 'serif'",
                  }}
                >
                  {localTeam?.nombre}
                </Badge>
                <Row>
                  <Col>
                    {localTeamPlayers?.map((localPlayer) => (
                      <div
                        key={localPlayer.jugadorid}
                        style={{
                          display: "flex",
                          justifyContent: "flex-start",
                        }}
                      >
                        <input
                          type="checkbox"
                          style={{ marginRight: "2vw" }}
                          id={`checkbox-${localPlayer.jugadorid}`}
                          checked={selectedLocalCheckboxes.includes(
                            localPlayer
                          )}
                          onChange={() =>
                            handleLocalCheckboxChange(localPlayer)
                          }
                          disabled={selectedLocalCheckboxes.length === 5}
                        />
                        <label htmlFor={`checkbox-${localPlayer.jugadorid}`}>
                          {localPlayer.dorsal} {localPlayer.nombre}
                        </label>
                      </div>
                    ))}
                  </Col>
                </Row>
              </Col>
              <Col md={3}>
                <Badge
                  bg="secondary"
                  style={{
                    fontSize: "1.3rem",
                    fontFamily: "'Graduate', 'serif'",
                    display: "inline-flex", // Usa inline-flex para mantener el comportamiento en línea
                    justifyContent: "center", // Centra el contenido horizontalmente
                    alignItems: "center", // Centra el contenido verticalmente
                    width: "50px", // Establece un ancho fijo para el Badge
                    height: "50px", // Establece una altura fija para el Badge
                  }}
                >
                  {localTeam?.score}
                </Badge>

                <Row>
                  <Col>
                    {localFieldPlayers?.map((player) => (
                      <div key={player.jugadorid}>
                        <Row>
                          <Col>
                            <Badge
                              style={{
                                height: "40px",
                                width: "150px",
                                marginBottom: "1vh",
                                marginTop: "1vh",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: "#474554",
                                fontSize: "1em", // Ajusta el tamaño de la fuente según sea necesario
                              }}
                              onClick={() => handlePressStartLocal(player)}
                              // onMouseUp={handlePressEnd}
                              onTouchStart={() => handlePressStartLocal(player)}
                              // onTouchEnd={handlePressEnd}
                              bg="#474554"
                            >
                              D: {player.dorsal}
                            </Badge>
                            <ButtonToolbar
                              aria-label="points btn group"
                              style={{ display: "flex", width: "100%" }}
                            >
                              <ButtonGroup
                                className="me-2"
                                aria-label="points"
                                style={{ flex: 3 }}
                              >
                                <Button
                                  style={{color:"#121212", fontWeight:"bold", width: "100%" }}
                                  className="primary-color-input border-black"
                                  onClick={() => handlePointScored(player, 1)}
                                >
                                  1
                                </Button>{" "}
                                <Button
                                  style={{color:"#121212", fontWeight:"bold", width: "100%" }}
                                  className="secondary-color-input border-black"
                                  onClick={() => handlePointScored(player, 2)}
                                >
                                  2
                                </Button>{" "}
                                <Button
                                  className="tertiary-color-input border-black" 
                                  style={{color:"#121212", fontWeight:"bold",  width: "100%"}}                                  onClick={() => handlePointScored(player, 3)}
                                >
                                  3
                                </Button>
                              </ButtonGroup>
                              <ButtonGroup
                                aria-label="fouls"
                                style={{ flex: 1 }}
                              >
                                <Button
                                  style={{ width: "100%"}}
                                  className="fouls-color-input border-black"
                                  onClick={() => handleFault(player)}
                                >
                                  F{player.faltasPartido}
                                </Button>
                              </ButtonGroup>
                            </ButtonToolbar>
                          </Col>
                        </Row>
                      </div>
                    ))}
                  </Col>
                </Row>
              </Col>

              <Col md={3}>
                <Badge
                  bg="secondary"
                  style={{
                    fontSize: "1.3rem",
                    fontFamily: "'Graduate', 'serif'",
                    display: "inline-flex", // Usa inline-flex para mantener el comportamiento en línea
                    justifyContent: "center", // Centra el contenido horizontalmente
                    alignItems: "center", // Centra el contenido verticalmente
                    width: "50px", // Establece un ancho fijo para el Badge
                    height: "50px", // Establece una altura fija para el Badge
                  }}
                >
                  {awayTeam?.score}
                </Badge>

                <Row>
                  <Col>
                    {awayFieldPlayers?.map((player) => (
                      <div key={player.jugadorid}>
                        <Row>
                          <Col>
                            <Badge
                              style={{
                                height: "40px",
                                width: "150px",
                                marginBottom: "1vh",
                                marginTop: "1vh",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: "#474554",
                                fontSize: "1em", // Ajusta el tamaño de la fuente según sea necesario
                              }}
                              bg="#474554" 
                              onClick={() => handlePressStartAway(player)}
                              // onMouseUp={handlePressEnd}
                              onTouchStart={() => handlePressStartAway(player)}
                              // onTouchEnd={handlePressEnd}
                            >
                              D: {player.dorsal}
                            </Badge>

                            <ButtonToolbar
                              aria-label="btn for points"
                              style={{ display: "flex", width: "100%" }}
                            >
                              <ButtonGroup
                                className="me-2"
                                aria-label="points"
                                style={{ flex: 3 }}
                              >
                                <Button
                                  className="tertiary-color-input border-black"
                                  style={{color:"#121212", fontWeight:"bold"}}
                                  onClick={() => handlePointScored(player, 1)}
                                >
                                  1
                                </Button>{" "}
                                <Button
                                  className="secondary-color-input border-black"
                                  style={{color:"#121212", fontWeight:"bold"}}
                                  onClick={() => handlePointScored(player, 2)}
                                >
                                  2
                                </Button>{" "}
                                <Button
                                  className="tertiary-color-input border-black"
                                  style={{color:"#121212", fontWeight:"bold"}}
                                  onClick={() => handlePointScored(player, 3)}
                                >
                                  3
                                </Button>
                              </ButtonGroup>
                              <ButtonGroup aria-label="fouls">
                                <Button
                                  className="fouls-color-input border-black"
                                  onClick={() => handleFault(player)}
                                >
                                  F{player.faltasPartido}
                                </Button>
                              </ButtonGroup>
                            </ButtonToolbar>
                          </Col>
                        </Row>
                      </div>
                    ))}
                  </Col>
                </Row>
              </Col>
              <Col md={3}>
                <div>
                  <Badge
                    bg="visitor-color"
                    className="visitor-color mb-3"
                    style={{
                      fontSize: "1.3rem",
                      fontFamily: "'Graduate', 'serif'",
                    }}
                  >
                    {awayTeam?.nombre}
                  </Badge>
                </div>
                <Row>
                  <Col>
                    {awayTeamPlayers?.map((player) => (
                      <div key={player.jugadorid} style={{ marginLeft: "5vw" }}>
                        <input
                          type="checkbox"
                          style={{ marginRight: "2vw" }}
                          id={`laway-checkbox-${player.jugadorid}`}
                          onChange={() => handleAwayCheckboxChange(player)}
                          disabled={selectedAwayCheckboxes.length === 5}
                        />
                        <label htmlFor={`away-checkbox-${player.jugadorid}`}>
                          <div key={player.jugadorid}>
                            <span>
                              {player.dorsal} {player.nombre}
                            </span>
                          </div>
                        </label>
                      </div>
                    ))}
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>

          <>
            <Modal
              show={localModalShow}
              aria-labelledby="contained-modal-title-vcenter"
            >
              <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                  Cambiar jugador de equipo local
                </Modal.Title>
              </Modal.Header>
              <Modal.Body className="grid-example">
                <Container>
                  {localTeamPlayers
                    ?.filter(
                      (player) =>
                        !localFieldPlayers?.some(
                          (localPlayer) =>
                            localPlayer.jugadorid === player.jugadorid
                        )
                    )
                    .map((player) => (
                      <Row key={player.jugadorid}>
                        <Col>
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <input style={{height:'30px'}}
                              type="checkbox"
                              id={`local-change-checkbox-${player.jugadorid}`}
                              onChange={() => handleChangeLocalPlayer(player)}
                            />
                            <label
                              htmlFor={`local-change-checkbox-${player.jugadorid}`}
                              style={{ display: "flex", marginLeft:'1vw' }}
                            >
                              <span style={{ marginRight: "10px", fontSize:'25px'}}>
                                {player.dorsal}.
                              </span>
                              <span style={{fontSize:'25px'}}>{player.nombre}</span>
                            </label>
                          </div>
                        </Col>
                      </Row>
                    ))}
                </Container>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={() => setLocalModalShow(false)}>Cerrar</Button>
              </Modal.Footer>
            </Modal>

            <Modal
              show={awayModalShow}
              aria-labelledby="contained-modal-title-vcenter"
            >
              <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                  Cambiar jugador de equipo visitante
                </Modal.Title>
              </Modal.Header>
              <Modal.Body className="grid-example">
                <Container>
                  {awayTeamPlayers
                    ?.filter(
                      (player) =>
                        !awayFieldPlayers?.some(
                          (awayPlayer) =>
                            awayPlayer.jugadorid === player.jugadorid
                        )
                    )
                    .map((player) => (
                      <Row key={player.jugadorid}>
                        <Col>
                        <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                          <input style={{height:'30px'}}
                            type="checkbox"
                            id={`away-change-checkbox-${player.jugadorid}`}
                            onChange={() => handleChangeAwayPlayer(player)}
                          />
                          <label
                            htmlFor={`away-change-checkbox-${player.jugadorid}`}
                            style={{ display: "flex", marginLeft:'1vw' }}
                       >
                             <span style={{ marginRight: "10px", fontSize:'25px'}}>
                                {player.dorsal}.
                              </span>
                              <span style={{fontSize:'25px'}}>{player.nombre}</span>
                          </label>
                          </div>
                        </Col>
                      </Row>
                    ))}
                </Container>
              </Modal.Body>
              <Modal.Footer>
                <Button className="primary-color" onClick={() => setAwayModalShow(false)}>Cerrar</Button>
              </Modal.Footer>
            </Modal>
          </>
        </>
      ) : (
        <div>
          <Spinner animation="border" className="spinner" />
        </div>
      )}
    </>
  );
}
