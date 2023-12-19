import { useContext, useEffect, useState } from "react";
import MyCalendar from "../MyCalendar";
import UserContext from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

interface TLeague {
  ligaid: string;
  nombre: string;
  genero: string;
}

interface TPartido {
  arbitroid: string;
  equipo_ganador: string | null;
  equipo_perdedor: string | null;
  fecha: string;
  fechatemporada: number;
  ligaid: string;
  localid: string;
  nombrelocal: string;
  visitanteid: string;
  nombrevisitante: string;
  partidoid: string;
  puntuacion_equipo_local: number;
  puntuacion_equipo_visitante: number;
}

export default function MainScreen() {
  const [selectedLeague, setSelectedLeague] = useState<string | null>(null);
  const [allLeagues, setAllLeagues] = useState<TLeague[] | null>(null);
  const [date, setDate] = useState<Date>(new Date());
  const [partidosEnTemporada, setPartidosEnTemporada] = useState<string[]>([]);
  const [partidosDia, setPartidosDia] = useState<TPartido[] | null>(null);
  const { setLoginUser } = useContext(UserContext);
  const navigate = useNavigate();

  function handleSelectedLeagueSeasonOnDate(): void {
    fetch(`http://192.168.1.129:3000/matches/season/${selectedLeague}/1`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setPartidosEnTemporada([]);
      })
      .then((res) => matchesOfTheDay());
  }

  const formatDate = (date: Date): string => {
    // Format date as 'yyyy-mm-dd'
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  // mathDate:string
  function matchesOfTheDay() {
    fetch(
      `http://192.168.1.129:3000/matches/byLD/bdb6b2cb-a058-42f4-b5be-199b36a8819c/2023-12-14`
    )
      .then((res) => res.json())
      .then((res) => {
        setPartidosDia(res);
      });
  }

  useEffect(() => {
    // if (localStorage.getItem("SavedToken") !== null) {
    //   fetch("http://localhost:3000/api/auth/profile", {
    //     headers: { Authorization: localStorage.getItem("SavedToken") || "" }
    //   })
    //     .then((res) => {
    //       if (res.status === 401) {
    //         setLoginUser(null);
    //         navigate("/login");
    //         return;
    //       }
    //       return res.json();
    //     })
    //     .then((res) => {
    //       setLoginUser(res);
    //     });
    // } else {
    //   navigate("/login");
    // }

    fetch("http://192.168.1.129:3000/ligas/all")
      .then((res) => res.json())
      .then((res) => {
        setAllLeagues(res);
        setSelectedLeague(res[0].ligaid);
      });
  }, []);

  useEffect(() => {
    console.log("Fecha " + date + " Liga " + selectedLeague);
    if (selectedLeague != null) handleSelectedLeagueSeasonOnDate();
  }, [date, setDate, selectedLeague, setSelectedLeague]);

  return allLeagues != null ? (
    <>
      <select name="" id="" onChange={(e) => setSelectedLeague(e.target.value)}>
        {allLeagues.map((league) => (
          <option key={league.ligaid} value={league.ligaid}>
            {league.nombre}
          </option>
        ))}
      </select>
      <MyCalendar setterFecha={setDate} fecha={date} fechasPartidos={[""]} />
      <div>
        {partidosDia !== null ? <>
          {partidosDia.map(partido => (
            <div>
              <p>{partido.fecha}</p>
              <p>{partido.localid}</p>
              <p>{partido.visitanteid}</p>
            </div>
          //   <Card style={{ width: "18rem" }}>
          //   <ListGroup variant="flush">
          //     <ListGroup.Item></ListGroup.Item>
          //     <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
          //     <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
          //   </ListGroup>
          // </Card>
          ))}
        </> : <></>}
        <div>
          <div>Estado: </div>
          <div>
            <div>Equipo 1</div>
            <div> 17 </div>
          </div>
          <div>
            <div>Equipo 2</div>
            <div>25</div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <span>Loading Data</span>
  );
}
