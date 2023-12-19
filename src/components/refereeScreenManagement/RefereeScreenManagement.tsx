import { useEffect, useState } from "react";
import MatchTimer from "../matchTimer/MatchTimer";
import { useParams } from "react-router-dom";

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
}

export default function RefereeScreenManagement() {
  const { matchID } = useParams();

  const [timer, setTimer] = useState();

  const [localTeam, setLocalTeam] = useState<TTeams | null>(null);
  const [awayTeam, setAwayTeam] = useState<TTeams | null>(null);

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

  function getPlayers() {
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
    }
  }

  function handlePressStartLocal(player: TPlayer) {
    setChangeLocal(player.jugadorid);
    console.log(changeLocal);
  }
  const [changeAway, setChangeAway] = useState<string | null>(null);

  function handleChangeAwayPlayer(player: TPlayer) {
    if (awayFieldPlayers !== null && changeAway !== null) {
      const newArray: TPlayer[] = awayFieldPlayers.map((playerOnTheField) =>
        playerOnTheField.jugadorid === changeAway ? player : playerOnTheField
      );

      setAwayFieldPlayers(newArray);
      setChangeAway(null);
    }
  }

  function handlePressStartAway(player: TPlayer) {
    setChangeAway(player.jugadorid);

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

  function handlePointScored(
    player: TPlayer, points: number
  ) {
    const data = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jugadorid: player.jugadorid,
        puntos: points,
        partidoid: matchID,
      }),
    };
    fetch("http://localhost:3000/scores/new", data)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
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
          nuevoArrayDeJugadores[indiceJugadorAActualizar].puntosPartido += points;

          local?setLocalTeamPlayers(nuevoArrayDeJugadores):setAwayTeamPlayers(nuevoArrayDeJugadores);
        } else {
          console.log(
            `Jugador con jugadorid ${player.jugadorid} no encontrado`
          );
        }
      })
      .then( res => {
        if(localTeamPlayers != null){
          console.log(localTeamPlayers);
        }
      })
      .catch((error) => {});
  }

  function handleFault(player: TPlayer) {
    const data = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ jugadorid: player.jugadorid, partidoid: matchID }),
    };
    fetch("http://localhost:3000/fouls/new", data)
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
        let arrayDeJugadores: TPlayer[] = [];
        let arrayDeJugadoresPista: TPlayer[] = [];
        let local = true;
        if (localTeamPlayers !== null && localFieldPlayers !== null && player.equipoid === localTeam?.id) {
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

        if (indiceJugadorAActualizar !== -1 && indiceJugadorCampoAActualizar !== -1) {
          const nuevoArrayDeJugadores = [...arrayDeJugadores];
          nuevoArrayDeJugadores[indiceJugadorAActualizar].faltasPartido += 1;

          const nuevoArrayDeJugadoresPista = [...arrayDeJugadoresPista];
          nuevoArrayDeJugadoresPista[indiceJugadorCampoAActualizar].faltasPartido += 1;



          local?setLocalTeamPlayers(nuevoArrayDeJugadores):setAwayTeamPlayers(nuevoArrayDeJugadores);
          local?setLocalFieldPlayers(nuevoArrayDeJugadoresPista):setAwayFieldPlayers(nuevoArrayDeJugadoresPista);
        } else {
          console.log(
            `Jugador con jugadorid ${player.jugadorid} no encontrado`
          );
        }
      })
      .then( res => {
        if(localTeamPlayers != null){
          console.log(awayTeamPlayers);
        }
      })
      .catch((error) => {});
  }

  function handleFinish() {}

  useEffect(() => {
    getPlayers();
  }, []);

  return (
    <>
      {localTeam !== null && awayTeam !== null ? (
        <>
          <MatchTimer />
          <div>
            <span>{localTeam.nombre}</span>
          </div>
          <div>
            <span>{awayTeam.nombre}</span>
          </div>
          {localTeamPlayers !== null && awayTeamPlayers !== null ? (
            <>
              <div>
                {localTeamPlayers.map((player) => (
                  <div key={player.jugadorid}>
                    <input
                      type="checkbox"
                      id={`checkbox-${player.jugadorid}`}
                      checked={selectedLocalCheckboxes.includes(player)}
                      onChange={() => handleLocalCheckboxChange(player)}
                    />
                    <label htmlFor={`checkbox-${player.jugadorid}`}>
                      <div>
                        <ul>
                          <li>{player.dorsal}</li>
                          <li>{player.nombre}</li>
                          <li>{player.puntosPartido}</li>
                        </ul>
                      </div>
                    </label>
                  </div>
                ))}
              </div>
              <div>
                {changeLocal != null ? (
                  <div>
                    {awayTeamPlayers.map((player) => (
                      <div key={player.jugadorid}>
                        <input
                          type="checkbox"
                          id={`local-change-checkbox-${player.jugadorid}`}
                          onChange={() => handleChangeLocalPlayer(player)}
                        />
                        <label
                          htmlFor={`local-change-checkbox-${player.jugadorid}`}
                        >
                          <div key={player.jugadorid}>
                            <span>
                              {player.dorsal}
                              {player.nombre}
                            </span>
                          </div>
                        </label>
                      </div>
                    ))}
                  </div>
                ) : (
                  <></>
                )}
                {localFieldPlayers != null ? (
                  <>
                    {localFieldPlayers.map((player) => (
                      <div key={player.jugadorid}>
                        <ul>
                          <li
                            onClick={() => handlePressStartLocal(player)}
                            // onMouseUp={handlePressEnd}
                            onTouchStart={() => handlePressStartLocal(player)}
                            // onTouchEnd={handlePressEnd}
                            style={{
                              padding: "10px",
                              border: "1px solid #ccc",
                              cursor: "pointer",
                            }}
                          >
                            {player.dorsal}
                          </li>
                          <li>
                            <button
                              onClick={() => handlePointScored(player, 1)}
                            >
                              1
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={() => handlePointScored(player, 2)}
                            >
                              2
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={() => handlePointScored(player, 3)}
                            >
                              3
                            </button>
                          </li>
                          <li>
                            <button onClick={() => handleFault(player)}>
                              F {player.faltasPartido}
                            </button>
                          </li>
                        </ul>
                      </div>
                    ))}
                  </>
                ) : (
                  <>
                    <span>Selecciona los jugadores iniciales</span>
                    <div></div>
                  </>
                )}
              </div>
              <div>
                {awayTeamPlayers.map((player) => (
                  <div key={player.jugadorid}>
                    <input
                      type="checkbox"
                      id={`away-checkbox-${player.jugadorid}`}
                      checked={selectedAwayCheckboxes.includes(player)}
                      onChange={() => handleAwayCheckboxChange(player)}
                    />
                    <label htmlFor={`away-checkbox-${player.jugadorid}`}>
                      <div key={player.jugadorid}>
                        <ul>
                          <li>{player.dorsal}</li>
                          <li>{player.nombre}</li>
                          <li>{player.puntosPartido}</li>
                        </ul>
                      </div>
                    </label>
                  </div>
                ))}
              </div>
              <div>
                {changeAway != null ? (
                  <div>
                    {awayTeamPlayers.map((player) => (
                      <div key={player.jugadorid}>
                        <input
                          type="checkbox"
                          id={`away-change-checkbox-${player.jugadorid}`}
                          onChange={() => handleChangeAwayPlayer(player)}
                        />
                        <label
                          htmlFor={`away-change-checkbox-${player.jugadorid}`}
                        >
                          <div key={player.jugadorid}>
                            <span>
                              {player.dorsal}
                              {player.nombre}
                            </span>
                          </div>
                        </label>
                      </div>
                    ))}
                  </div>
                ) : (
                  <></>
                )}
                {awayFieldPlayers != null ? (
                  <>
                    {awayFieldPlayers.map((player) => (
                      <div key={player.jugadorid}>
                        <ul>
                          <li
                            onClick={() => handlePressStartAway(player)}
                            // onMouseUp={handlePressEnd}
                            onTouchStart={() => handlePressStartAway(player)}
                            // onTouchEnd={handlePressEnd}
                            style={{
                              padding: "10px",
                              border: "1px solid #ccc",
                              cursor: "pointer",
                            }}
                          >
                            {player.dorsal}
                          </li>
                          <li>
                            <button
                              onClick={() => handlePointScored(player, 1)}
                            >
                              1
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={() => handlePointScored(player, 2)}
                            >
                              2
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={() => handlePointScored(player, 3)}
                            >
                              3
                            </button>
                          </li>
                          <li>
                          <button onClick={() => handleFault(player)}>
                              F {player.faltasPartido}</button>
                          </li>
                        </ul>
                      </div>
                    ))}
                  </>
                ) : (
                  <>
                    <span>Selecciona los jugadores iniciales</span>
                    <div></div>
                  </>
                )}
              </div>
            </>
          ) : (
            <div>
              <span>Loading Player Info...</span>
            </div>
          )}
        </>
      ) : (
        <div>
          <span>Loading a Match...</span>
        </div>
      )}
    </>
  );
}
