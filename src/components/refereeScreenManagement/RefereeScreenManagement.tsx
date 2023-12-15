import { useState } from "react";
import MatchTimer from "../matchTimer/MatchTimer";
import { useParams } from "react-router-dom";

interface TPlayer {
  id: string;
  nombre: string;
  apellido: string;
  dorsal: string;
  puntosPartido: number;
  faltasPartido: number;
}

interface TProp {
  matchID: string;
}

const listaJugadoresLocal: TPlayer[] = [
  {
    id: "primero",
    nombre: "Venice",
    apellido: "Lobato",
    dorsal: "1",
    puntosPartido: 0,
    faltasPartido: 0,
  },
  {
    id: "Segundo",
    nombre: "Aitor",
    apellido: "Meandros",
    dorsal: "3",
    puntosPartido: 0,
    faltasPartido: 0,
  },
  {
    id: "tercero",
    nombre: "Leon",
    apellido: "Ramirez",
    dorsal: "7",
    puntosPartido: 0,
    faltasPartido: 0,
  },
];

const listaJugadoresAway: TPlayer[] = [
  {
    id: "Agua",
    nombre: "SonDeLuz",
    apellido: "El Audaz",
    dorsal: "1",
    puntosPartido: 0,
    faltasPartido: 0,
  },
  {
    id: "Fuego",
    nombre: "Vasher",
    apellido: "Pacifico",
    dorsal: "2",
    puntosPartido: 0,
    faltasPartido: 0,
  },
  {
    id: "Tierra",
    nombre: "Waxillum",
    apellido: "Ladrian",
    dorsal: "16",
    puntosPartido: 0,
    faltasPartido: 0,
  },
];

export default function RefereeScreenManagement() {
  const [timer, setTimer] = useState();
  const { matchID } = useParams();
  const [localTeamPlayers, setLocalTeamPlayers] = useState<TPlayer[] | null>(
    listaJugadoresLocal
  );
  const [localFieldPlayers, setLocalFieldPlayers] = useState<TPlayer[] | null>(
    null
  );
  const [awayTeamPlayers, setAwayTeamPlayers] = useState<TPlayer[] | null>(
    listaJugadoresAway
  );
  const [awayFieldPlayers, setAwayFieldPlayers] = useState<TPlayer[] | null>(
    null
  );

  function getPlayers() {
    fetch(`${matchID}`)
      .then((res) => res.json())
      .then((res) => console.log(res));
  }

  function handlePointScored() {}

  function handleChangePlayer() {}

  function handleFinish() {}

  return (
    <>
      <MatchTimer />
      {localTeamPlayers !== null && awayTeamPlayers !== null ? (
        <>
          <div>
            {localTeamPlayers.map((player) => (
              <div>
                <ul>
                  <li>{player.dorsal}</li>
                  <li>{player.nombre}</li>
                  <li>{player.puntosPartido}</li>
                </ul>
              </div>
            ))}
          </div>
          <div>
            {localFieldPlayers != null ? (
              <>
                {localFieldPlayers.map((player) => (
                  <div>
                    <ul>
                      <li>{player.dorsal}</li>
                      <li>1</li>
                      <li>2</li>
                      <li>3</li>
                      <li>{player.faltasPartido}</li>
                    </ul>
                  </div>
                ))}
              </>
            ) : (
              <>
                <span>Selecciona los jugadores iniciales</span>
                <div>
                  <form action="">
                    <select name="inicioLocal" id="">
                      {localTeamPlayers.map((player) => (
                        <option
                          value={player.id}
                        >{`${player.dorsal} - ${player.dorsal}`}</option>
                      ))}
                    </select>
                    <input type="submit" value="Mandar seleccionados"/>
                  </form>
                </div>
              </>
            )}
          </div>
          <div>
            {awayTeamPlayers.map((player) => (
              <div>
                <ul>
                  <li>{player.dorsal}</li>
                  <li>{player.nombre}</li>
                  <li>{player.puntosPartido}</li>
                </ul>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div>
          <span>Loading Match...</span>
        </div>
      )}
    </>
  );
}
