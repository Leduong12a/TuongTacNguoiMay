import React, { useState } from 'react'
import { Eye, EyeOff, Lock, ArrowRight } from 'lucide-react'
import { ResetLockIcon, ErrorIcon } from './Icons'

interface ResetPasswordProps {
  onNavigateToLogin: () => void
  onSuccess: () => void
}

export const ResetPassword: React.FC<ResetPasswordProps> = ({
  onNavigateToLogin,
  onSuccess,
}) => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Calculate password strength level (0 to 4) based on criteria
  const getStrength = (val: string) => {
    if (!val) return 0
    let level = 0
    if (val.length >= 8) level += 1
    if (/[A-Z]/.test(val)) level += 1
    if (/[0-9]/.test(val)) level += 1
    if (/[^A-Za-z0-9]/.test(val)) level += 1
    return Math.max(1, level) // Min 1 bar if not empty
  }

  const strength = getStrength(password)

  const getStrengthColor = (level: number) => {
    switch (level) {
      case 1:
        return 'bg-red-500' // Weak
      case 2:
        return 'bg-amber-500' // Medium
      case 3:
        return 'bg-blue-500' // Strong
      case 4:
        return 'bg-emerald-500' // Very strong
      default:
        return 'bg-slate-200'
    }
  }

  const validate = () => {
    if (password.length < 8) {
      return 'Mật khẩu phải chứa ít nhất 8 ký tự.'
    }
    if (!/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
      return 'Mật khẩu phải bao gồm chữ hoa và chữ số.'
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
      onSuccess()
    }
  }

  return (
    <div className="w-full max-w-[450px] bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-slate-100 p-8 sm:p-10 flex flex-col items-center transition-all duration-300">
      
      {/* Header Reset Padlock Icon */}
      <ResetLockIcon />

      {/* Header Titles */}
      <h1 className="text-[26px] font-bold text-[#1A1A1A] text-center leading-tight tracking-tight mb-2 mt-4">
        Đặt lại mật khẩu mới
      </h1>
      <p className="text-[15px] text-[#707070] text-center mb-8 max-w-[320px] leading-relaxed">
        Vui lòng nhập mật khẩu mới cho tài khoản của bạn.
      </p>

      {/* Reset Password Form */}
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
        
        {/* New Password Field */}
        <div className="flex flex-col gap-1.5 w-full">
          <label 
            htmlFor="password" 
            className="text-[13px] font-bold text-[#2A2A2A]"
          >
            Mật khẩu mới
          </label>
          <div className="relative w-full">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8C8C8C] pointer-events-none">
              <Lock className="w-5 h-5" />
            </span>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                if (isSubmitted) setError('')
              }}
              placeholder="••••••••"
              className={`w-full h-12 pl-12 pr-12 rounded-lg text-base text-[#1A1A1A] border transition-all duration-200 focus:outline-none ${
                error && (password.length < 8 || !/[A-Z]/.test(password) || !/[0-9]/.test(password))
                  ? 'border-[#D32F2F] focus:border-[#D32F2F] focus:ring-1 focus:ring-[#D32F2F] bg-red-50/10'
                  : 'border-slate-300 focus:border-[#2B78E4] focus:ring-1 focus:ring-[#2B78E4]'
              }`}
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

          {/* Password Strength Indicator (4 bars) */}
          <div className="flex gap-1.5 mt-1">
            {[1, 2, 3, 4].map((barIndex) => (
              <div
                key={barIndex}
                className={`h-1 flex-1 rounded transition-colors duration-300 ${
                  strength >= barIndex ? getStrengthColor(strength) : 'bg-slate-200'
                }`}
              />
            ))}
          </div>
          <span className="text-[12px] text-[#8C8C8C] mt-0.5">
            Ít nhất 8 ký tự, bao gồm chữ hoa và số.
          </span>
        </div>

        {/* Confirm Password Field */}
        <div className="flex flex-col gap-1.5 w-full">
          <label 
            htmlFor="confirmPassword" 
            className="text-[13px] font-bold text-[#2A2A2A]"
          >
            Xác nhận mật khẩu
          </label>
          <div className="relative w-full">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8C8C8C] pointer-events-none">
              <Lock className="w-5 h-5" />
            </span>
            <input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value)
                if (isSubmitted) setError('')
              }}
              placeholder="••••••••"
              className={`w-full h-12 pl-12 pr-12 rounded-lg text-base text-[#1A1A1A] border transition-all duration-200 focus:outline-none ${
                error && password !== confirmPassword
                  ? 'border-[#D32F2F] focus:border-[#D32F2F] focus:ring-1 focus:ring-[#D32F2F] bg-red-50/10'
                  : 'border-slate-300 focus:border-[#2B78E4] focus:ring-1 focus:ring-[#2B78E4]'
              }`}
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

        {/* Error message */}
        {error && (
          <span className="text-[13.5px] font-bold text-[#D32F2F] text-center animate-fadeIn mt-1 flex items-center justify-center gap-1.5">
            <ErrorIcon />
            {error}
          </span>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full h-12 bg-[#0056C6] hover:bg-[#0047A5] active:bg-[#003882] text-white font-bold rounded-lg shadow-sm hover:shadow transition-all duration-200 mt-4 cursor-pointer flex items-center justify-center gap-2 text-[15px]"
        >
          <span>Cập nhật mật khẩu</span>
          <ArrowRight className="w-4 h-4" />
        </button>

      </form>

      {/* Footer Back to Login Link */}
      <div className="mt-8 text-[15px] text-center font-medium">
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
