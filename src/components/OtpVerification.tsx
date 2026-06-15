import React, { useState, useEffect, useRef } from 'react'
import { HourglassIcon } from './Icons'

interface OtpVerificationProps {
  onCancel: () => void
  onSuccess: () => void
}

export const OtpVerification: React.FC<OtpVerificationProps> = ({
  onCancel,
  onSuccess,
}) => {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''))
  const [otpError, setOtpError] = useState('')
  const [timeLeft, setTimeLeft] = useState(179) // 2:59 (179 seconds)
  const otpRefs = useRef<HTMLInputElement[]>([])

  // OTP Countdown Timer Logic
  useEffect(() => {
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
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  // OTP Passcode Input Handles
  const handleOtpChange = (val: string, index: number) => {
    // Clear any previous error on typing
    if (otpError) {
      setOtpError('')
    }

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
    // Clear any previous error on backspace
    if (otpError) {
      setOtpError('')
    }

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
    setOtpError('')
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
      setOtpError('Vui lòng nhập đầy đủ mã xác thực gồm 6 chữ số.')
      return
    }

    // Demo check: Accept '123456' as correct security code
    if (otpCode === '123456') {
      setOtpError('')
      onSuccess()
    } else {
      setOtpError('Mã xác thực không chính xác, vui lòng kiểm tra lại.')
    }
  }

  const handleResendOtp = () => {
    setOtpError('')
    if (timeLeft === 0) {
      setTimeLeft(179)
      setOtp(Array(6).fill(''))
      alert('Một mã bảo mật mới đã được gửi đi!')
    } else {
      alert(`Vui lòng đợi thêm ${formatTime(timeLeft)} để yêu cầu gửi lại mã.`)
    }
  }

  return (
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
        <div className="flex justify-between gap-2.5 mb-4 w-full max-w-[360px]">
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
              className={`w-12 h-12 text-center text-xl font-bold border rounded-lg focus:outline-none focus:ring-2 transition-all duration-150 ${
                otpError
                  ? 'border-[#D32F2F] focus:ring-[#D32F2F]/20 focus:border-[#D32F2F] bg-red-50/10'
                  : 'border-slate-300 focus:ring-[#2B78E4]/20 focus:border-[#2B78E4]'
              }`}
            />
          ))}
        </div>

        {/* Error Message for OTP */}
        {otpError && (
          <span className="text-[13px] font-bold text-[#D32F2F] mb-4 text-center animate-fadeIn">
            {otpError
              .split('\n')
              .map((item, key) => {
                return (
                  <span key={key}>
                    {item}
                    <br />
                  </span>
                )
              })}
          </span>
        )}

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
            onClick={onCancel}
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
  )
}
