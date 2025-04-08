import { Route, Routes } from 'react-router'
import Home from './pages/home'
import About from './pages/about'
import Navbar from './components/navbar'
import './App.css'

function App() {
  return (
    <div className="flex flex-col w-full h-full">
      <Navbar />
      <div className="flex flex-col items-center w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
