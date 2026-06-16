import React, { useState } from 'react'
import { Camera, Mail, MapPin, Phone, Edit3, Eye, EyeOff } from 'lucide-react'

interface ProfileData {
  name: string
  position: string
  email: string
  phone: string
  address: string
  bio: string
}

export const Profile: React.FC = () => {
  const [profileData, setProfileData] = useState<ProfileData>({
    name: 'Nguyễn Văn A',
    position: 'Nhân viên',
    email: 'example@gmail.com',
    phone: '+84 123 456 789',
    address: 'Hà Nội, Việt Nam',
    bio: 'Đây là tiểu sử của tôi'
  })

  const [editData, setEditData] = useState<ProfileData>(profileData)
  const [isEditing, setIsEditing] = useState(false)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSaveChanges = () => {
    setProfileData(editData)
    setIsEditing(false)
    alert('Thay đổi hồ sơ đã được lưu thành công!')
  }

  const handleChangeAvatar = () => {
    setShowConfirmDialog(true)
  }

  const confirmChangeAvatar = () => {
    setShowConfirmDialog(false)
    alert('Ảnh đại diện đã được cập nhật!')
  }

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      alert('Mật khẩu không khớp!')
      return
    }
    if (newPassword.length < 6) {
      alert('Mật khẩu phải có ít nhất 6 ký tự!')
      return
    }
    alert('Mật khẩu đã được thay đổi thành công!')
    setNewPassword('')
    setConfirmPassword('')
  }

  return (
    <div className="flex-1 overflow-auto bg-[#F7F9FC] p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Hồ sơ cá nhân</h1>
          <p className="text-slate-600">Quản lý thông tin cá nhân và cài đặt liên hệ của bạn</p>
        </div>

        {/* Main Profile Card */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-6">
          
          {/* Profile Header - Avatar + Basic Info */}
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Left: Avatar */}
              <div className="flex flex-col items-center md:items-start">
                <div className="relative mb-6">
                  <div className="w-28 h-28 rounded-full bg-gradient-to-br from-slate-300 to-slate-400 flex items-center justify-center shadow-md overflow-hidden">
                    <svg
                      className="w-14 h-14 text-slate-500"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  </div>
                  <button
                    onClick={handleChangeAvatar}
                    className="absolute bottom-0 right-0 bg-[#0056C6] text-white p-2.5 rounded-full shadow-lg hover:bg-blue-700 transition-colors cursor-pointer hover:scale-110"
                  >
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="px-6 py-2.5 bg-[#0056C6] text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer text-sm font-semibold flex items-center gap-2"
                >
                  <Edit3 className="w-4 h-4" />
                  {isEditing ? 'Hủy' : 'Thay đổi ảnh'}
                </button>
              </div>

              {/* Right: Basic Info Grid */}
              <div className="flex-1">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-slate-900">{profileData.name}</h2>
                  <p className="text-slate-600 text-sm">{profileData.position}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Email */}
                  <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase block mb-1">Email</label>
                    <p className="text-slate-800 text-sm flex items-center gap-2 font-medium">
                      <Mail className="w-4 h-4 text-slate-400 flex-shrink-0" />
                      {profileData.email}
                    </p>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase block mb-1">Số điện thoại</label>
                    <p className="text-slate-800 text-sm flex items-center gap-2 font-medium">
                      <Phone className="w-4 h-4 text-slate-400 flex-shrink-0" />
                      {profileData.phone}
                    </p>
                  </div>

                  {/* Address - span 2 columns */}
                  <div className="md:col-span-2">
                    <label className="text-xs font-semibold text-slate-500 uppercase block mb-1">Địa chỉ</label>
                    <p className="text-slate-800 text-sm flex items-center gap-2 font-medium">
                      <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0" />
                      {profileData.address}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-slate-200"></div>

          {/* Basic Info Section */}
          <div className="p-6 md:p-8">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Thông tin cơ bản</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Tên đầy đủ
                </label>
                <input
                  type="text"
                  value={isEditing ? editData.name : profileData.name}
                  onChange={(e) => isEditing && handleInputChange('name', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg bg-white text-slate-800 disabled:bg-slate-50 disabled:text-slate-600 text-sm focus:outline-none focus:border-[#0056C6] focus:ring-1 focus:ring-[#0056C6] transition-colors"
                />
              </div>

              {/* Position */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Chức vụ
                </label>
                <input
                  type="text"
                  value={isEditing ? editData.position : profileData.position}
                  onChange={(e) => isEditing && handleInputChange('position', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg bg-white text-slate-800 disabled:bg-slate-50 disabled:text-slate-600 text-sm focus:outline-none focus:border-[#0056C6] focus:ring-1 focus:ring-[#0056C6] transition-colors"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={isEditing ? editData.email : profileData.email}
                  onChange={(e) => isEditing && handleInputChange('email', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg bg-white text-slate-800 disabled:bg-slate-50 disabled:text-slate-600 text-sm focus:outline-none focus:border-[#0056C6] focus:ring-1 focus:ring-[#0056C6] transition-colors"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Số điện thoại
                </label>
                <input
                  type="tel"
                  value={isEditing ? editData.phone : profileData.phone}
                  onChange={(e) => isEditing && handleInputChange('phone', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg bg-white text-slate-800 disabled:bg-slate-50 disabled:text-slate-600 text-sm focus:outline-none focus:border-[#0056C6] focus:ring-1 focus:ring-[#0056C6] transition-colors"
                />
              </div>

              {/* Address - span 2 columns */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Địa chỉ
                </label>
                <input
                  type="text"
                  value={isEditing ? editData.address : profileData.address}
                  onChange={(e) => isEditing && handleInputChange('address', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg bg-white text-slate-800 disabled:bg-slate-50 disabled:text-slate-600 text-sm focus:outline-none focus:border-[#0056C6] focus:ring-1 focus:ring-[#0056C6] transition-colors"
                />
              </div>

              {/* Bio - span 2 columns */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Tiểu sử
                </label>
                <textarea
                  value={isEditing ? editData.bio : profileData.bio}
                  onChange={(e) => isEditing && handleInputChange('bio', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg bg-white text-slate-800 disabled:bg-slate-50 disabled:text-slate-600 text-sm focus:outline-none focus:border-[#0056C6] focus:ring-1 focus:ring-[#0056C6] transition-colors resize-none h-20"
                />
              </div>
            </div>

            {isEditing && (
              <button
                onClick={handleSaveChanges}
                className="w-full px-4 py-3 bg-[#0056C6] text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer font-semibold"
              >
                Lưu thay đổi
              </button>
            )}
          </div>
        </div>

        {/* Security Card */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 md:p-8">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Bảo mật</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* New Password */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Mật khẩu mới
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    placeholder="Nhập mật khẩu mới"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg bg-white text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:border-[#0056C6] focus:ring-1 focus:ring-[#0056C6] transition-colors pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Xác nhận mật khẩu
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Xác nhận mật khẩu mới"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg bg-white text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:border-[#0056C6] focus:ring-1 focus:ring-[#0056C6] transition-colors pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            {(newPassword || confirmPassword) && (
              <button
                onClick={handleChangePassword}
                className="w-full px-4 py-3 bg-[#0056C6] text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer font-semibold mt-6"
              >
                Đổi mật khẩu
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
            onClick={() => setShowConfirmDialog(false)}
          />

          {/* Dialog */}
          <div className="relative bg-white rounded-xl p-6 max-w-sm w-full mx-4 shadow-2xl border border-slate-200 z-50">
            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-7 h-7 text-[#0056C6]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm0-13c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">
                Bạn có chắc chắn thay đổi ảnh đại diện?
              </h3>
              <p className="text-sm text-slate-500 mb-6">
                Ảnh đại diện của bạn sẽ được thay đổi ngay lập tức.
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowConfirmDialog(false)}
                  className="flex-1 px-4 py-2.5 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer font-semibold"
                >
                  Hủy
                </button>
                <button
                  onClick={confirmChangeAvatar}
                  className="flex-1 px-4 py-2.5 bg-[#0056C6] text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer font-semibold"
                >
                  Có
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
