import { useEffect, useState, useContext } from "react";
import {
  Badge,
  Card,
  Col,
  ListGroup,
  Row,
  Image
} from "react-bootstrap";

import MyCalendar from "./MyCalendar";
import UserContext from "./../context/UserContext";
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
  logoLocal: string;
  visitanteid: string;
  nombrevisitante: string;
  logoVisitante: string;
  partidoid: string;
  puntuacion_equipo_local: number;
  puntuacion_equipo_visitante: number;
}

const EMAIL_REGEX: RegExp = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;

export default function Test() {
 
    const [selectedLeague, setSelectedLeague] = useState<string | null>(null);
    const [allLeagues, setAllLeagues] = useState<TLeague[] | null>(null);
    const [date, setDate] = useState<Date>(new Date());
    const [partidosEnTemporada, setPartidosEnTemporada] = useState<string[]>([]);
    const [partidosDia, setPartidosDia] = useState<TPartido[] | null>(null);
    const { setLoginUser } = useContext(UserContext);
    const navigate = useNavigate();
  
    function handleSelectedLeagueSeasonOnDate(): void {
      fetch(`http://localhost:3000/matches/season/${selectedLeague}/1`)
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          setPartidosEnTemporada([]);
        })
        .then((res) => matchesOfTheDay());
    }
  
    const formatDate = (dateParam: Date): string => {
      // Format date as 'yyyy-mm-dd'
      const year = dateParam.getFullYear();
      const month = String(dateParam.getMonth() + 1).padStart(2, "0");
      const day = String(dateParam.getDate()).padStart(2, "0");
  
      return `${year}-${month}-${day}`;
    };
  
    // mathDate:string
    function matchesOfTheDay() {
      fetch(
        // `http://localhost:3000/matches/byLD/${selectedLeague}/${formatDate(new Date())}`
        `http://localhost:3000/matches/byLD/bdb6b2cb-a058-42f4-b5be-199b36a8819c/2023-12-14`
      )
        .then((res) => res.json())
        .then(async (res) => {
          console.log(res);
          const matchesParsed = await Promise.all(
            res.map(async (partido: any) => {
              let local: string = "";
              let visitante: string = "";
              await Promise.all([
                fetch(`http://localhost:3000/teams/id/${partido.localid}`)
                  .then((response) => response.json())
                  .then((response) => (local = response.nombre)),
    
                fetch(`http://localhost:3000/teams/id/${partido.visitanteid}`)
                  .then((response) => response.json())
                  .then((response) => (visitante = response.nombre))
              ]);
    
              return { ...partido, nombrelocal: local, nombrevisitante: visitante };
            })
          );
    
          setPartidosDia(matchesParsed);
          console.log(partidosDia); // Move this line here
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
  
      fetch("http://localhost:3000/ligas/all")
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
  


  return (
    <>
      {/* <Row className="justify-content-center mt-4"></Row> */}
      <Row className="justify-content-center mt-4" style={{height:'150px'}}>
      {partidosDia && partidosDia.map((partido, index) => (
        <Card key={index} style={{ width: "80%", marginBottom: "3vh" }}>
          <Row>
            {/* Equipo Local */}
            <Col>
            <ListGroup>
            <Image
              src={`http://localhost:3000/${partido.logoLocal}`} // Asegúrate de que esta URL sea correcta
              alt="team-logo"
              fluid // Esta propiedad hace que la imagen sea responsive
              style={{ maxWidth: '100px', margin: '10px' }} // Ajusta el estilo según sea necesario
            />
            </ListGroup>
              <ListGroup variant="flush">
                <div className="d-flex justify-content-center align-items-center" style={{ height: "100%" }}>
                  <p>{partido.nombrelocal}</p>
                  <br />
                </div>
              </ListGroup>
            </Col>

            {/* Separador */}
            <Col 
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "15%",
                maxWidth: "15%",
              }}
            >
              <h5>
                <Badge style={{ justifyContent: "center" }} bg="danger">
                  VS
                </Badge>
              </h5>

              <h5>
                <Badge style={{ justifyContent: "center" }} bg="secondary">
                {partido.fecha}
                </Badge>
              </h5>
            </Col>

            {/* Equipo Visitante */}
            <Col>
              <ListGroup variant="flush">
                <div className="d-flex justify-content-center align-items-center" style={{ height: "100%" }}>
                  <p>{partido.nombrevisitante}</p>
                  <br />
                </div>
              </ListGroup>
            </Col>
          </Row>
        </Card>
      ))}
    </Row>
    </>
  );
}
