import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainScreen from './components/mainScreen/MainScreen'

function App() {
  const [count, setCount] = useState(0)

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
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
