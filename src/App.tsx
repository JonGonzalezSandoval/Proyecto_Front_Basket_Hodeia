import { useEffect, useState } from "react";
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

function App() {
  // useEffect(() => {
  //   fetch(`http://localhost:3000/users/all`)
  //     .then((res) => res.json())
  //     .then((res) => console.log(res));
  // }, []);

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<MainScreen />} />
          <Route path="/introScreen" element={<IntroScreen />} />
          <Route path="/refereeMatch" element={<RefereeScreenManagement />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/coach" element={<CoachLists />} />
          <Route path="/referee" element={<RefereeLists />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
