import { useEffect, useState } from "react";
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
    fetch("http://192.168.1.129:3000/users/role/entrenador")
      .then((res) => res.json())
      .then((res) => setCoaches(res));
  }

  useEffect(() => {
    getCoaches();
  }, []);

  return (
    <>
      {/* <Row className="justify-content-center mt-4"></Row> */}
      <Row className="justify-content-center mt-4">
        {coaches &&
          coaches.map((coach) => (
            <Card
              key={coach.usuarioid}
              style={{ width: "80%", marginBottom: "3vh" }}
            >
              <Row>
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
                      {coach.nombre} {coach.apellidos}
                    </ListGroup.Item>
                  </ListGroup>
                </Col>

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
                </Col>

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
                      {coach.nombre} {coach.apellidos}
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
              </Row>
            </Card>
          ))}
      </Row>
    </>
  );
}
