import { useEffect, useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  // faPersonDress,
  // faPerson,
  // faUserSecret,
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import {
  Badge,
  Button,
  Card,
  Col,
  Form,
  InputGroup,
  ListGroup,
  Row,
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
  visitanteid: string;
  nombrevisitante: string;
  partidoid: string;
  puntuacion_equipo_local: number;
  puntuacion_equipo_visitante: number;
}

interface TCoach {
  usuarioid: string;
  nombre: string;
  apellidos: string;
  email: string;
  genero: string;
  usuarioImg: null | string;
  isActive: boolean;
}

interface TRegisterCoach {
  nombre: string;
  apellidos: string;
  email: string;
  genero: string;
  password: string;
  // usuarioImg: string;
  rol: string;
  isActive: boolean;
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
      <Row className="justify-content-center mt-4">
        {partidosDia !== null &&
          Array.from(
            { length: Math.ceil(partidosDia.length / 2) },
            (_, i) => i
          ).map((index) => {
            const partido1 = partidosDia[index * 2];
            const partido2 = partidosDia[index * 2 + 1];

            return (
              <Card key={index} style={{ width: "80%", marginBottom: "3vh" }}>
                <Row>
                  {/* Entrenador 1 */}
                  <Col>
                    <ListGroup variant="flush">
                      <div
                        className="d-flex justify-content-center align-items-center"
                        style={{ height: "100%" }}
                      >
                        <Card.Img
                          style={{ width: "100px", marginTop: "4vh" }}
                          src="https://i.ibb.co/tMYyr7j/usuario-orange.png"
                          alt="usuario-orange"
                        />
                      </div>
                      <ListGroup.Item style={{ width: "80%" }}>
                        {partido1.nombrelocal}
                      </ListGroup.Item>
                    </ListGroup>
                  </Col>

                  {/* VS */}
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
                      <Badge
                        style={{ justifyContent: "center" }}
                        bg="secondary"
                      >
                        {partido1.fecha}
                      </Badge>
                    </h5>
                  </Col>

                  {/* Entrenador 2 (si existe) */}
                  {partido2 && (
                    <Col>
                      <ListGroup variant="flush">
                        <div
                          className="d-flex justify-content-center align-items-center"
                          style={{ height: "100%" }}
                        >
                          <Card.Img
                            style={{ width: "100px", marginTop: "4vh" }}
                            src="https://i.ibb.co/tMYyr7j/usuario-orange.png"
                            alt="usuario-orange"
                          />
                        </div>

                        <ListGroup.Item
                          style={{
                            width: "80%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "flex-end",
                            height: "100%",
                          }}
                        >
                          {partido1.nombrevisitante}
                        </ListGroup.Item>
                      </ListGroup>
                    </Col>
                  )}
                </Row>
              </Card>
            );
          })}
      </Row>
    </>
  );
}
