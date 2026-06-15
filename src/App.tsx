import React, { useState, useEffect, useRef } from 'react'
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

// Custom Hourglass Icon for OTP Timer matching the reference image
const HourglassIcon = () => (
  <svg
    className="w-4 h-4 text-[#4A4A4A] mr-1.5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M5 2h14" />
    <path d="M5 22h14" />
    <path d="M19 2v4c0 4-3 7-7 7s-7-3-7-7V2" />
    <path d="M5 22v-4c0-4 3-7 7-7s7 3 7 7v4" />
  </svg>
)

function App() {
  const [view, setView] = useState<'login' | 'forgot_password' | 'otp_verification'>('login')
  
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

  // OTP Verification Form States
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''))
  const [timeLeft, setTimeLeft] = useState(179) // 2:59 (179 seconds)
  const otpRefs = useRef<HTMLInputElement[]>([])

  // OTP Countdown Timer Logic
  useEffect(() => {
    if (view !== 'otp_verification') return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [view])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

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
      // Go to OTP validation screen instead of returning to login
      setTimeLeft(179) // Reset timer to 2:59
      setOtp(Array(6).fill('')) // Reset OTP inputs
      setView('otp_verification')
    }
  }

  const handleForgotEmailOrPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setForgotEmailOrPhone(val)
    if (forgotSubmitted) {
      setForgotError(validate(val))
    }
  }

  // OTP Passcode Input Handles
  const handleOtpChange = (val: string, index: number) => {
    const cleanVal = val.replace(/[^0-9]/g, '')
    if (!cleanVal) return

    const newOtp = [...otp]
    newOtp[index] = cleanVal.substring(cleanVal.length - 1)
    setOtp(newOtp)

    // Move focus to next input
    if (index < 5 && otpRefs.current[index + 1]) {
      otpRefs.current[index + 1].focus()
    }
  }

  const handleOtpKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace') {
      const newOtp = [...otp]
      newOtp[index] = ''
      setOtp(newOtp)

      // Move focus to previous input
      if (index > 0 && otpRefs.current[index - 1]) {
        otpRefs.current[index - 1].focus()
      }
    }
  }

  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').replace(/[^0-9]/g, '').substring(0, 6)
    if (pastedData.length === 6) {
      const newOtp = pastedData.split('')
      setOtp(newOtp)
      otpRefs.current[5].focus()
    }
  }

  // Submit OTP Verification
  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const otpCode = otp.join('')
    if (otpCode.length < 6) {
      alert('Vui lòng nhập đầy đủ mã xác thực gồm 6 chữ số.')
      return
    }

    // Demo check: Accept '123456' as correct security code
    if (otpCode === '123456') {
      alert('Xác thực thành công! Hệ thống sẽ chuyển bạn về trang đăng nhập để đặt lại mật khẩu.')
      setView('login')
      setForgotEmailOrPhone('')
      setForgotSubmitted(false)
    } else {
      alert('Mã xác thực không chính xác. Vui lòng nhập lại (Mã mặc định là: 123456)')
    }
  }

  const handleResendOtp = () => {
    if (timeLeft === 0) {
      setTimeLeft(179)
      alert('Một mã bảo mật mới đã được gửi đi!')
    } else {
      alert(`Vui lòng đợi thêm ${formatTime(timeLeft)} để yêu cầu gửi lại mã.`)
    }
  }

  return (
    <div className="flex-1 flex flex-col justify-center items-center px-4 py-12 sm:px-6 lg:px-8 bg-[#F7F9FC]">
      
      {view === 'login' && (
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
                  setError('')
                  setIsSubmitted(false)
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
      )}

      {view === 'forgot_password' && (
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

      {view === 'otp_verification' && (
        /* OTP Security Code Verification View */
        <div className="w-full max-w-[450px] bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-slate-100 p-8 sm:p-10 flex flex-col items-center transition-all duration-300">
          
          {/* Header Titles */}
          <h1 className="text-[26px] font-bold text-[#1A1A1A] text-center leading-tight tracking-tight mb-2 mt-4">
            Xác thực mã bảo mật
          </h1>
          <p className="text-[15px] text-[#707070] text-center mb-8 max-w-[320px] leading-relaxed">
            Vui lòng kiểm tra hòm thư điện tử hoặc số điện thoại của bạn để lấy mã
          </p>

          {/* OTP Form */}
          <form onSubmit={handleOtpSubmit} className="w-full flex flex-col items-center">
            
            {/* OTP 6-Digit Grid */}
            <div className="flex justify-between gap-2.5 mb-6 w-full max-w-[360px]">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    if (el) otpRefs.current[index] = el
                  }}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(e.target.value, index)}
                  onKeyDown={(e) => handleOtpKeyDown(e, index)}
                  onPaste={index === 0 ? handleOtpPaste : undefined}
                  className="w-12 h-12 text-center text-xl font-bold border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2B78E4] focus:border-[#2B78E4] transition-all duration-150"
                />
              ))}
            </div>

            {/* Countdown Timer */}
            <div className="flex items-center justify-center text-[14px] text-[#4A4A4A] mb-3">
              <HourglassIcon />
              <span>Mã hiệu lực còn lại: </span>
              <span className="font-bold ml-1">{formatTime(timeLeft)}</span>
            </div>

            {/* Resend Link */}
            <div className="mb-8">
              <button
                type="button"
                onClick={handleResendOtp}
                className="text-[14px] text-[#707070] hover:text-[#0056C6] hover:underline cursor-pointer font-medium"
              >
                Gửi lại mã
              </button>
            </div>

            {/* Action Buttons (Hủy & Xác nhận) */}
            <div className="flex gap-4 w-full mt-2">
              <button
                type="button"
                onClick={() => {
                  setView('forgot_password')
                  setOtp(Array(6).fill(''))
                }}
                className="flex-1 h-12 bg-white hover:bg-slate-50 active:bg-slate-100 border border-slate-300 text-[#1A1A1A] font-bold rounded-lg transition-all duration-200 cursor-pointer flex items-center justify-center text-[15px]"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="flex-1 h-12 bg-[#0056C6] hover:bg-[#0047A5] active:bg-[#003882] text-white font-bold rounded-lg shadow-sm hover:shadow transition-all duration-200 cursor-pointer flex items-center justify-center text-[15px]"
              >
                Xác nhận
              </button>
            </div>

          </form>

        </div>
      )}

    </div>
  )
}

export default App
