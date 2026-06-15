import React, { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { ChatIcon, ErrorIcon } from './Icons'

interface LoginProps {
  onNavigateToForgotPassword: () => void
  onLoginSuccess: (emailOrPhone: string) => void
  onNavigateToRegister: () => void
}

export const Login: React.FC<LoginProps> = ({
  onNavigateToForgotPassword,
  onLoginSuccess,
  onNavigateToRegister,
}) => {
  const [emailOrPhone, setEmailOrPhone] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    onLoginSuccess(emailOrPhone)
  }

  const handleEmailOrPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailOrPhone(e.target.value)
  }

  return (
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
            onClick={onNavigateToForgotPassword}
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
        <button
          onClick={onNavigateToRegister}
          className="font-bold text-[#0056C6] hover:underline cursor-pointer ml-1 text-inherit"
        >
          Đăng ký ngay
        </button>
      </div>

    </div>
  )
}
