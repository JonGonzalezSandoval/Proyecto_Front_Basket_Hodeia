import { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";

export function useUser(){

    const [ user, setUser ] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
      if (localStorage.getItem("SavedToken") !== null) {
        fetch("http://localhost:3000/auth/profile", {
          headers: { Authorization: localStorage.getItem("SavedToken") || ""},
        })
          .then((res) => {
            if (res.status >= 400) {
              setUser(null);
              navigate("/login");
              console.log(res.statusText)
              return;
            }
            return res.json();
          })
          .then((res) => {
            setUser(res);
          });
      } else {
        navigate("/login");
      }
    },[])


    return user;
}