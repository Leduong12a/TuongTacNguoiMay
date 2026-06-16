import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { Login } from './components/login/Login'
import { ForgotPassword } from './components/login/ForgotPassword'
import { OtpVerification } from './components/login/OtpVerification'
import { ResetPassword } from './components/login/ResetPassword'
import { Register } from './components/login/Register'
import { Dashboard } from './components/Dashboard'

function AppContent() {
  const navigate = useNavigate()
  const location = useLocation()

  const handleLoginSuccess = (_emailOrPhone: string) => {
    navigate('/chat')
  }

  const handleForgotPasswordSuccess = (_emailOrPhone: string) => {
    navigate('/verify-otp')
  }

  const handleOtpSuccess = () => {
    navigate('/reset-password')
  }

  const handleResetPasswordSuccess = () => {
    alert('Mật khẩu mới đã được cập nhật thành công!')
    navigate('/')
  }

  const handleRegisterSuccess = () => {
    alert('Đăng ký tài khoản thành công!')
    navigate('/')
  }

  const isDashboard = ['/chat', '/contacts', '/profile', '/calls', '/search', '/settings'].includes(location.pathname)

  return (
    <div className={isDashboard ? "w-full h-screen bg-white" : "flex-1 flex flex-col justify-center items-center px-4 py-12 sm:px-6 lg:px-8 bg-[#F7F9FC]"}>
      <Routes>
        <Route
          path="/"
          element={
            <Login
              onNavigateToForgotPassword={() => navigate('/forgot-password')}
              onLoginSuccess={handleLoginSuccess}
              onNavigateToRegister={() => navigate('/register')}
            />
          }
        />
        <Route
          path="/login"
          element={
            <Login
              onNavigateToForgotPassword={() => navigate('/forgot-password')}
              onLoginSuccess={handleLoginSuccess}
              onNavigateToRegister={() => navigate('/register')}
            />
          }
        />
        <Route
          path="/forgot-password"
          element={
            <ForgotPassword
              onNavigateToLogin={() => navigate('/')}
              onSuccess={handleForgotPasswordSuccess}
            />
          }
        />
        <Route
          path="/verify-otp"
          element={
            <OtpVerification
              onCancel={() => navigate('/forgot-password')}
              onSuccess={handleOtpSuccess}
            />
          }
        />
        <Route
          path="/reset-password"
          element={
            <ResetPassword
              onNavigateToLogin={() => navigate('/')}
              onSuccess={handleResetPasswordSuccess}
            />
          }
        />
        <Route
          path="/register"
          element={
            <Register
              onNavigateToLogin={() => navigate('/')}
              onRegisterSuccess={handleRegisterSuccess}
            />
          }
        />
        <Route
          path="/chat"
          element={
            <Dashboard
              initialTab="chat"
              onLogout={() => navigate('/')}
            />
          }
        />
        <Route
          path="/contacts"
          element={
            <Dashboard
              initialTab="contacts"
              onLogout={() => navigate('/')}
            />
          }
        />
        <Route
          path="/profile"
          element={
            <Dashboard
              initialTab="profile"
              onLogout={() => navigate('/')}
            />
          }
        />
        <Route
          path="/calls"
          element={
            <Dashboard
              initialTab="calls"
              onLogout={() => navigate('/')}
            />
          }
        />
        <Route
          path="/search"
          element={
            <Dashboard
              initialTab="search"
              onLogout={() => navigate('/')}
            />
          }
        />
        <Route
          path="/settings"
          element={
            <Dashboard
              initialTab="settings"
              onLogout={() => navigate('/')}
            />
          }
        />
      </Routes>
    </div>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
