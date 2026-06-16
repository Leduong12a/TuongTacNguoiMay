import React, { useState } from 'react'
import { Camera, Mail, MapPin, Phone, Edit3 } from 'lucide-react'

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
    <div className="flex-1 overflow-auto bg-[#F7F9FC] p-4 md:p-6">
      <div className="max-w-3xl mx-auto">
        {/* Main Profile Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          
          {/* Profile Header Section */}
          <div className="p-6 md:p-8 border-b border-slate-100">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-slate-300 flex items-center justify-center shadow-md overflow-hidden">
                  <svg
                    className="w-12 h-12 md:w-16 md:h-16 text-slate-500"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
                <button
                  onClick={handleChangeAvatar}
                  className="absolute bottom-0 right-0 bg-[#0056C6] text-white p-2.5 rounded-full shadow-lg hover:bg-blue-700 transition-colors cursor-pointer"
                >
                  <Camera className="w-4 h-4" />
                </button>
              </div>

              {/* Profile Info */}
              <div className="flex-1 min-w-0">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-1">
                  {profileData.name}
                </h2>
                <p className="text-slate-500 text-sm mb-4">{profileData.position}</p>

                <div className="space-y-2 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-slate-400" />
                    <span>{profileData.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-slate-400" />
                    <span>{profileData.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    <span>{profileData.address}</span>
                  </div>
                </div>

                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="mt-4 px-4 py-2 bg-[#0056C6] text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer text-sm font-semibold flex items-center gap-2"
                >
                  <Edit3 className="w-4 h-4" />
                  {isEditing ? 'Hủy' : 'Thay đổi ảnh'}
                </button>
              </div>
            </div>
          </div>

          {/* Basic Info Section */}
          <div className="p-6 md:p-8 border-b border-slate-100">
            <h3 className="text-lg font-bold text-slate-800 mb-6">Thông tin cơ bản</h3>
            
            <div className="space-y-4">
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
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg bg-white text-slate-800 disabled:bg-slate-50 focus:outline-none focus:border-[#0056C6] transition-colors"
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
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg bg-white text-slate-800 disabled:bg-slate-50 focus:outline-none focus:border-[#0056C6] transition-colors"
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
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg bg-white text-slate-800 disabled:bg-slate-50 focus:outline-none focus:border-[#0056C6] transition-colors"
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
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg bg-white text-slate-800 disabled:bg-slate-50 focus:outline-none focus:border-[#0056C6] transition-colors"
                />
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Địa chỉ
                </label>
                <input
                  type="text"
                  value={isEditing ? editData.address : profileData.address}
                  onChange={(e) => isEditing && handleInputChange('address', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg bg-white text-slate-800 disabled:bg-slate-50 focus:outline-none focus:border-[#0056C6] transition-colors"
                />
              </div>

              {/* Bio */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Tiểu sử
                </label>
                <textarea
                  value={isEditing ? editData.bio : profileData.bio}
                  onChange={(e) => isEditing && handleInputChange('bio', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg bg-white text-slate-800 disabled:bg-slate-50 focus:outline-none focus:border-[#0056C6] transition-colors resize-none h-24"
                />
              </div>
            </div>

            {isEditing && (
              <button
                onClick={handleSaveChanges}
                className="mt-6 w-full px-4 py-2.5 bg-[#0056C6] text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer font-semibold"
              >
                Lưu thay đổi
              </button>
            )}
          </div>

          {/* Security Section */}
          <div className="p-6 md:p-8">
            <h3 className="text-lg font-bold text-slate-800 mb-6">Bảo mật</h3>

            <div className="space-y-4">
              {/* New Password */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Mật khẩu mới
                </label>
                <input
                  type="password"
                  placeholder="Nhập mật khẩu mới"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0056C6] transition-colors"
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Xác nhận mật khẩu
                </label>
                <input
                  type="password"
                  placeholder="Xác nhận mật khẩu mới"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0056C6] transition-colors"
                />
              </div>

              {(newPassword || confirmPassword) && (
                <button
                  onClick={handleChangePassword}
                  className="w-full px-4 py-2.5 bg-[#0056C6] text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer font-semibold mt-4"
                >
                  Đổi mật khẩu
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-[1.5px]"
            onClick={() => setShowConfirmDialog(false)}
          />

          {/* Dialog */}
          <div className="relative bg-white rounded-2xl p-6 max-w-sm w-full mx-4 shadow-2xl border border-slate-100 z-50">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-[#0056C6]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">
                Bạn có chắc chắn thay đổi ảnh đại diện không?
              </h3>
              <p className="text-sm text-slate-500 mb-6">
                Ảnh đại diện của bạn sẽ được thay đổi ngay lập tức.
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowConfirmDialog(false)}
                  className="flex-1 px-4 py-2.5 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer font-semibold"
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
