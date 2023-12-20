import { useContext, useEffect, useState } from "react";
import MyCalendar from "./MyCalendar";
import UserContext from "./../context/UserContext";
import { useNavigate, Link} from "react-router-dom";
import {
  Badge,
  Card,
  Col,
  ListGroup,
  Row,
  Spinner,
 
} from "react-bootstrap";
import Form from "react-bootstrap/Form";


// SPINNER PARA JON:
{
  /* <Spinner animation="border" className="spinner" /> */
}

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

export default function MainScreen() {
  const [selectedLeague, setSelectedLeague] = useState<string | null>(null);
  const [allLeagues, setAllLeagues] = useState<TLeague[] | null>(null);
  const [date, setDate] = useState<Date>(new Date());
  const [partidosEnTemporada, setPartidosEnTemporada] = useState<string[]>([]);
  const [partidosDia, setPartidosDia] = useState<TPartido[] | null>(null);

  const navigate = useNavigate();

  function handleSelectedLeagueSeasonOnDate(): void {
    fetch(`http://localhost:3000/matches/season/${selectedLeague}/1`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setPartidosEnTemporada([]);
      })
      .then(() => matchesOfTheDay());
  }

  const createDatesForCalendar = (fechaParseo: string) => {};

  const formatDate = (dateParam: Date): string => {
    // Format date as 'yyyy-mm-dd'
    const year = dateParam.getFullYear();
    const month = String(dateParam.getMonth() + 1).padStart(2, "0");
    const day = String(dateParam.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  // mathDate:string
  function matchesOfTheDay() {
    console.log(formatDate(date));
    fetch(
      `http://localhost:3000/matches/byLD/${selectedLeague}/${formatDate(date)}`
    )
      .then((res) => res.json())
      .then(async (res) => {
        console.log(res);
        const matchesParsed = await Promise.all(
          res.map(async (partido: any) => {
            let local: string = "";
            let logoLocal: string = "";
            let visitante: string = "";
            let logoVisitante: string = "";

            await Promise.all([
              fetch(`http://localhost:3000/teams/id/${partido.localid}`)
                .then((response) => response.json())
                .then((response) => {
                  local = response.nombre;
                  logoLocal = response.equipoLogo;
                }),

              fetch(`http://localhost:3000/teams/id/${partido.visitanteid}`)
                .then((response) => response.json())
                .then((response) => {
                  visitante = response.nombre;
                  logoVisitante = response.equipoLogo;
                }),
            ]);

            return {
              ...partido,
              nombrelocal: local,
              logoLocal: logoLocal,
              nombrevisitante: visitante,
              logoVisitante: logoVisitante,
            };
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

  return allLeagues != null ? (
    <>
      <Form.Select
        aria-label="Selecciona una liga"
        onChange={(e) => setSelectedLeague(e.target.value)}
        className="small-select"
        style={{ marginTop: "5vh" }}
      >
        <option disabled selected value="">
          Selecciona una liga
        </option>
        {allLeagues.map((league) => (
          <option key={league.ligaid} value={league.ligaid}>
            {league.nombre}
          </option>
        ))}
      </Form.Select>

      <MyCalendar
        setterFecha={setDate}
        fecha={date}
        fechasPartidos={[
          new Date(2023, 11, 5),
          new Date(2023, 11, 10),
          new Date(2023, 11, 15),
        ]}
      />

      <div>
        <Row
          className="justify-content-center mt-4"
          style={{ height: "150px" }}
        >
          {partidosDia &&
            partidosDia.map((partido, index) => (
              <Card
                key={index}
                style={{
                  width: "80%",
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
                        src={`http://localhost:3000/${partido.logoLocal}`} // Asegúrate de que esta URL sea correcta
                        alt="team-logo"
                        style={{
                          maxWidth: "100px",
                          margin: "10px",
                          borderRadius: "50px",
                        }} // Ajusta el estilo según sea necesario
                      />
                    </ListGroup>
                    <p>{partido.nombrelocal}</p>
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
                        src={`http://localhost:3000/${partido.logoVisitante}`} 
                        alt="team-logo"
                        style={{
                          maxWidth: "100px",
                          margin: "10px",

                          borderRadius: "50px",
                        }} // Ajusta el estilo según sea necesario
                      />
                      <p>{partido.nombrevisitante}</p>
                    </ListGroup>
                  </Col>
                 
                  <Col
                    className="d-flex justify-content-center align-items-center"
                    style={{ minHeight: "0px" }}
                  >
                    <Link to="/manager/:matchID">
                      {" "}
                  
                      <Card.Img
                        src="https://i.ibb.co/Cb1jVks/silbato.png"
                        alt="team-logo"
                        style={{
                          maxWidth: "50px",
                          margin: "10px",
                          borderRadius: "50px",
                        }}
                      />
                    </Link>
                  </Col>
                </Row>
              </Card>
            ))}
        </Row>
      </div>
    </>
  ) : (
    <Spinner animation="border" className="spinner" />
  );
}
