import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPersonDress,
  faPerson,
  faUserSecret,
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";

interface TCoach {
  usuarioid: string;
  nombre: string;
  apellidos: string;
  email: string;
  genero: string;
  usuarioImg: null | string;
  isActive: boolean;
}

interface TRegisterCoach {
  nombre: string;
  apellidos: string;
  email: string;
  genero: string;
  password: string;
  // usuarioImg: string;
  rol: string;
  isActive: boolean;
}
const EMAIL_REGEX: RegExp = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;

export default function CoachLists() {
  const [coaches, setCoaches] = useState<TCoach[] | null>(null);
  const [validEmail, setValidEmail] = useState<Boolean | null>(null);
  const [newCoach, setNewCoach] = useState<TRegisterCoach>({
    nombre: "",
    apellidos: "",
    email: "",
    genero: "",
    password: "Passw0rd!",
    // usuarioImg: string,
    rol: "d8d4b514-800a-4827-a92b-e4f3770ef76b",
    isActive: false
  });

  function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validEmail) {
      console.log("Debes introducir todos los datos válidos");
    } else if (newCoach.nombre === "") {
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    console.log(e.target.name + ": " + e.target.value);

    setNewCoach({
      ...newCoach,
      [e.target.name]: e.target.value,
    });
  }

  function getCoaches(): void {
    fetch("http://localhost:3000/users/role/entrenador")
      .then((res) => res.json())
      .then((res) => setCoaches(res));
  }

  useEffect(() => {
    getCoaches();
  }, []);

  return (
    <div>
      {coaches != null ? (
        <>
          {coaches.map((coach) => (
            <div key={coach.usuarioid}>
              <ul>
                <li>Nombre: {coach.nombre}</li>
                <li>Apellidos:{coach.apellidos}</li>
                <li>Email: {coach.email}</li>
                <li>
                  Genero:{" "}
                  {coach.genero === "M" ? (
                    <FontAwesomeIcon icon={faPerson} />
                  ) : coach.genero === "F" ? (
                    <FontAwesomeIcon icon={faPersonDress} />
                  ) : (
                    <FontAwesomeIcon icon={faUserSecret} />
                  )}
                </li>
                <li>
                  En activo:{" "}
                  {coach.isActive ? (
                    <FontAwesomeIcon icon={faCircleCheck} />
                  ) : (
                    <FontAwesomeIcon icon={faCircleXmark} />
                  )}
                </li>
              </ul>
            </div>
          ))}
          <div>
            <form onSubmit={(e) => handleRegister(e)}>
              <label htmlFor="nombre">Nombre:</label>
              <input
                type="text"
                name="nombre"
                placeholder="Nombre"
                id="nombre"
                onChange={handleChange}
                required
              />
              <br />
              <label htmlFor="apellidos">Apellidos:</label>
              <input
                type="text"
                name="apellidos"
                placeholder="Apellidos"
                id="apellidos"
                onChange={handleChange}
                required
              />
              <br />
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                name="email"
                placeholder="Email"
                id="email"
                onChange={handleChange}
                onBlur={(e) => setValidEmail(EMAIL_REGEX.test(e.target.value))}
                required
              />
              <br />
              <input
                type="radio"
                name="genero"
                value="H"
                onChange={handleChange}
                id="hombre"
                checked={newCoach.genero === "H"}
              />
              <label htmlFor="hombre">Hombre</label>
              <input
                type="radio"
                name="genero"
                value="M"
                onChange={handleChange}
                id="mujer"
                checked={newCoach.genero === "M"}
              />
              <label htmlFor="mujer">Mujer</label>
              <input
                type="radio"
                name="genero"
                value="Otros"
                onChange={handleChange}
                id="otros"
                checked={newCoach.genero === "Otros"}
              />
              <label htmlFor="otros">Other</label>
              <br />
              <input type="submit" value="Registrar Entrenador" />
            </form>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
