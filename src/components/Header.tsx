import Navbar from "react-bootstrap/Navbar";
import { Container } from "react-bootstrap";
import "../custom-styles.css";
import DropdownOptions from "./DropdownOptions";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";


export default function Header() {
  const location = useLocation();


  return(
  
    <Navbar expand="lg" className="black-color">
    <Container style={{ display: 'flex', justifyContent: 'left', height: '150px' }}>
      {location.pathname === "/" || location.pathname === "/login" || location.pathname === "/register"?<></>:<DropdownOptions />}
      <Navbar.Brand href="#home" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
        <img
          src="https://i.ibb.co/fSdYX6k/logo-negro.png"
          height="130"
          className="d-inline-block align-top"
          alt="Hoopdeia logo"
        />
      </Navbar.Brand>
    </Container>
  </Navbar>
    
  )
  
}
