import { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

interface TRegisterUser {
  nombre: string;
  apellidos: string;
  email: string;
  genero: string;
  password: string;
  confirmPassword: string;
  // usuarioImg: string;
  rol?: string | null;
}

const PWD_REGEX: RegExp =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{6,20}$/;
const EMAIL_REGEX: RegExp = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;

export default function Register() {
  const [showPassword, setShowPassword] = useState<Boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<Boolean>(false);
  const [validPassword, setValidPassword] = useState<Boolean | null>(null);
  const [validEmail, setValidEmail] = useState<Boolean | null>(null);
  const [equalPass, setEqualPass] = useState<Boolean | null>(null);
  const navigate = useNavigate();

  const [newUser, setNewUser] = useState<TRegisterUser>({
    nombre: "",
    apellidos: "",
    email: "",
    genero: "M",
    password: "",
    confirmPassword: "",
    // usuarioImg: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    // e.preventDefault();
    console.log(e.target.name + ": " + e.target.value);

    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    });
  }

  function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validEmail || !validPassword) {
      console.log("Debes introducir todos los datos válidos");
    } else{
      const data = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...newUser }),
      };

      fetch("http://localhost:3000/users/register", data)
      .then((res) => {
        if (res.status < 400) {
          return res.json();
        }
        throw new Error(res.statusText);
      })
      .then((res) => {
        console.log(res);
        navigate('/login')
      })
      .catch((error) => {
        if (error.message === "Unauthorized") {
          console.log("Not logged");
        } else {
          console.log("Other error handling: " + error);
          // Handle other errors here
        }
      })

      
    }
  }

  function checkEqual(e: React.FocusEvent<HTMLInputElement, Element>) {
    console.log(e.target.value === newUser.password);

    setEqualPass(e.target.value === newUser.password);
  }

  console.log(newUser);

  return (
    <>
      <Card className="mt-3 mb-3 ms-3 me-3 custom-background">
        <Container>
          <Form onSubmit={(e) => handleRegister(e)}>
            <Form.Group controlId="formHoopdeia.register">
              <div className="register-label">
                <Form.Label>Registro</Form.Label>
              </div>

              <div className="register-input-label">
                <Form.Label>Nombre</Form.Label>
              </div>

              <Form.Control
                className="mb-3"
                id="nombre"
                onChange={handleChange}
                required
                type="text"
                placeholder="Introduce tu nombre"
                name="nombre"
              />

              <Form.Label className="register-input-label">Apellido</Form.Label>
              <Form.Control
                className="mb-3"
                type="text"
                name="apellidos"
                placeholder="Introduce tus apellidos"
                id="apellidos"
                onChange={handleChange}
                required
              />

              <Form.Label className="register-input-label">Email</Form.Label>
              <Form.Control
                className="mb-3"
                type="text"
                name="email"
                placeholder="Introduce tu email"
                id="email"
                onChange={handleChange}
                onBlur={(e) => setValidEmail(EMAIL_REGEX.test(e.target.value))}
                required
              />

              {validEmail != null && !validEmail ? (
                <span>Email inválido</span>
              ) : (
                <span> Email válido</span>
              )}

              <br></br>
              <br></br>
              <Form.Label style={{ fontWeight: "bold" }}>Género</Form.Label>
              <br></br>
              <Container fluid={true}>
                <Form.Label className="me-3">Hombre</Form.Label>
                <Form.Check
                  inline
                  className="mb-3 custom-radio .form-check-input:checked"
                  type="radio"
                  name="genero"
                  placeholder="Introduce tu email"
                  value="H"
                  onChange={handleChange}
                  id="hombre"
                  checked={newUser.genero === "H"}
                />

                <Form.Label className="me-3">Mujer</Form.Label>
                <Form.Check
                  inline
                  className="mb-3 custom-radio .form-check-input:checked"
                  type="radio"
                  name="genero"
                  value="M"
                  onChange={handleChange}
                  id="mujer"
                  checked={newUser.genero === "M"}
                />

                <Form.Label className="me-3">Otro</Form.Label>
                <Form.Check
                  inline
                  className="mb-3 custom-radio .form-check-input:checked"
                  type="radio"
                  name="genero"
                  value="Otros"
                  onChange={handleChange}
                  id="otros"
                  checked={newUser.genero === "Otros"}
                />
              </Container>

              <Form.Label style={{ fontWeight: "bold" }}>Contraseña</Form.Label>
              <Row className="align-items-center">
                <Col xs={9} md={10}>
                  <Form.Control
                    className="mb-3"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Contraseña"
                    id="password"
                    onChange={handleChange}
                    onBlur={(e) =>
                      setValidPassword(PWD_REGEX.test(e.target.value))
                    }
                    required
                  />
                </Col>

                <Col xs={3} md={2}>
                  <Button variant="outline-secondary" className="mb-2">
                    <span onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-eye-slash-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588M5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z" />
                          <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z" />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-eye-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                          <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                        </svg>
                      )}
                    </span>
                  </Button>
                </Col>
              </Row>
              <br />
              {validPassword != null && !validPassword ? (
                <span>Contraseña inválida</span>
              ) : (
                <span>Contraseña válida</span>
              )}
              <br></br>
              <Form.Label style={{ fontWeight: "bold" }} className="mt-3">
                Confirmar contraseña
              </Form.Label>
              <Row className="align-items-center">
                <Col xs={9} md={10}>
                  <Form.Control
                    className="mb-3"
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Repite tu contraseña"
                    id="confirmPassword"
                    onChange={handleChange}
                    onBlur={checkEqual}
                  />
                </Col>
                <Col xs={3} md={2}>
                  <Button variant="outline-secondary" className="mb-2">
                    <span
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-eye-slash-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588M5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z" />
                          <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z" />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-eye-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                          <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                        </svg>
                      )}
                    </span>
                  </Button>
                </Col>
              </Row>
              <br />
              {equalPass != null && !equalPass ? (
                <span>Las contraseñas no coinciden</span>
              ) : (
                <span>Las contraseñas coinciden</span>
              )}
              <br />
              <br></br>
              <Button
                className="primary-color-faded mb-3 register-button"
                type="submit"
              >
                Registrarme
              </Button>
            </Form.Group>
          </Form>
        </Container>
      </Card>
    </>
  );
}
