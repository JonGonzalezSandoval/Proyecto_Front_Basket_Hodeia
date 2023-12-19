import Navbar from "react-bootstrap/Navbar";
import { Container } from "react-bootstrap";
import "../custom-styles.css";
import DropdownOptions from "./DropdownOptions";


export default function Header() {
  return(
  
    <Navbar expand="lg" className="black-color">
    <Container style={{ display: 'flex', justifyContent: 'left', height: '150px' }}>
      <DropdownOptions />
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
