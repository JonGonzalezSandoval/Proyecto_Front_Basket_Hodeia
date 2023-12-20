import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  // faPersonDress,
  // faPerson,
  // faUserSecret,
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { Button, Card, Col, Form, InputGroup, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

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

export default function CoachLists() {
  const [ user, setUser ] = useState<any | null>(null);
  const [coaches, setCoaches] = useState<TCoach[] | null>(null);
  const [validEmail, setValidEmail] = useState<Boolean | null>(null);
  const [newCoach, setNewCoach] = useState<TRegisterCoach>({
    nombre: "",
    apellidos: "",
    email: "",
    genero: "",
    password: "Passw0rd!",
    rol: "d8d4b514-800a-4827-a92b-e4f3770ef76b",
    isActive: false,
  });

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

    fetch("http://localhost:3000/users/role/entrenador")
      .then((res) => res.json())
      .then((res) => setCoaches(res));
  }

  useEffect(() => {
    getCoaches();
  }, []);

  return (
    <>
      {/* <Row className="justify-content-center mt-4"></Row> */}
      <Card>
        <Card.Header as="h5">Crear entrenador/a</Card.Header>
        <Card.Body>
          <Form onSubmit={handleRegister}>
            <InputGroup className="mb-3">
              <InputGroup.Text id="nombre">Nombre</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Nombre"
                aria-label="Nombre"
                aria-describedby="nombre"
                name="nombre"
                id="nombre"
                onChange={handleChange}
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
                onChange={handleChange}
                required
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text id="email">Email</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Email"
                aria-label="Email"
                aria-describedby="email"
                name="email"
                id="email"
                onChange={handleChange}
                // onBlur={(e) => setValidEmail(EMAIL_REGEX.test(e.target.value))}
                required
              />
            </InputGroup>

            <InputGroup>
              <Card.Text>Género:</Card.Text>
              <Form.Group className="ms-4">
                <Form.Check
                  inline
                  type="radio"
                  name="genero"
                  id="hombre"
                  value="H"
                  label="Hombre"
                  onChange={handleChange}
                  checked={newCoach.genero === "H"}
                />
              </Form.Group>
              <Form.Group>
                <Form.Check
                  inline
                  type="radio"
                  name="genero"
                  id="mujer"
                  value="M"
                  label="Mujer"
                  onChange={handleChange}
                  checked={newCoach.genero === "M"}
                />
              </Form.Group>

              <Form.Group>
                <Form.Check
                  inline
                  type="radio"
                  name="genero"
                  id="Otros"
                  value="Otros"
                  label="Otros"
                  onChange={handleChange}
                  checked={newCoach.genero === "Otros"}
                />
              </Form.Group>
            </InputGroup>
            <br />
            <Button variant="secondary" type="submit">
              Registrar entrenador/a
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <br></br>

      {coaches &&
        coaches.map((coach) => (
          <Row className="mb-4">
            <Col key={coach.usuarioid}>
              <Card>
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

                <Card.Body>
                  <Card.Title>
                    {coach.nombre} {coach.apellidos}
                  </Card.Title>
                  <Card.Text>
                    <p>Email: {coach.email}</p>
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
                    <p>
                      En activo:{" "}
                      {coach.isActive ? (
                        <FontAwesomeIcon icon={faCircleCheck} />
                      ) : (
                        <FontAwesomeIcon icon={faCircleXmark} />
                      )}
                    </p>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        ))}
    </>
  );
}
