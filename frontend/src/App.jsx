import './App.css'

import { Route, Routes, Navigate } from 'react-router-dom'

import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Home from './pages/Home.jsx'
import Announcement from './pages/Announcement.jsx'
import Supplier from './pages/Supplier.jsx'
import Pengumuman from './pages/Pengumuman.jsx'

import { useAuthContext } from '../src/context/authContext.jsx'
import { Toaster } from 'react-hot-toast'

function App() {
  const { authUser } = useAuthContext()

  return (
    <>
      <Toaster />
      <Routes>
        <Route path='/' element={authUser ? <Home /> : <Navigate to={"/login"} />} />
        <Route path='/login' element={authUser ? <Navigate to='/' /> : <Login />} />
        <Route path='/signup' element={authUser ? <Navigate to='/' /> : <Signup />} />
        <Route path='/announcement' element={<Announcement />} />
        <Route path='/supplier' element={<Supplier />} />
        <Route path='/pengumuman' element={<Pengumuman />} />
      </Routes>
    </>
  )
}

export default App
