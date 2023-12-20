import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import {Link} from 'react-router-dom'
import '../custom-styles.css'


function ButtonCustomExample() {
  
  return (
    <>
      <Dropdown as={ButtonGroup}>
        <Dropdown.Toggle id="dropdown-custom-1" className="custom-dropdown-toggle">
        <FontAwesomeIcon 
          icon={faList} 
          style={{ color: 'black', width: '20px', height: '20px' }} 
        />
        </Dropdown.Toggle>
        <Dropdown.Menu className="tertiary-color">
          
          {/* <Dropdown.Item eventKey="1" className="white-nav-link">Partidos pendientes</Dropdown.Item> */}

          <Dropdown.Item eventKey="2" className="white-nav-link"><Link to={"/admin-team"} style={{ textDecoration: 'none', color: 'inherit' }}>Crear nuevo equipo</Link></Dropdown.Item>
          
          <Dropdown.Item eventKey="3" className="white-nav-link"><Link to={"/admin-league"} style={{ textDecoration: 'none', color: 'inherit' }}>Crear nueva liga</Link></Dropdown.Item>
         
          <Dropdown.Item eventKey="4" className="white-nav-link"><Link to={"/admin-coach-referee"} style={{ textDecoration: 'none', color: 'inherit' }}>Crear nuevo/a entrenador/a</Link></Dropdown.Item>

          <Dropdown.Item eventKey="5" className="white-nav-link"><Link to={"/admin-coach-referee"} style={{ textDecoration: 'none', color: 'inherit' }}>Crear nuevo/a árbitro/a</Link></Dropdown.Item>
    
          <Dropdown.Item eventKey="6" className="white-nav-link"><Link to={"/coach-player"} style={{ textDecoration: 'none', color: 'inherit' }}>Gestionar equipo</Link></Dropdown.Item>
          <Dropdown.Divider />

          <Dropdown.Item eventKey="7" className="white-nav-link"><Link to={"/logout"} style={{ textDecoration: 'none', color: 'inherit' }}>Cerrar sesión</Link></Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}

export default ButtonCustomExample;