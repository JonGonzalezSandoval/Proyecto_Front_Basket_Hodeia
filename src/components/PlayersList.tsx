import { Button, Card, Col, Form, InputGroup, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import '../custom-styles.css'
import { useNavigate } from "react-router";

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

export default function PlayersList() {
  const [coaches, setCoaches] = useState<TCoach[] | null>(null);
  const [validEmail, setValidEmail] = useState<Boolean | null>(null);
  const [newCoach, setNewCoach] = useState<TRegisterCoach>({
    nombre: "",
    apellidos: "",
    email: "",
    genero: "",
    password: "Passw0rd!",
    // usuarioImg: string,
    rol: "d8d4b514-800a-4827-a92b-e4f3770ef76b",
    isActive: false,
  });
  const [ user, setUser ] = useState<any | null>(null);

  const navigate = useNavigate();

  function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validEmail) {
      console.log("Debes introducir todos los datos válidos");
    } else if (newCoach.nombre === "") {
      console.log("registrar");
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    // e.preventDefault();
    if (e.target.name == "email") {
      setValidEmail(EMAIL_REGEX.test(e.target.value));
    }

    console.log(e.target.name + ": " + e.target.value);

    setNewCoach({
      ...newCoach,
      [e.target.name]: e.target.value,
    });
  }

  function getCoaches(): void {
    fetch("http://localhost:3000/users/role/entrenador")
      .then((res) => res.json())
      .then((res) => setCoaches(res));
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
        });
    } else {
      navigate("/login");
    }
    getCoaches();
  }, []);

  return (
    <>
      <Card className="mt-4">
        <Card.Header as="h5">Crear jugador/a</Card.Header>
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
              <InputGroup.Text id="apellidos">Apellidos</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Apellidos"
                aria-label="Apellidos"
                aria-describedby="apellidos"
                name="apellidos"
                id="apellidos"
                // onChange={handleChange}
                required
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text id="dorsal">Dorsal</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Dorsal"
                aria-label="Dorsal"
                aria-describedby="dorsal"
                name="dorsal"
                id="dorsal"
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
            <br />
            <Button variant="secondary" type="submit">
              Registrar jugador
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <br></br>

      <Row xs={1} md={2} className="g-4">
        {coaches &&
          coaches.map((coach) => (
            <Col key={coach.usuarioid}>
              <Card>
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{ height: "100%" }}
                >
                  <div style={{marginTop:'2vh'}}>
                      <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="75"
                      height="75"
                      fill="#2F3135"
                      className="bi bi-person-vcard"
                      viewBox="0 0 16 16"
                    >
                      <path d="M5 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4m4-2.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5M9 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4A.5.5 0 0 1 9 8m1 2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5" />
                      <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zM1 4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H8.96c.026-.163.04-.33.04-.5C9 10.567 7.21 9 5 9c-2.086 0-3.8 1.398-3.984 3.181A1.006 1.006 0 0 1 1 12z" />
                    </svg> 
                  </div>
                </div>

                <Card.Body>
                  <Card.Title>
                    {coach.nombre} {coach.apellidos}
                  </Card.Title>
                  <Card.Text>
                    <p>Dorsal: 23</p>
                    <p>
                      Género:{" "}
                      {coach.genero === "M" ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-gender-male"
                          viewBox="0 0 16 16"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M9.5 2a.5.5 0 0 1 0-1h5a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-1 0V2.707L9.871 6.836a5 5 0 1 1-.707-.707L13.293 2zM6 6a4 4 0 1 0 0 8 4 4 0 0 0 0-8"
                          />
                        </svg>
                      ) : // <FontAwesomeIcon icon={faPerson} />
                      coach.genero === "F" ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-gender-female"
                          viewBox="0 0 16 16"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M8 1a4 4 0 1 0 0 8 4 4 0 0 0 0-8M3 5a5 5 0 1 1 5.5 4.975V12h2a.5.5 0 0 1 0 1h-2v2.5a.5.5 0 0 1-1 0V13h-2a.5.5 0 0 1 0-1h2V9.975A5 5 0 0 1 3 5"
                          />
                        </svg>
                      ) : (
                        // <FontAwesomeIcon icon={faPersonDress} />
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-gender-ambiguous"
                          viewBox="0 0 16 16"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M11.5 1a.5.5 0 0 1 0-1h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V1.707l-3.45 3.45A4 4 0 0 1 8.5 10.97V13H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V14H6a.5.5 0 0 1 0-1h1.5v-2.03a4 4 0 1 1 3.471-6.648L14.293 1zm-.997 4.346a3 3 0 1 0-5.006 3.309 3 3 0 0 0 5.006-3.31z"
                          />
                        </svg>
                        // <FontAwesomeIcon icon={faUserSecret} />
                      )}
                    </p>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
    </>
  );
}

/* <Card>
        <Row>
          <Col className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100"
              height="100"
              fill="currentColor"
              className="bi bi-person-plus"
              viewBox="0 0 16 16"
            >
              <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664z" />
              <path
                fill-rule="evenodd"
                d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5"
              />
            </svg>
          </Col>
          <Col>
            <Row>
              <Col className="mt-3">
                <Card.Title>Koldo Hernán</Card.Title>
              </Col>
            </Row>
            <Row>
              <Col className="mt-3">
                <Card.Text>Nombre: Koldo</Card.Text>
              </Col>
            </Row>
            <Row>
              <Col className="mt-3">
                <Card.Text>Apellidos: Hernán López</Card.Text>
              </Col>
            </Row>
            <Row>
              <Col className="mt-3">
                <Card.Text>Dorsal: 23</Card.Text>
              </Col>
            </Row>
            <Row>
              <Col className="mt-3">
                <Card.Text>Género: Masculino</Card.Text>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card> */
