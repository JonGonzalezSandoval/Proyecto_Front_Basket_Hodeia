import {
  Card,
  Button,
  Row,
  Col,
  Image,
} from "react-bootstrap";
<link
  href="https://fonts.googleapis.com/css2?family=Graduate&display=swap"
  rel="stylesheet"
></link>;
import { Link } from "react-router-dom";

export default function PreLogin() {
  return (
    <>
      <Row className="row-styles d-none d-xl-flex align-items-stretch">
        <Col style={{ width: "640px", flex: "0 0 auto" }}>
          <Image
            src="https://i.ibb.co/KD8CGKq/august-phlieger-CREqtqg-BFc-U-unsplash.png"
            alt="jugador de baloncesto"
            className="image-desktop"
            fluid
          />
        </Col>

        <Col
          className="d-none d-xl-flex flex-column align-items-center justify-content-center"
          style={{ minHeight: "90vh" }}
        >
          <Image
            src="https://i.ibb.co/3f4zp8X/hoopdeia1.png"
            alt="jugador de baloncesto"
            className="my-2"
            fluid
          />

          <Image
            src="https://i.ibb.co/zVm2cpQ/hoopdeia-word.png"
            alt="jugador de baloncesto"
            className="my-2"
            fluid
          />

          <Button
            className="primary-color-faded mb-3 button-bold my-2 text-center"
            style={{ width: "350px", fontSize: "1rem" }}
            type="submit"
          >
            Iniciar sesión
          </Button>

          <Button
            className="secondary-color mb-3 button-bold-smaller my-2 text-center"
            style={{ width: "350px", fontSize: "1rem" }}
          >
            Regístrate aquí
          </Button>
        </Col>
      </Row>

      <Row
        className="row-styles-light d-lg-block d-xl-none"
        style={{ position: "relative" }}
      >
        <Col>
          <Image
            src="https://i.ibb.co/vz9XkHs/anastasiia-rozumna-y-BYt07-Md-Ni8-unsplash.jpg"
            alt="Imagen descriptiva"
            className="full-height-image-tablet"
            fluid
          />
        </Col>

        <Card
          className="my-2"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "60%", // Aumentado del 50% al 60%
            backgroundColor: "#171515",
            borderRadius: "15px", // Bordes redondeados
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)", // Sombreado
          }}
        >
          <Card.Body
            className="d-flex flex-column align-items-center justify-content-center"
            style={{ height: "55vh" }}
          >
            <Image
              src="https://i.ibb.co/3f4zp8X/hoopdeia1.png"
              alt="jugador de baloncesto"
              className="my-2"
              fluid
            />

            <Image
              src="https://i.ibb.co/zVm2cpQ/hoopdeia-word.png"
              alt="jugador de baloncesto"
              className="my-2"
              fluid
            />

            {/* Botones para dispositivos móviles */}
            <Button
              className="primary-color-faded mb-3 button-bold my-2 text-center d-block d-md-none"
              style={{ fontSize: "1rem" }}
              type="submit"
            >
              <Link to="/login">Iniciar sesión</Link>
            </Button>

            <Button
              className="secondary-color mb-3 button-bold-smaller my-2 text-center d-block d-md-none"
              style={{ fontSize: "1rem" }}
            >
              Regístrate aquí
            </Button>

            {/* Botones para dispositivos tablet */}
            <Button
              className="primary-color-faded mb-3 button-bold my-2 text-center d-none d-lg-block d-xl-none"
              style={{ fontSize: "2rem", width: "300px" }}
              type="submit"
            >
              Iniciar sesión
            </Button>

            <Button
              className="secondary-color mb-3 button-bold-smaller my-2 text-center d-none d-lg-block d-xl-none"
              style={{ fontSize: "2rem", width: "300px" }}
            >
              <Link to="/register">Regístrate aquí</Link>
            </Button>
          </Card.Body>
        </Card>
      </Row>
    </>
  );
}
