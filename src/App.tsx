import { Route, Routes } from 'react-router'
import Home from './pages/home'
import About from './pages/about'
import Navbar from './components/navbar'
import Login from './pages/login'
import './App.css'
import Footer from './components/footer'
import Register from './pages/register'
import { AuthProvider } from './context/authContext'
import ProtectedRoute from './components/authRoutes/protectedroute'
import Profile from './pages/profile'
import AuthRoute from './components/authRoutes/authroute'
import Import from './pages/import'
import MultipleChart from './pages/multiplechart'
import Admin from './pages/admin'
import AdminRoute from './components/authRoutes/adminroute'

function App() {

  return (
    <AuthProvider>
      <div className="flex flex-col min-w-screen min-h-screen">
        <Navbar />
        <div className="flex flex-col items-center flex-grow h-full">
          <Routes>
            <Route path="/" element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } />
            <Route path="/about" element={
              <About />
            } />
            <Route path="/login" element={
              <AuthRoute>
                <Login />
              </AuthRoute>
            } />
            <Route path='/register' element={
              <AuthRoute>
                <Register />
              </AuthRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/import" element={
              <Import />
            } />
            <Route path="/multiple" element={
              <MultipleChart />
            } />
            <Route path="/admin" element={
              <AdminRoute>
                <Admin />
              </AdminRoute>
            } />
          </Routes>
        </div>
        <Footer />
      </div>
    </AuthProvider>
  )
}

export default App
