import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";

interface Tuser {
  email: string;
  password: string;
}

export default function Login() {
  const [user, setUser] = useState({ email: "", password: "" });

  const { setLoginUser } = useContext(UserContext);

  const navigate = useNavigate();

  function handleClick(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();

    let email = user.email;
    let password = user.password;

    let data = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    };

    fetch("http://localhost:3000/auth/login", data)
      .then((res) => {
        if (res.status == 202) {
          return res.text();
        }
        if (res.status == 401) throw new Error("Unauthorized");
      })
      .then((res) => {
        localStorage.removeItem("SavedToken");
        localStorage.setItem("SavedToken", "Bearer " + res);
        fetch("http://localhost:3000/auth/profile", {
            // NO SE CÓMO TIPAR EL HEADER PARA QUE NO DE PROBLEMAS
        //   headers: { Authorization: localStorage.getItem("SavedToken") }, 
        })
          .then((res) => res.json())
          .then((res) => {
            console.log(res);
            setLoginUser(res);
            navigate("/");
          });
      })
      .catch((error) => {
        if (error.message === "Unauthorized") {
          console.log("Unauthorized");
        } else {
          console.log("Other error handling: " + error);
          // Handle other errors here
        }
      });
  }

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    let userTemp = { ...user };
    //MIRAR MAÑANA EN CLASE, NO SE CÓMO TIPAR ESTO
    // userTemp[e.target.name] = e.target.value;
    setUser(userTemp);
  }
  return (
    <main className="main-manage">
      <form>
        <label htmlFor="">
          Username: 
          <input
            onChange={handleInput}
            type="text"
            name="email"
            placeholder="Email"
          />
        </label>
        <label htmlFor="">
          Password: 
          <input
            onChange={handleInput}
            type="password"
            name="password"
            placeholder="Password"
          />
        </label>
        <button onClick={(handleClick)}>Login</button>
      </form>
      <div className="enlaceRegistro">
        <Link to="/register">Don't have an account yet?</Link>
      </div>
    </main>
  );
}
