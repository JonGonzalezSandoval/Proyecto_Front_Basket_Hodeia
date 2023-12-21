import { Col, Container, Row } from "react-bootstrap";
import CoachLists from "./CoachLists";
import RefereeLists from "./RefereeLists";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function CoachReferee() {

  const [ user, setUser ] = useState<any | null>(null);

    const navigate = useNavigate();

  useEffect(()=> {
    if (localStorage.getItem("SavedToken") !== null) {
      fetch("http://localhost:3000/auth/profile", {
        headers: { Authorization: localStorage.getItem("SavedToken") || ""},
      })
        .then((res) => {
          if (res.status >= 400) {
            setUser(null);
            navigate("/login");
            return;
          }
          return res.json();
        })
        .then((res) => {
          setUser(res);
          if(res.rol !== "bb907068-b7cc-4b9c-be47-f3b6c668d5c4"){
            navigate("/home")
          }
        });
    } else {
      navigate("/login");
    }
  },[])
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
