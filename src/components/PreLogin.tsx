import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function PreLogin() {
  return (
    <div className="login-container">
      <Card
        className="mb-3 ms-3 me-3 custom-background responsive-card"
    style={{ minWidth: "90%", width: "90%", minHeight: "90%", height: "90%"}}
      >
        <div className="center-text mt-auto">
        <Link to="/login">
          <Button
            className="primary-color-faded mb-3 button-bold"
            type="submit"
          >
            Iniciar sesión
          </Button>
          </Link>
        </div>

        <div className="center-text mb-auto">
        <Link to="/register">
          <Button className="secondary-color mb-3 button-bold-smaller">
            Regístrate aquí
          </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
