import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {

  let navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("SavedToken");
    localStorage.removeItem("Rol");
    console.log(localStorage.getItem("SavedToken"))
    
    navigate("/");
  }

  useEffect(() => {
    handleLogout();
  }, [])

  return null;
}
