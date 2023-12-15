import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import MyCalendar from "../calendar/MyCalendar";

interface TLeague {
  ligaid: string;
  nombre: string;
  genero: string;
}

interface TPartido {
    
arbitroid: string;
equipo_ganador: string | null;
equipo_perdedor : string | null;
fecha : string;
fechatemporada : number;
ligaid: string;
localid: string;
partidoid: string; 
puntuacion_equipo_local:number;
puntuacion_equipo_visitante: number;
}

export default function MainScreen() {
  const [selectedLeague, setSelectedLeague] = useState<string | null>(null);
  const [allLeagues, setAllLeagues] = useState<TLeague[] | null>(null);
  const [date, setDate] = useState<Date>(new Date());
  const [partidosEnTemporada, setPartidosEnTemporada] = useState<string[]>([]);

  function handleSelectedLeagueSeasonOnDate(): void {
    fetch(`http://localhost:3000/matches/season/${selectedLeague}/1`)
      .then((res) => res.json())
      .then((res) => {
        setPartidosEnTemporada([]);
      });
  }

  const formatDate = (date: Date): string => {
    // Format date as 'yyyy-mm-dd'
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    fetch("http://localhost:3000/ligas/all")
      .then((res) => res.json())
      .then((res) => {
        setAllLeagues(res)
        setSelectedLeague(res[0].ligaid)
    });
  }, []);

  useEffect(() => {
    console.log("Fecha " + date + " Liga " + selectedLeague)
    if(selectedLeague != null)
        handleSelectedLeagueSeasonOnDate()
  },[date, setDate, selectedLeague, setSelectedLeague])

  return allLeagues != null ? (
    <>
      <select name="" id="" onChange={(e) => setSelectedLeague(e.target.value)}>
        {allLeagues.map((league) => (
          <option key={league.ligaid} value={league.ligaid}>
            {league.nombre}
          </option>
        ))}
      </select>
      <MyCalendar setterFecha={setDate} fecha={date} fechasPartidos={[""]}/>
      <div></div>
    </>
  ) : (
    <span>Loading Data</span>
  );
}
