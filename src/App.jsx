import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Login from './pages/Login'
import CreateQR from './pages/CreateQR'
import QrCode from './pages/QrCode'
import ThanhYou from './components/ThanhYou'
import './App.css'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/createQr"
            element={
              <ProtectedRoute>
                <CreateQR />
              </ProtectedRoute>
            }
          />
          <Route path="/QrCode" element={<QrCode />} />
          <Route path="*" element={<Home />} />
          <Route path="/thanh-you" element={<ThanhYou />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
