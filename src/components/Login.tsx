import { useState } from "react";
import { Button, Card, Container } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [user, setUser] = useState({ email: "", password: "" });

  const navigate = useNavigate();

  function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();

    let data = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user }),
    };

    fetch("http://localhost:3000/auth/login", data)
      .then((res) => {
        if (res.status < 400) {
          console.log(res);
          return res.json();
        }
        if (res.status == 401) throw new Error("Unauthorized");
      })
      .then((res) => {
        console.log(res);
        localStorage.removeItem("SavedToken");
        localStorage.setItem("SavedToken", "Bearer " + res.access_token);
        localStorage.removeItem("Rol");
        localStorage.setItem("Rol", res.rol);
        fetch("http://localhost:3000/profile", {
          headers: { Authorization: localStorage.getItem("SavedToken") || "" },
        })
          .then((res) => res.json())
          .then((res) => {
            console.log(res);
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
    let userTemp: any = { ...user };
    userTemp[e.target.name] = e.target.value;
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
                    <Form.Control
                      onChange={handleInput}
                      type="text"
                      placeholder="email@example.com"
                      name="email"
                    />
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
                    <Form.Control
                      onChange={handleInput}
                      type="password"
                      placeholder="Contraseña"
                      name="password"
                    />
                  </Col>
                </Form.Group>

                <div className="center-text">
                  <Button
                    className="primary-color-faded mb-3 button-bold"
                    type="submit"
                    onClick={handleClick}
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
                      <Form.Label className="label-bold-margin">
                        ¿Todavía no te has registrado?
                      </Form.Label>
                    </div>
                    <div>
                      <Link to="/register" style={{ textDecoration: "none" }}>
                        <Button className="secondary-color mb-3 button-bold-smaller">
                          Regístrate aquí
                        </Button>
                      </Link>
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
