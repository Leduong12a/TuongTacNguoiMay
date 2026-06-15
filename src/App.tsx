import React from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import { Login } from './components/login/Login'
import { ForgotPassword } from './components/login/ForgotPassword'
import { OtpVerification } from './components/login/OtpVerification'
import { ResetPassword } from './components/login/ResetPassword'
import { Register } from './components/login/Register'

function AppContent() {
  const navigate = useNavigate()

  const handleLoginSuccess = (emailOrPhone: string) => {
    alert('Đăng nhập thành công với tài khoản: ' + emailOrPhone)
  }

  const handleForgotPasswordSuccess = (emailOrPhone: string) => {
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

  return (
    <div className="flex-1 flex flex-col justify-center items-center px-4 py-12 sm:px-6 lg:px-8 bg-[#F7F9FC]">
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
