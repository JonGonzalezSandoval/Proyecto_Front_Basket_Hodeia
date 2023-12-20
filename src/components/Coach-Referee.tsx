import { Col, Container, Row } from "react-bootstrap";
import CoachLists from "./CoachLists";
import RefereeLists from "./RefereeLists";

export default function CoachReferee() {
  
  return (
    <>
      <Container>
        <Row>
          <Col className="mt-4">
            <CoachLists></CoachLists>
          </Col>
          <Col className="mt-4">
            <RefereeLists></RefereeLists>
          </Col>
        </Row>
      </Container>
    </>
  );
}
