import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {

  let navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("SavedToken");
    localStorage.removeItem("Rol");
    navigate("/");
  }

  useEffect(() => {
    handleLogout();
  }, [])

  return null;
}
