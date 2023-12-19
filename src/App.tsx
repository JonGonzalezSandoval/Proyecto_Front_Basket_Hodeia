import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainScreen from "./components/mainScreen/MainScreen";
import IntroScreen from "./components/introScreen/IntroScreen";
import RefereeScreenManagement from "./components/refereeScreenManagement/RefereeScreenManagement";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import CoachLists from "./components/coachList/CoachList";
import RefereeLists from "./components/refereeList/RefereeList";
import UserContext from "./context/UserContext";
import { useState } from "react";

interface Tuser {
  email: string;
  password: string;
}

function App() {
  // const [loginUser, setLoginUser] = useState<Tuser | null>(null)

  return (
    <UserContext.Provider value={{}}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<MainScreen />} />
          <Route path="/introScreen" element={<IntroScreen />} />
          <Route path="/refereeMatch/:matchID" element={<RefereeScreenManagement />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/coach" element={<CoachLists />} />
          <Route path="/referee" element={<RefereeLists />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
