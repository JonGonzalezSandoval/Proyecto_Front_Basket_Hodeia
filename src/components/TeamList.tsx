import { Button, Card, Col, Form, InputGroup, Row } from "react-bootstrap";

export default function TeamList() {
  // function findTeams(){

  // }

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

      <Card>
        <Row className="no-gutters">
        <Col xs={12} md={2} className="mt-3 mb-3 ms-md-5 d-flex justify-content-center">
            <Card.Img
              style={{
                height: "100%",
                width: "150px", 
                borderRadius: "50%",
              }}
              src="https://i.ibb.co/1n8mvmT/Bearded-Princesses.png"
              alt="team-logo"
            />
          </Col>
          <Col xs={12} md={8}>
            <Card.Body>
            <Row>
                <Col xs={12} className="ms-3 text-xs-center">
                  <Card.Title>Bearded Princesses</Card.Title>
                </Col>
              </Row>
              <Row>
                <Col className="ms-3">
                  <Card.Text>Género: Masculino</Card.Text>
                </Col>
              </Row>
              <Row>
                <Col className="ms-3">
                  <Card.Text>Liga: Los Patos Amarillos</Card.Text>
                </Col>
              </Row>
              <Row>
                <Col className="ms-3">
                  <Card.Text>Lugar: Ámsterdam</Card.Text>
                </Col>
              </Row>
              <Row>
                <Col className="ms-3">
                  <Card.Text>Entrenador: Matías Gómez</Card.Text>
                </Col>
              </Row>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </>
  );
}
