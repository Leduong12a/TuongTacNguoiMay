import React, { useState, useEffect } from 'react'
import { Pencil, ChevronDown, HelpCircle, Check, X } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Typography } from "@/components/ui/typography"

interface ProfileData {
  name: string
  email: string
  phone: string
  status: string
  note: string
}

export const Profile: React.FC = () => {
  const [profileData, setProfileData] = useState<ProfileData>({
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@example.com',
    phone: '+84 123 456 789',
    status: 'Trực tuyến',
    note: 'Đang làm việc'
  })

  // Track current form inputs
  const [formData, setFormData] = useState<ProfileData>(profileData)
  
  // Dialog visibility states
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [showSuccessToast, setShowSuccessToast] = useState(false)

  // Auto-hide success toast after 3 seconds
  useEffect(() => {
    if (showSuccessToast) {
      const timer = setTimeout(() => {
        setShowSuccessToast(false)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [showSuccessToast])

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSaveClick = () => {
    setShowConfirmModal(true)
  }

  const handleConfirmSave = () => {
    setProfileData(formData)
    setShowConfirmModal(false)
    setShowSuccessToast(true)
  }

  const handleCancelSave = () => {
    setShowConfirmModal(false)
  }

  const handleToastClose = () => {
    setShowSuccessToast(false)
  }

  const handleChangeAvatar = () => {
    alert('Chức năng tải lên hình ảnh mới')
  }

  return (
    <div className="flex-1 overflow-auto bg-[#f5f7fb] relative font-sans p-8">
      
      {/* Success Toast Notification */}
      {showSuccessToast && (
        <div className="fixed top-6 right-6 z-55 flex items-center gap-2 px-4 py-2 bg-white border border-[#2E7D32]/25 rounded shadow-lg animate-slideIn">
          <div className="w-5 h-5 rounded-full bg-[#EAF7EE] border border-[#A2E0B8] flex items-center justify-center text-[#2E7D32] shrink-0">
            <Check className="w-3.5 h-3.5 stroke-[2.5]" />
          </div>
          <Typography variant="small" className="font-bold text-slate-800">Cập nhật thành công</Typography>
          <Button 
            variant="ghost"
            size="icon-xs"
            onClick={handleToastClose}
            className="p-0.5 text-slate-400 hover:text-slate-600 transition-colors ml-2"
          >
            <X className="w-3.5 h-3.5" />
          </Button>
        </div>
      )}

      <div className="max-w-4xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-8">
          <Typography variant="h1" className="text-2xl font-bold text-[#0f2942] mb-1 border-none shadow-none">
            Hồ sơ cá nhân
          </Typography>
          <Typography variant="muted" className="text-slate-500 text-xs font-medium">
            Quản lý thông tin cá nhân và cài đặt bảo mật của bạn.
          </Typography>
        </div>

        {/* Main Columns Container */}
        <div className="flex flex-col md:flex-row gap-8 items-start mb-8">
          
          {/* Left Column: Avatar */}
          <div className="flex flex-col items-center shrink-0 w-full md:w-44">
            <div className="relative">
              {/* Square avatar placeholder */}
              <div className="w-40 h-40 bg-[#d4d8e0] rounded-xl flex items-center justify-center overflow-hidden shadow-sm border border-slate-200">
                <svg
                  className="w-28 h-28 text-slate-500 mt-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
              {/* Blue edit pencil button in bottom-right */}
              <Button
                variant="default"
                size="icon-xs"
                onClick={handleChangeAvatar}
                className="absolute bottom-1 right-1 bg-[#0056C6] hover:bg-blue-700 text-white rounded-full shadow border-2 border-white flex items-center justify-center cursor-pointer transition-all active:scale-90"
                title="Thay đổi ảnh"
              >
                <Pencil className="w-3 h-3" />
              </Button>
            </div>
            {/* Clickable text link */}
            <Button
              variant="link"
              onClick={handleChangeAvatar}
              className="mt-3 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors"
            >
              Thay đổi ảnh
            </Button>
          </div>

          {/* Right Column: Forms */}
          <div className="flex-1 flex flex-col gap-5 w-full">
            
            {/* Card: Thông tin cơ bản */}
            <Card className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm">
              <CardHeader className="p-0 pb-2 border-b border-slate-100 mb-5">
                <CardTitle className="text-sm font-bold text-slate-800">Thông tin cơ bản</CardTitle>
              </CardHeader>
              
              <CardContent className="p-0 space-y-4">
                {/* Họ và tên */}
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Họ và tên</label>
                  <Input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="h-8 text-xs text-slate-700 bg-white border border-slate-300 rounded"
                  />
                </div>

                {/* Địa chỉ email */}
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Địa chỉ email</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="h-8 text-xs text-slate-700 bg-white border border-slate-300 rounded"
                  />
                </div>

                {/* Số điện thoại */}
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Số điện thoại</label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="h-8 text-xs text-slate-700 bg-white border border-slate-300 rounded"
                  />
                </div>

                {/* Row: Trạng thái & Ghi chú */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Trạng thái */}
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Trạng thái</label>
                    <div className="relative">
                      <select
                        value={formData.status}
                        onChange={(e) => handleInputChange('status', e.target.value)}
                        className="w-full px-3 h-8 border border-slate-300 rounded bg-white text-slate-700 text-xs focus:outline-none focus:border-blue-500 transition-all appearance-none cursor-pointer pr-8"
                      >
                        <option value="Trực tuyến">Trực tuyến</option>
                        <option value="Bận">Bận</option>
                        <option value="Không có mặt">Không có mặt</option>
                      </select>
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-slate-400">
                        <ChevronDown className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>

                  {/* Ghi chú */}
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Ghi chú</label>
                    <Input
                      type="text"
                      value={formData.note}
                      onChange={(e) => handleInputChange('note', e.target.value)}
                      className="h-8 text-xs text-slate-700 bg-white border border-slate-300 rounded"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Card: Bảo mật */}
            <Card className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm">
              <CardHeader className="p-0 pb-2 border-b border-slate-100 mb-4">
                <CardTitle className="text-sm font-bold text-slate-800">Bảo mật</CardTitle>
              </CardHeader>
              
              <CardContent className="p-0 flex items-center justify-between">
                <div>
                  <Typography variant="small" className="font-bold text-slate-800">Mật khẩu</Typography>
                  <Typography variant="muted" className="text-[10px] text-slate-400 mt-0.5 block">Cập nhật lần cuối: 2 tháng trước</Typography>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => alert('Chức năng đổi mật khẩu')}
                  className="font-bold border border-slate-300 hover:border-slate-400 text-slate-700 hover:bg-slate-50 transition-all cursor-pointer"
                >
                  Đổi mật khẩu
                </Button>
              </CardContent>
            </Card>

            {/* Save Button Row */}
            <div className="flex justify-end mt-2">
              <Button
                variant="default"
                onClick={handleSaveClick}
                className="bg-[#0056C6] hover:bg-blue-700 text-white rounded font-bold px-6 py-2 transition-all active:scale-97 cursor-pointer shadow-sm"
              >
                Lưu thay đổi
              </Button>
            </div>

          </div>
        </div>

      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-[1px]">
          <Card className="bg-white rounded-xl p-6 max-w-sm w-full mx-4 shadow-2xl border border-slate-150 z-50">
            <div className="text-center">
              {/* Question Icon Circle */}
              <div className="w-14 h-14 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center mx-auto mb-4 text-[#0056C6]">
                <HelpCircle className="w-8 h-8 stroke-[2.5]" />
              </div>
              
              <Typography variant="h4" className="text-xs font-bold text-slate-800 mb-6 px-2 leading-relaxed">
                Bạn có xác nhận thay đổi hồ sơ không?
              </Typography>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={handleCancelSave}
                  className="flex-1 border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer font-bold text-xs"
                >
                  Không
                </Button>
                <Button
                  variant="default"
                  onClick={handleConfirmSave}
                  className="flex-1 bg-[#0056C6] hover:bg-blue-700 text-white transition-colors cursor-pointer font-bold text-xs"
                >
                  Có
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

    </div>
  )
}
