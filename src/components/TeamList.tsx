import { useEffect, useState } from "react";
import { Button, Card, Col, Form, InputGroup, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

interface TTeams {
  equipoid: string;
  nombre: string;
  liga: string;
  ligaName: string;
  ciudad: string;
  genero: string;
  equipoLogo?: string;
  entrenadorid: string;
  entrenadorName: string;
}

export default function TeamList() {
  const [teams, setTeams] = useState<TTeams[] | null>(null);
  const [ user, setUser ] = useState<any | null>(null);

  const navigate = useNavigate();


  function getTeams(): void {
    fetch("http://localhost:3000/teams/all")
    .then((res) => res.json())
    .then((teams) => {
      const fetchPromises = teams.map((team: TTeams) => {
        // Fetch trainer details
        const trainerPromise = fetch(`http://localhost:3000/users/id/${team.entrenadorid}`)
          .then((res) => res.json())
          .then((trainerDetails) => {
            team.entrenadorName = trainerDetails.nombre;
          });

        // Fetch league details
        const leaguePromise = fetch(`http://localhost:3000/ligas/id/${team.liga}`)
          .then((res) => res.json())
          .then((leagueDetails) => {
            team.ligaName = leagueDetails.nombre;
          });

        // Wait for both promises to complete for each team
        return Promise.all([trainerPromise, leaguePromise]).then(() => team);
      });

      // Wait for all teams' details to be fetched
      return Promise.all(fetchPromises);
    })
    .then((teamsWithDetails) => {
      setTeams(teamsWithDetails);
    });
  }

  useEffect(() => {
    if (localStorage.getItem("SavedToken") !== null) {
      fetch("http://localhost:3000/auth/profile", {
        headers: { Authorization: localStorage.getItem("SavedToken") || ""},
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
          if(res.rol !== "bb907068-b7cc-4b9c-be47-f3b6c668d5c4"){
            navigate("/home")
          }
        });
    } else {
      navigate("/login");
    }

    getTeams();
  }, []);

  return (
    <>
      <Card className="mt-4">
        <Card.Header as="h5">Crear equipo</Card.Header>
        <Card.Body>
          {/* <Form onSubmit={handleRegister}> */}
          <Form>
            <InputGroup className="mb-3">
              <InputGroup.Text id="nombre">Nombre</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Nombre"
                aria-label="Nombre"
                aria-describedby="nombre"
                name="nombre"
                id="nombre"
                // onChange={handleChange}
                required
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text id="entrenador">Entrenador/a</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Entrenador"
                aria-label="Entrenador"
                aria-describedby="entrenador"
                name="entrenador"
                id="entrenador"
                // onChange={handleChange}
                required
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text id="genero">Género</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Género"
                aria-label="Genero"
                aria-describedby="genero"
                name="genero"
                id="genero"
                // onChange={handleChange}
                required
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="liga">Liga</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Liga"
                aria-label="Liga"
                aria-describedby="liga"
                name="liga"
                id="liga"
                // onChange={handleChange}
                required
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="ciudad">Ciudad</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Ciudad"
                aria-label="Ciudad"
                aria-describedby="ciudad"
                name="ciudad"
                id="ciudad"
                // onChange={handleChange}
                required
              />
            </InputGroup>

            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Selecciona el logo del equipo</Form.Label>
              <Form.Control type="file" />
            </Form.Group>
            <br />
            <Button variant="secondary" type="submit">
              Registrar equipo
            </Button>
          </Form>
        </Card.Body>
      </Card>

      <br></br>

      {teams &&
        teams.map((team) => (
          <Card key={team.equipoid}>
            <Row className="no-gutters"> 
              <Col
                xs={12}
                md={2}
                className="mt-3 mb-3 ms-md-5 d-flex justify-content-center"
              >
                <Card.Img
                  style={{
                    height: "100%",
                    width: "150px",
                    borderRadius: "50%",
                  }}
                  src={`http://localhost:3000/${team.equipoLogo}`}
                  alt="team-logo"
                />
              </Col>
              <Col xs={12} md={8}>
                <Card.Body>
                  <Row>
                    <Col xs={12} className="ms-3 text-xs-center">
                      <Card.Title>{team.nombre}</Card.Title>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="ms-3">
                      <Card.Text>Género: {(team.genero=="M" ? "Masculino" : "Femenino")}</Card.Text>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="ms-3">
                      <Card.Text>Liga: {team.ligaName}</Card.Text>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="ms-3">
                      <Card.Text>Lugar: {team.ciudad}</Card.Text>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="ms-3">
                      <Card.Text>Entrenador: {team.entrenadorName}</Card.Text>
                    </Col>
                  </Row>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        ))}
    </>
  );
}
