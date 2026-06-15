import React, { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { ErrorIcon } from './Icons'

interface RegisterProps {
  onNavigateToLogin: () => void
  onRegisterSuccess: () => void
}

const SuccessIcon = () => (
  <div className="w-16 h-16 bg-[#E8F8F0] rounded-full flex items-center justify-center mb-6">
    <div className="w-10 h-10 bg-[#27AE60] rounded-full flex items-center justify-center text-white">
      <svg
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        xmlns="http://www.w3.org/2000/svg"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </div>
  </div>
)

export const Register: React.FC<RegisterProps> = ({
  onNavigateToLogin,
  onRegisterSuccess,
}) => {
  const [fullName, setFullName] = useState('')
  const [emailOrPhone, setEmailOrPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const validate = () => {
    if (!fullName.trim()) {
      return 'Vui lòng nhập Họ và tên.'
    }
    if (!emailOrPhone.trim()) {
      return 'Vui lòng nhập Email hoặc Số điện thoại.'
    }
    
    // Check email or phone format
    if (emailOrPhone.includes('@')) {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      if (!emailRegex.test(emailOrPhone)) {
        return 'Thông tin không hợp lệ, vui lòng kiểm tra lại'
      }
    } else {
      // Check phone number format (numeric, 9 to 11 digits)
      const phoneRegex = /^[0-9]{9,11}$/
      if (!phoneRegex.test(emailOrPhone)) {
        return 'Thông tin không hợp lệ, vui lòng kiểm tra lại'
      }
    }

    if (password.length < 8) {
      return 'Mật khẩu phải chứa ít nhất 8 ký tự.'
    }
    if (password !== confirmPassword) {
      return 'Mật khẩu xác nhận không trùng khớp.'
    }
    return ''
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)

    const validationError = validate()
    if (validationError) {
      setError(validationError)
    } else {
      setError('')
      setIsSuccess(true)
    }
  }

  return (
    <div className="w-full max-w-[450px] bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-slate-100 p-8 sm:p-10 flex flex-col items-center transition-all duration-300">
      
      {/* Header Titles */}
      <h1 className="text-[26px] font-bold text-[#1A1A1A] text-center leading-tight tracking-tight mb-2 mt-4">
        Tạo tài khoản mới
      </h1>
      <p className="text-[15px] text-[#707070] text-center mb-8 max-w-[320px] leading-relaxed">
        Tham gia cùng chúng tôi để bắt đầu trải nghiệm
      </p>

      {!isSuccess ? (
        /* Register Form View */
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          
          {/* Full Name field */}
          <div className="flex flex-col gap-1.5 w-full">
            <label 
              htmlFor="fullName" 
              className="text-[13px] font-bold text-[#2A2A2A]"
            >
              Họ và tên
            </label>
            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value)
                if (isSubmitted) setError('')
              }}
              placeholder="Nhập họ và tên"
              className="w-full h-12 px-4 rounded-lg text-base text-[#1A1A1A] border border-slate-300 focus:border-[#2B78E4] focus:ring-1 focus:ring-[#2B78E4] transition-all duration-200 focus:outline-none"
              required
            />
          </div>

          {/* Email or Phone field */}
          <div className="flex flex-col gap-1.5 w-full">
            <label 
              htmlFor="emailOrPhone" 
              className="text-[13px] font-bold text-[#2A2A2A]"
            >
              Email hoặc Số điện thoại
            </label>
            <input
              id="emailOrPhone"
              type="text"
              value={emailOrPhone}
              onChange={(e) => {
                setEmailOrPhone(e.target.value)
                if (isSubmitted) setError('')
              }}
              placeholder="Nhập email hoặc số điện thoại"
              className={`w-full h-12 px-4 rounded-lg text-base text-[#1A1A1A] border transition-all duration-200 focus:outline-none ${
                error && (error.includes('Email') || error.includes('Thông tin'))
                  ? 'border-[#D32F2F] focus:border-[#D32F2F] focus:ring-1 focus:ring-[#D32F2F] bg-red-50/10'
                  : 'border-slate-300 focus:border-[#2B78E4] focus:ring-1 focus:ring-[#2B78E4]'
              }`}
              required
            />
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
                onChange={(e) => {
                  setPassword(e.target.value)
                  if (isSubmitted) setError('')
                }}
                placeholder="Nhập mật khẩu"
                className="w-full h-12 px-4 pr-12 rounded-lg text-base text-[#1A1A1A] border border-slate-300 focus:border-[#2B78E4] focus:ring-1 focus:ring-[#2B78E4] transition-all duration-200 focus:outline-none"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 focus:outline-none transition-colors duration-150 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Confirm Password field */}
          <div className="flex flex-col gap-1.5 w-full">
            <label 
              htmlFor="confirmPassword" 
              className="text-[13px] font-bold text-[#2A2A2A]"
            >
              Xác nhận mật khẩu
            </label>
            <div className="relative w-full">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value)
                  if (isSubmitted) setError('')
                }}
                placeholder="Nhập lại mật khẩu"
                className="w-full h-12 px-4 pr-12 rounded-lg text-base text-[#1A1A1A] border border-slate-300 focus:border-[#2B78E4] focus:ring-1 focus:ring-[#2B78E4] transition-all duration-200 focus:outline-none"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 focus:outline-none transition-colors duration-150 cursor-pointer"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Error Warning (Red text) */}
          {error && (
            <span className="text-[13.5px] font-bold text-[#D32F2F] text-center animate-fadeIn mt-1 flex items-center justify-center gap-1.5">
              <ErrorIcon />
              {error}
            </span>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full h-12 bg-[#0056C6] hover:bg-[#0047A5] active:bg-[#003882] text-white font-bold rounded-lg shadow-sm hover:shadow transition-all duration-200 mt-4 cursor-pointer flex items-center justify-center text-[15px]"
          >
            ĐĂNG KÝ NGAY
          </button>

          {/* Footer login link */}
          <div className="mt-4 text-[15px] text-center font-medium text-[#4A4A4A]">
            Đã có tài khoản?{' '}
            <button
              type="button"
              onClick={onNavigateToLogin}
              className="font-bold text-[#0056C6] hover:underline cursor-pointer ml-1"
            >
              Đăng nhập ngay
            </button>
          </div>

        </form>
      ) : (
        /* Success Screen View */
        <div className="w-full flex flex-col items-center animate-fadeIn">
          
          {/* Success Checkmark Circle */}
          <SuccessIcon />

          {/* Success Messaging */}
          <h2 className="text-[20px] font-bold text-[#1A1A1A] text-center mb-3">
            Đăng ký thành công!
          </h2>
          <p className="text-[14px] text-[#707070] text-center leading-relaxed mb-8 max-w-[280px]">
            Chào mừng bạn gia nhập cộng đồng của chúng tôi. Tài khoản của bạn đã sẵn sàng.
          </p>

          {/* Login Now Button */}
          <button
            onClick={onRegisterSuccess}
            className="w-full h-12 bg-[#0056C6] hover:bg-[#0047A5] active:bg-[#003882] text-white font-bold rounded-lg shadow-sm hover:shadow transition-all duration-200 cursor-pointer flex items-center justify-center text-[15px]"
          >
            ĐĂNG NHẬP NGAY
          </button>

        </div>
      )}

    </div>
  )
}
