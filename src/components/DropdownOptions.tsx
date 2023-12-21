import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom";
import "../custom-styles.css";
import { useContext } from "react";
import UserContext from "../context/UserContext";

function ButtonCustomExample() {
  const { loginUser } = useContext(UserContext);

  return (
    <>
      <Dropdown as={ButtonGroup}>
        <Dropdown.Toggle
          id="dropdown-custom-1"
          className="custom-dropdown-toggle colorinchis"
        >
          <FontAwesomeIcon
            icon={faList}
            style={{ color: "black", width: "20px", height: "20px" }}
          />
        </Dropdown.Toggle>
        <Dropdown.Menu className="tertiary-color">
          {/* <Dropdown.Item eventKey="1" className="white-nav-link">Partidos pendientes</Dropdown.Item> */}
          {loginUser !== null &&
          loginUser.rol === "bb907068-b7cc-4b9c-be47-f3b6c668d5c4" ? (
            <>
              <Dropdown.Item eventKey="2" className="white-nav-link">
                <Link
                  to={"/admin-team"}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Crear nuevo equipo
                </Link>
              </Dropdown.Item>

              <Dropdown.Item eventKey="3" className="white-nav-link">
                <Link
                  to={"/admin-league"}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Crear nueva liga
                </Link>
              </Dropdown.Item>

              <Dropdown.Item eventKey="4" className="white-nav-link">
                <Link
                  to={"/admin-coach-referee"}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Crear nuevo/a entrenador/a
                </Link>
              </Dropdown.Item>

              <Dropdown.Item eventKey="5" className="white-nav-link">
                <Link
                  to={"/admin-coach-referee"}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Crear nuevo/a árbitro/a
                </Link>
              </Dropdown.Item>
            </>
          ) : (
            <></>
          )}
          {loginUser !== null &&
          loginUser.rol === "d8d4b514-800a-4827-a92b-e4f3770ef76b" ? (
            <Dropdown.Item eventKey="6" className="white-nav-link">
              <Link
                to={"/coach-player"}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Gestionar equipo
              </Link>
            </Dropdown.Item>
          ) : (
            <></>
          )}

        {loginUser !== null &&
          (loginUser.rol === "d8d4b514-800a-4827-a92b-e4f3770ef76b"  || loginUser.rol === "bb907068-b7cc-4b9c-be47-f3b6c668d5c4")? (
          <Dropdown.Divider />
          ):(<></>)}

          <Dropdown.Item eventKey="7" className="white-nav-link">
            <Link
              to={"/logout"}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Cerrar sesión
            </Link>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}

export default ButtonCustomExample;
