import React, { useState } from 'react'
import { Mail } from 'lucide-react'
import { ErrorIcon } from './Icons'

interface ForgotPasswordProps {
  onNavigateToLogin: () => void
  onSuccess: (emailOrPhone: string) => void
}

export const ForgotPassword: React.FC<ForgotPasswordProps> = ({
  onNavigateToLogin,
  onSuccess,
}) => {
  const [forgotEmailOrPhone, setForgotEmailOrPhone] = useState('')
  const [forgotError, setForgotError] = useState('')
  const [forgotSubmitted, setForgotSubmitted] = useState(false)

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

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setForgotSubmitted(true)

    const formatError = validate(forgotEmailOrPhone)
    
    if (formatError) {
      setForgotError(formatError)
    } else {
      setForgotError('')
      onSuccess(forgotEmailOrPhone)
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
          onClick={onNavigateToLogin}
          className="font-semibold text-[#0056C6] hover:underline cursor-pointer flex items-center gap-1 justify-center mx-auto"
        >
          &larr; Quay lại Đăng nhập
        </button>
      </div>

    </div>
  )
}
