import React, { useState } from 'react'
import { Login } from './components/Login'
import { ForgotPassword } from './components/ForgotPassword'
import { OtpVerification } from './components/OtpVerification'

function App() {
  const [view, setView] = useState<'login' | 'forgot_password' | 'otp_verification'>('login')

  const handleLoginSuccess = (emailOrPhone: string) => {
    alert('Đăng nhập thành công với tài khoản: ' + emailOrPhone)
  }

  const handleForgotPasswordSuccess = (emailOrPhone: string) => {
    setView('otp_verification')
  }

  const handleOtpSuccess = () => {
    alert('Xác thực thành công! Hệ thống sẽ chuyển bạn về trang đăng nhập để đặt lại mật khẩu.')
    setView('login')
  }

  return (
    <div className="flex-1 flex flex-col justify-center items-center px-4 py-12 sm:px-6 lg:px-8 bg-[#F7F9FC]">
      {view === 'login' && (
        <Login
          onNavigateToForgotPassword={() => setView('forgot_password')}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      {view === 'forgot_password' && (
        <ForgotPassword
          onNavigateToLogin={() => setView('login')}
          onSuccess={handleForgotPasswordSuccess}
        />
      )}

      {view === 'otp_verification' && (
        <OtpVerification
          onCancel={() => setView('forgot_password')}
          onSuccess={handleOtpSuccess}
        />
      )}
    </div>
  )
}

export default App
