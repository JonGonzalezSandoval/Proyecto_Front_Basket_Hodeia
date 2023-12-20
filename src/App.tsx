import { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainScreen from './components/mainScreen/MainScreen'
import CreateRoomForm from './components/createRoomButton'
import RefereeScreen from './components/refereeScreen'
import GameViewer from './components/userScreen'
import SocketTest from './components/socketTest'
import BasketballMatchChart from './components/Charts/BasketballMatchChart'


function App() {

  useEffect(()=> {
    fetch(`http://localhost:3000/users/all`)
    .then(res=> res.json())
    .then(res => console.log(res))
  },[])

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainScreen/>}/>
        <Route path= '/referee' element={<RefereeScreen/>}/>
        <Route path= '/user' element={<GameViewer/>}/>
        <Route path= '/createRoom' element={<CreateRoomForm/>}/>
        <Route path= '/socketTest' element={<SocketTest/>}/>
        <Route path='/matchChart/:matchID' element={<BasketballMatchChart/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
