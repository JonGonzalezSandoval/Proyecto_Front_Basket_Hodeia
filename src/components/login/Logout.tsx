import { useContext, useEffect } from "react";
import UserContext from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const { setLoginUser } = useContext(UserContext);

  let navigate = useNavigate();

  function handleLogout() {
    setLoginUser(null);
    localStorage.removeItem("SavedToken");
    navigate("/");
  }

  useEffect(() => {
    handleLogout();
  }, [])

  return null;
}
