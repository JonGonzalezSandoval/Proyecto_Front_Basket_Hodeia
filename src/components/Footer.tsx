// import React from "react";
import { Row, Col, Container } from "react-bootstrap";


export default function Footer() {
  return (
    //   <Container className="footer-color fixed-bottom">
    
        <Row className="footer-color footer fixed-bottom">
          <Col className="text-end">
            <Container>
            <img
              src="https://i.ibb.co/n3SnzK5/logo-letras-transparent.png"
              alt="footer image"
              height="20"
              className="footer-image"
            />
            </Container>
          </Col>
        </Row>
  );
}
