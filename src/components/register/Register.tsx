import { useState } from "react";

interface TRegisterUser {
  nombre: string;
  apellidos: string;
  email: string;
  genero: string;
  password: string;
  confirmPassword: string;
  // usuarioImg: string;
  rol?: string | null;
}

const PWD_REGEX: RegExp =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{6,20}$/;
const EMAIL_REGEX: RegExp = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;

export default function Register() {
  const [showPassword, setShowPassword] = useState<Boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<Boolean>(false);
  const [validPassword, setValidPassword] = useState<Boolean | null>(null);
  const [validEmail, setValidEmail] = useState<Boolean | null>(null);
  const [equalPass, setEqualPass] = useState<Boolean | null>(null);

  const [newUser, setNewUser] = useState<TRegisterUser>({
    nombre: "",
    apellidos: "",
    email: "",
    genero: "M",
    password: "",
    confirmPassword: "",
    // usuarioImg: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    console.log(e.target.name + ": " + e.target.value);

    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    });
  }

  function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validEmail || !validPassword) {
      console.log("Debes introducir todos los datos válidos");
    } else if (newUser.nombre === "") {
    }
  }

  function checkEqual(e:React.FocusEvent<HTMLInputElement, Element>){
    console.log(e.target.value === newUser.password);
    
    setEqualPass(e.target.value === newUser.password)
  }

  console.log(newUser);
  return (
    <>
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
        {validEmail != null && !validEmail ? (
          <span>Email No Valido</span>
        ) : (
          <span>OK!</span>
        )}
        <br />
        <input
          type="radio"
          name="genero"
          value="H"
          onChange={handleChange}
          id="hombre"
          checked={newUser.genero === "H"}
        />
        <label htmlFor="hombre">Hombre</label>
        <input
          type="radio"
          name="genero"
          value="M"
          onChange={handleChange}
          id="mujer"
          checked={newUser.genero === "M"}
        />
        <label htmlFor="mujer">Mujer</label>
        <input
          type="radio"
          name="genero"
          value="Otros"
          onChange={handleChange}
          id="otros"
          checked={newUser.genero === "Otros"}
        />
        <label htmlFor="otros">Other</label>
        <br />
        <label htmlFor="password">Contraseña: </label>
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Contraseña"
          id="password"
          onChange={handleChange}
          onBlur={(e) => setValidPassword(PWD_REGEX.test(e.target.value))}
          required
        />
        <span onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? "hide" : "show"}
        </span>
        <br />
        {validPassword != null && !validPassword ? (
          <span>Contraseña No Valida</span>
        ) : (
          <span>OK!</span>
        )}
        <br />
        <label htmlFor="confirmPassword">ConfirmarContraseña:</label>
        <input
          type={showConfirmPassword ? "text" : "password"}
          name="confirmPassword"
          placeholder="Repite Contraseña"
          id="confirmPassword"
          onChange={handleChange}
          onBlur={checkEqual}
        />
        <span onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
          {showConfirmPassword ? "hide" : "show"}
        </span>
        <br />
        {equalPass != null && !equalPass ? (
          <span>Las Contraseñas no Coinciden</span>
        ) : (
          <span>OK!</span>
        )}
        <br />
        <input type="submit" value="Registrarme" />
      </form>
    </>
  );
}
