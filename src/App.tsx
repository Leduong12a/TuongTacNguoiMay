import React, { useState } from 'react'
import { Eye, EyeOff, Mail } from 'lucide-react'

// Custom Chat Bubble Icon matching the reference image
const ChatIcon = () => (
  <div className="w-14 h-14 bg-[#2B78E4] rounded-full flex items-center justify-center mb-6 shadow-sm transform transition-transform hover:scale-105 duration-200">
    <svg
      className="w-7 h-7 text-white"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z"
        fill="currentColor"
      />
      <rect x="6" y="7" width="12" height="2" rx="1" fill="#2B78E4" />
      <rect x="6" y="11" width="12" height="2" rx="1" fill="#2B78E4" />
    </svg>
  </div>
)

// Custom Red Exclamation Warning Icon matching the reference image
const ErrorIcon = () => (
  <svg
    className="w-6 h-6 text-[#D32F2F]"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="10" />
    <path
      d="M12 7V13"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <circle cx="12" cy="16.5" r="1" fill="white" />
  </svg>
)

function App() {
  const [view, setView] = useState<'login' | 'forgot_password'>('login')
  
  // Login Form States
  const [emailOrPhone, setEmailOrPhone] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Forgot Password Form States
  const [forgotEmailOrPhone, setForgotEmailOrPhone] = useState('')
  const [forgotError, setForgotError] = useState('')
  const [forgotSubmitted, setForgotSubmitted] = useState(false)

  // Simple Email & Phone validation logic
  const validate = (value: string) => {
    if (!value.trim()) {
      return 'Vui lòng nhập Email hoặc Số điện thoại.'
    }
    
    // Check if it's an email
    if (value.includes('@')) {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      if (!emailRegex.test(value)) {
        return 'Thông tin không hợp lệ, vui lòng kiểm tra lại'
      }
    } else {
      // Check if it's a phone number (numeric, 9 to 11 digits)
      const phoneRegex = /^[0-9]{9,11}$/
      if (!phoneRegex.test(value)) {
        return 'Thông tin không hợp lệ, vui lòng kiểm tra lại'
      }
    }
    return ''
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)

    const formatError = validate(emailOrPhone)
    
    if (formatError) {
      setError(formatError)
    } else if (emailOrPhone !== 'admin@gmail.com' || password !== 'Password123') {
      setError('Thông tin không hợp lệ, vui lòng kiểm tra lại')
    } else {
      setError('')
      alert('Đăng nhập thành công với tài khoản: ' + emailOrPhone)
      // Reset form on successful login
      setEmailOrPhone('')
      setPassword('')
      setIsSubmitted(false)
    }
  }

  const handleEmailOrPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setEmailOrPhone(val)
    if (isSubmitted) {
      setError(validate(val))
    }
  }

  // Forgot Password validation & submit logic
  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setForgotSubmitted(true)

    const formatError = validate(forgotEmailOrPhone)
    
    if (formatError) {
      setForgotError(formatError)
    } else {
      setForgotError('')
      alert('Yêu cầu khôi phục mật khẩu đã được gửi đến: ' + forgotEmailOrPhone)
      // Reset forgot password states and return to login
      setForgotEmailOrPhone('')
      setForgotSubmitted(false)
      setView('login')
    }
  }

  const handleForgotEmailOrPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setForgotEmailOrPhone(val)
    if (forgotSubmitted) {
      setForgotError(validate(val))
    }
  }

  return (
    <div className="flex-1 flex flex-col justify-center items-center px-4 py-12 sm:px-6 lg:px-8 bg-[#F7F9FC]">
      
      {view === 'login' ? (
        /* Login Card View */
        <div className="w-full max-w-[450px] bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-slate-100 p-8 sm:p-10 flex flex-col items-center transition-all duration-300">
          
          {/* Header Icon */}
          <ChatIcon />

          {/* Header Titles */}
          <h1 className="text-[26px] font-bold text-[#1A1A1A] text-center leading-tight tracking-tight mb-2">
            Chào mừng bạn trở lại
          </h1>
          <p className="text-[15px] text-[#707070] text-center mb-8">
            Đăng nhập để tiếp tục
          </p>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
            
            {/* Email or Phone field */}
            <div className="flex flex-col gap-1.5 w-full">
              <label 
                htmlFor="emailOrPhone" 
                className="text-[13px] font-bold text-[#2A2A2A]"
              >
                Email hoặc Số điện thoại
              </label>
              <div className="relative w-full">
                <input
                  id="emailOrPhone"
                  type="text"
                  value={emailOrPhone}
                  onChange={handleEmailOrPhoneChange}
                  placeholder="user@example.com"
                  className={`w-full h-12 px-4 pr-12 rounded-lg text-base text-[#1A1A1A] border transition-all duration-200 focus:outline-none ${
                    error
                      ? 'border-[#D32F2F] focus:border-[#D32F2F] focus:ring-1 focus:ring-[#D32F2F] bg-red-50/10'
                      : 'border-slate-300 focus:border-[#2B78E4] focus:ring-1 focus:ring-[#2B78E4]'
                  }`}
                />
                {error && (
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
                    <ErrorIcon />
                  </div>
                )}
              </div>
              {error && (
                <span className="text-[13px] font-bold text-[#D32F2F] mt-0.5 animate-fadeIn">
                  {error}
                </span>
              )}
            </div>

            {/* Password field */}
            <div className="flex flex-col gap-1.5 w-full">
              <label 
                htmlFor="password" 
                className="text-[13px] font-bold text-[#2A2A2A]"
              >
                Mật khẩu
              </label>
              <div className="relative w-full">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-12 px-4 pr-12 rounded-lg text-base text-[#1A1A1A] border border-slate-300 focus:border-[#2B78E4] focus:ring-1 focus:ring-[#2B78E4] transition-all duration-200 focus:outline-none"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 focus:outline-none transition-colors duration-150 cursor-pointer"
                  aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiển thị mật khẩu'}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="flex justify-end mt-1">
              <button
                type="button"
                onClick={() => {
                  setView('forgot_password')
                  setForgotEmailOrPhone('')
                  setForgotError('')
                  setForgotSubmitted(false)
                }}
                className="text-[14px] font-semibold text-[#0056C6] hover:underline transition-all duration-150 cursor-pointer"
              >
                Quên mật khẩu?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full h-12 bg-[#0056C6] hover:bg-[#0047A5] active:bg-[#003882] text-white font-bold tracking-wide rounded-lg shadow-sm hover:shadow transition-all duration-200 mt-4 cursor-pointer flex items-center justify-center text-[15px]"
            >
              TIẾP TỤC
            </button>

          </form>

          {/* Footer Register Link */}
          <div className="mt-8 text-[14px] text-[#4A4A4A] text-center font-medium">
            Chưa có tài khoản?{' '}
            <a
              href="#register"
              className="font-bold text-[#0056C6] hover:underline transition-all duration-150 ml-1"
            >
              Đăng ký ngay
            </a>
          </div>

        </div>
      ) : (
        /* Forgot Password Card View */
        <div className="w-full max-w-[450px] bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-slate-100 p-8 sm:p-10 flex flex-col items-center transition-all duration-300">
          
          {/* Header Titles */}
          <h1 className="text-[26px] font-bold text-[#1A1A1A] text-center leading-tight tracking-tight mb-2 mt-4">
            Quên mật khẩu?
          </h1>
          <p className="text-[15px] text-[#707070] text-center mb-8 max-w-[320px] leading-relaxed">
            Nhập email hoặc số điện thoại của bạn để nhận hướng dẫn khôi phục mật khẩu.
          </p>

          {/* Forgot Password Form */}
          <form onSubmit={handleForgotSubmit} className="w-full flex flex-col gap-5">
            
            {/* Email or Phone field with mail icon */}
            <div className="flex flex-col gap-1.5 w-full">
              <div className="relative w-full">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8C8C8C] pointer-events-none">
                  <Mail className="w-5 h-5" />
                </span>
                <input
                  id="forgotEmailOrPhone"
                  type="text"
                  value={forgotEmailOrPhone}
                  onChange={handleForgotEmailOrPhoneChange}
                  placeholder="Email hoặc Số điện thoại"
                  className={`w-full h-12 pl-12 pr-12 rounded-lg text-base text-[#1A1A1A] border transition-all duration-200 focus:outline-none ${
                    forgotError
                      ? 'border-[#D32F2F] focus:border-[#D32F2F] focus:ring-1 focus:ring-[#D32F2F] bg-red-50/10'
                      : 'border-slate-300 focus:border-[#2B78E4] focus:ring-1 focus:ring-[#2B78E4]'
                  }`}
                />
                {forgotError && (
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
                    <ErrorIcon />
                  </div>
                )}
              </div>
              {forgotError && (
                <span className="text-[13px] font-bold text-[#D32F2F] mt-0.5 animate-fadeIn">
                  {forgotError}
                </span>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full h-12 bg-[#3B82F6] hover:bg-[#2563EB] active:bg-[#1D4ED8] text-white font-bold tracking-wide rounded-lg shadow-sm hover:shadow transition-all duration-200 mt-4 cursor-pointer flex items-center justify-center text-[15px]"
            >
              Gửi yêu cầu
            </button>

          </form>

          {/* Footer Back to Login Link */}
          <div className="mt-12 text-[15px] text-center font-medium">
            <button
              onClick={() => {
                setView('login')
                setForgotEmailOrPhone('')
                setForgotError('')
                setForgotSubmitted(false)
              }}
              className="font-semibold text-[#0056C6] hover:underline cursor-pointer flex items-center gap-1 justify-center mx-auto"
            >
              &larr; Quay lại Đăng nhập
            </button>
          </div>

        </div>
      )}
    </div>
  )
}

export default App
