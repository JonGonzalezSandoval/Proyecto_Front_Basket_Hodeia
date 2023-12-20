import { useEffect, useState } from "react";
import { Button, Card, Col, Form, InputGroup, Row } from "react-bootstrap";

interface TLiga {
  id: string;
  nombre: string;
  genero: string;
}

export default function LeagueList() {
  const [ligas, setLigas] = useState<TLiga[] | null>(null);

  function getLigas(): void {
    fetch("http://localhost:3000/ligas/all")
      .then((res) => res.json())
      .then((res) => setLigas(res));
  }

  useEffect(() => {
    getLigas();
  }, []);

  return (
    <>
      <Card className="mt-4">
        <Card.Header as="h5">Crear liga</Card.Header>
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
              Registrar liga
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <br></br>

      {ligas &&
        ligas.map((liga) => (
          <Card>
            <Row className="no-gutters">
              <Col xs={2} className="mt-3 mb-3 ms-3">
                <Card.Img
                  style={{
                    height: "100%",
                    width: "100px",
                  }}
                  src="https://i.ibb.co/Ph194np/basket-ball.png"
                  alt="basketball"
                />
              </Col>
              <Col xs={8}>
                <Card.Body>
                  <Row>
                    <Col className="mt-3">
                      <Card.Title>{liga.nombre}</Card.Title>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Card.Text>Género: {liga.genero}</Card.Text>
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
