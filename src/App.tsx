import { Route, Routes } from 'react-router'
import { useState } from 'react'
import Home from './pages/home'
import About from './pages/about'
import Navbar from './components/navbar'
import Login from './pages/login'
import './App.css'
import Footer from './components/footer'

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

  return (
    <div className="flex flex-col min-w-screen min-h-screen">
      <Navbar isLoggedIn={isLoggedIn}/>
      <div className="flex flex-col items-center flex-grow h-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App
