import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "react-calendar/dist/Calendar.css";
import MainScreen from "./components/MainScreen";
import RefereeScreenManagement from "./components/RefereeScreenManagement";
import Login from "./components/Login";
import Register from "./components/Register";
import Header from "./components/Header";
import UserContext from "./context/UserContext";
import { useState } from "react";
import { Container } from "react-bootstrap";
import PreLogin from "./components/PreLogin";
import CoachReferee from "./components/Coach-Referee";
import LeagueList from "./components/LeagueList";
import TeamList from "./components/TeamList";
import PlayersList from "./components/PlayersList";
import Scoreboard from "./components/Scoreboard";
import Test from "./components/Test";
import Logout from "./components/Logout";
import Test1 from "./components/Test1";
import Footer from "./components/Footer";
import CreateRoomForm from "./components/createRoomButton";
import SocketTest from "./components/socketTest";
import BasketballMatchChart from "./components/Charts/BasketballMatchChart";
import RefereeScreen from "./components/refereeScreen";
import GameViewer from "./components/userScreen";

interface Tuser {
  email: string;
  password: string;
}

function App() {

  return (
    <UserContext.Provider value={{}}>
      <BrowserRouter>
        <Header></Header>
        <div className="main-container">
          <Container fluid>
            <Routes>
              <Route path="/" element={<PreLogin></PreLogin>} />
              <Route
                path="/admin-coach-referee"
                element={<CoachReferee></CoachReferee>}
              />
              <Route path="/login" element={<Login></Login>}></Route>
              <Route path="/logout" element={<Logout></Logout>}></Route>
              <Route path="/register" element={<Register></Register>} />
              <Route path="/home" element={<MainScreen></MainScreen>} />
              <Route path="/admin-league" element={<LeagueList></LeagueList>} />
              <Route path="/admin-team" element={<TeamList></TeamList>} />
              <Route
                path="/coach-player"
                element={<PlayersList></PlayersList>}
              />
              <Route
                path="/manager/:matchID"
                element={<RefereeScreenManagement></RefereeScreenManagement>}
              />
              <Route path="/scoreboard/:matchID" element={<Scoreboard></Scoreboard>} />
              <Route path="/test" element={<Test></Test>} />
              <Route path="/test1" element={<Test1></Test1>} />
              <Route path= '/createRoom' element={<CreateRoomForm/>}/>
              <Route path= '/referee' element={<RefereeScreen/>}/>
        <Route path= '/user' element={<GameViewer/>}/>
        <Route path= '/socketTest' element={<SocketTest/>}/>
        <Route path='/matchChart/:matchID' element={<BasketballMatchChart/>}/>

            </Routes>
          </Container>
          <Footer></Footer>
        </div>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
