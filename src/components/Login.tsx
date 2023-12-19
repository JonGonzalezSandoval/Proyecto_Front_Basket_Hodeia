import { useContext, useState } from "react";
import { Button, Card, Container } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";

function Login() {
  const [user, setUser] = useState({ email: "", password: "" });

  const { setLoginUser } = useContext(UserContext);

  const navigate = useNavigate();

  function handleClick(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();

    let email = user.email;
    let password = user.password;

    let data = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    };

    fetch("http://192.168.1.129:3000/auth/login", data)
      .then((res) => {
        if (res.status == 202) {
          return res.text();
        }
        if (res.status == 401) throw new Error("Unauthorized");
      })
      .then((res) => {
        localStorage.removeItem("SavedToken");
        localStorage.setItem("SavedToken", "Bearer " + res);
        fetch("http://192.168.1.129:3000/auth/profile", {
            // NO SE CÓMO TIPAR EL HEADER PARA QUE NO DE PROBLEMAS
            headers: { Authorization: localStorage.getItem("SavedToken") || ""},
        })
          .then((res) => res.json())
          .then((res) => {
            console.log(res);
            setLoginUser(res);
            navigate("/home");
          });
      })
      .catch((error) => {
        if (error.message === "Unauthorized") {
          console.log("Unauthorized");
        } else {
          console.log("Other error handling: " + error);
          // Handle other errors here
        }
      });
  }

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    let userTemp = { ...user };
    //MIRAR MAÑANA EN CLASE, NO SE CÓMO TIPAR ESTO
    // userTemp[e.target.name] = e.target.value;
    setUser(userTemp);
  }
  return (
    <Container>
      <div className="login-container">
        <Card
          className="mb-3 ms-3 me-3 custom-background responsive-card"
          style={{ maxWidth: "600px", width: "100%" }}
        >
          <Container>
            <Form>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formHoopdeia.login"
              >
                <div className="login-label">
                  <Form.Label>Iniciar sesión</Form.Label>
                </div>

                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formHodeia.login.email"
                >
                  <Form.Label column sm="12">
                    Introduce tu email
                  </Form.Label>
                  <Col sm="12">
                    <Form.Control  onChange={handleInput} type="text" placeholder="email@example.com" />
                  </Col>
                </Form.Group>

                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formHodeia.login.password"
                >
                  <Form.Label column sm="12">
                    Introduce tu contraseña
                  </Form.Label>
                  <Col sm="12">
                    <Form.Control  onChange={handleInput} type="password" placeholder="Contraseña" />
                  </Col>
                </Form.Group>

                <div className="center-text">
                  <Button
                    className="primary-color-faded mb-3 button-bold"
                    type="submit"
                  >
                    Iniciar sesión
                  </Button>
                </div>

                <Form.Group controlId="formHodeia.login.registro">
                  <div
                    className="center-text"
                    style={{ marginTop: "10px", marginBottom: "10px" }}
                  >
                    <div>
                      <Form.Label onClick={(handleClick)} className="label-bold-margin">
                        ¿Todavía no te has registrado?
                      </Form.Label>
                    </div>
                    <div>
                      <Button className="secondary-color mb-3 button-bold-smaller">
                        <Link to="/register">Regístrate aquí</Link>
                      </Button>
                    </div>
                  </div>
                </Form.Group>
              </Form.Group>
            </Form>
          </Container>
        </Card>
      </div>
    </Container>
  );
}

export default Login;
