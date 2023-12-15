import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPersonDress,
  faPerson,
  faUserSecret,
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";

interface TReferee {
  usuarioid: string;
  nombre: string;
  apellidos: string;
  email: string;
  genero: string;
  usuarioImg: null | string;
  isActive: boolean;
}

interface TRegisterReferee {
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

export default function RefereeLists() {
  const [Referees, setReferees] = useState<TReferee[] | null>(null);
  const [validEmail, setValidEmail] = useState<Boolean | null>(null);
  const [newReferee, setNewReferee] = useState<TRegisterReferee>({
    nombre: "",
    apellidos: "",
    email: "",
    genero: "",
    password: "Passw0rd!",
    // usuarioImg: string,
    rol: "96a31bcc-ceb7-4fa7-87bd-0138864ac3f3",
    isActive: true
  });

  function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validEmail) {
      console.log("Debes introducir todos los datos válidos");
    } else if (newReferee.nombre === "") {
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    console.log(e.target.name + ": " + e.target.value);

    setNewReferee({
      ...newReferee,
      [e.target.name]: e.target.value,
    });
  }

  function getReferees(): void {
    fetch("http://localhost:3000/users/role/arbitro")
      .then((res) => res.json())
      .then((res) => setReferees(res));
  }

  useEffect(() => {
    getReferees();
  }, []);

  return (
    <div>
      {Referees != null ? (
        <>
          {Referees.map((Referee) => (
            <div key={Referee.usuarioid}>
              <ul>
                <li>Nombre: {Referee.nombre}</li>
                <li>Apellidos:{Referee.apellidos}</li>
                <li>Email: {Referee.email}</li>
                <li>
                  Genero:{" "}
                  {Referee.genero === "M" ? (
                    <FontAwesomeIcon icon={faPerson} />
                  ) : Referee.genero === "F" ? (
                    <FontAwesomeIcon icon={faPersonDress} />
                  ) : (
                    <FontAwesomeIcon icon={faUserSecret} />
                  )}
                </li>
                <li>
                  En activo:{" "}
                  {Referee.isActive ? (
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
                checked={newReferee.genero === "H"}
              />
              <label htmlFor="hombre">Hombre</label>
              <input
                type="radio"
                name="genero"
                value="M"
                onChange={handleChange}
                id="mujer"
                checked={newReferee.genero === "M"}
              />
              <label htmlFor="mujer">Mujer</label>
              <input
                type="radio"
                name="genero"
                value="Otros"
                onChange={handleChange}
                id="otros"
                checked={newReferee.genero === "Otros"}
              />
              <label htmlFor="otros">Other</label>
              <br />
              <input type="submit" value="Registrar Arbitro" />
            </form>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
