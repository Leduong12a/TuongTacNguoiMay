import React, { useState } from 'react'
import { Sun, Moon, Monitor, Video, Phone, MoreVertical, Plus, Send } from 'lucide-react'

type ThemeType = 'light' | 'dark' | 'system'
type FontSizeType = 'small' | 'medium' | 'large'

export const Settings: React.FC = () => {
  const [theme, setTheme] = useState<ThemeType>('light')
  const [fontSize, setFontSize] = useState<FontSizeType>('medium')
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [pushEnabled, setPushEnabled] = useState(true)
  const [showContentEnabled, setShowContentEnabled] = useState(false)

  // Map font size keys to display names
  const getFontSizeLabel = () => {
    switch (fontSize) {
      case 'small': return 'Nhỏ'
      case 'medium': return 'Vừa'
      case 'large': return 'Lớn'
    }
  }

  // Handle slider changes
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value)
    if (value === 1) setFontSize('small')
    else if (value === 2) setFontSize('medium')
    else setFontSize('large')
  }

  // Get slider numeric value
  const getSliderValue = () => {
    switch (fontSize) {
      case 'small': return 1
      case 'medium': return 2
      case 'large': return 3
    }
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-[#f4f6fa] overflow-hidden select-none font-sans">
      
      {/* Title Header */}
      <div className="border-b border-slate-200 bg-white px-8 py-4.5 shrink-0 flex items-center">
        <h1 className="text-xl font-bold text-[#0056C6]">Tùy chỉnh giao diện</h1>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto p-8">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Left Side: Customize Options */}
          <div className="flex-1 flex flex-col gap-6 w-full lg:max-w-xl">
            
            {/* Card: Chủ đề */}
            <div className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-sm">
              <h3 className="text-sm font-bold text-slate-800 mb-4">Chủ đề</h3>
              
              <div className="space-y-3">
                {/* Option: Sáng (Mặc định) */}
                <div 
                  onClick={() => setTheme('light')}
                  className={`flex items-center justify-between px-4 py-3 border rounded-lg cursor-pointer transition-all ${
                    theme === 'light' 
                      ? 'border-[#0056C6] bg-[#E8F1FF]/30' 
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {/* Radio Button */}
                    <div className={`w-4.5 h-4.5 rounded-full border flex items-center justify-center transition-colors ${
                      theme === 'light' ? 'border-[#0056C6]' : 'border-slate-300'
                    }`}>
                      {theme === 'light' && <div className="w-2.5 h-2.5 rounded-full bg-[#0056C6]" />}
                    </div>
                    <span className="text-xs font-bold text-slate-800">Sáng (Mặc định)</span>
                  </div>
                  <Sun className={`w-4.5 h-4.5 ${theme === 'light' ? 'text-[#0056C6]' : 'text-slate-400'}`} />
                </div>

                {/* Option: Tối */}
                <div 
                  onClick={() => setTheme('dark')}
                  className={`flex items-center justify-between px-4 py-3 border rounded-lg cursor-pointer transition-all ${
                    theme === 'dark' 
                      ? 'border-[#0056C6] bg-[#E8F1FF]/30' 
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {/* Radio Button */}
                    <div className={`w-4.5 h-4.5 rounded-full border flex items-center justify-center transition-colors ${
                      theme === 'dark' ? 'border-[#0056C6]' : 'border-slate-300'
                    }`}>
                      {theme === 'dark' && <div className="w-2.5 h-2.5 rounded-full bg-[#0056C6]" />}
                    </div>
                    <span className="text-xs font-bold text-slate-800">Tối</span>
                  </div>
                  <Moon className={`w-4.5 h-4.5 ${theme === 'dark' ? 'text-[#0056C6]' : 'text-slate-400'}`} />
                </div>

                {/* Option: Theo hệ thống */}
                <div 
                  onClick={() => setTheme('system')}
                  className={`flex items-center justify-between px-4 py-3 border rounded-lg cursor-pointer transition-all ${
                    theme === 'system' 
                      ? 'border-[#0056C6] bg-[#E8F1FF]/30' 
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {/* Radio Button */}
                    <div className={`w-4.5 h-4.5 rounded-full border flex items-center justify-center transition-colors ${
                      theme === 'system' ? 'border-[#0056C6]' : 'border-slate-300'
                    }`}>
                      {theme === 'system' && <div className="w-2.5 h-2.5 rounded-full bg-[#0056C6]" />}
                    </div>
                    <span className="text-xs font-bold text-slate-800">Theo hệ thống</span>
                  </div>
                  <Monitor className={`w-4.5 h-4.5 ${theme === 'system' ? 'text-[#0056C6]' : 'text-slate-400'}`} />
                </div>
              </div>
            </div>

            {/* Card: Kích thước chữ */}
            <div className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-slate-800">Kích thước chữ</h3>
                <span className="px-2 py-0.5 bg-blue-50 text-[#0056C6] text-[10px] font-bold rounded">
                  {getFontSizeLabel()}
                </span>
              </div>
              
              <div className="space-y-4">
                {/* Custom Slider bar */}
                <div className="relative pt-1 px-1">
                  <input
                    type="range"
                    min="1"
                    max="3"
                    step="1"
                    value={getSliderValue()}
                    onChange={handleSliderChange}
                    className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0056C6] focus:outline-none"
                  />
                  
                  {/* Tick Labels */}
                  <div className="flex justify-between text-[9px] text-slate-400 font-bold mt-3">
                    <span>Đang chọn: Nhỏ</span>
                    <span className="mr-6">Vừa</span>
                    <span>Lớn</span>
                  </div>
                </div>
                
                <p className="text-[10px] text-slate-400 font-semibold leading-relaxed">
                  Điều chỉnh kích thước hiển thị của tin nhắn và giao diện.
                </p>
              </div>
            </div>

            {/* Card: Thông báo */}
            <div className="bg-white border border-[#e2e8f0] rounded-xl p-6 shadow-sm">
              <h3 className="text-sm font-bold text-slate-800 mb-5">Thông báo</h3>
              
              <div className="space-y-5">
                {/* Checkbox: Âm thanh */}
                <div 
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className="flex items-start gap-3 cursor-pointer group"
                >
                  <div className="pt-0.5">
                    <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                      soundEnabled ? 'bg-[#0056C6] border-[#0056C6] text-white' : 'border-slate-300 bg-white'
                    }`}>
                      {soundEnabled && (
                        <svg className="w-3 h-3 fill-none stroke-current stroke-[3]" viewBox="0 0 24 24">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-755 group-hover:text-slate-900 leading-tight">Âm thanh</span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">Phát âm thanh khi có tin nhắn mới</span>
                  </div>
                </div>

                {/* Checkbox: Thông báo đẩy */}
                <div 
                  onClick={() => setPushEnabled(!pushEnabled)}
                  className="flex items-start gap-3 cursor-pointer group"
                >
                  <div className="pt-0.5">
                    <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                      pushEnabled ? 'bg-[#0056C6] border-[#0056C6] text-white' : 'border-slate-300 bg-white'
                    }`}>
                      {pushEnabled && (
                        <svg className="w-3 h-3 fill-none stroke-current stroke-[3]" viewBox="0 0 24 24">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-755 group-hover:text-slate-900 leading-tight">Thông báo đẩy</span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">Hiển thị thông báo trên màn hình</span>
                  </div>
                </div>

                {/* Checkbox: Hiển thị nội dung */}
                <div 
                  onClick={() => setShowContentEnabled(!showContentEnabled)}
                  className="flex items-start gap-3 cursor-pointer group"
                >
                  <div className="pt-0.5">
                    <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                      showContentEnabled ? 'bg-[#0056C6] border-[#0056C6] text-white' : 'border-slate-300 bg-white'
                    }`}>
                      {showContentEnabled && (
                        <svg className="w-3 h-3 fill-none stroke-current stroke-[3]" viewBox="0 0 24 24">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-755 group-hover:text-slate-900 leading-tight">Hiển thị nội dung</span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">Hiện trước tin nhắn trong thông báo</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Side: Live Interface Preview */}
          <div className="flex-1 w-full lg:max-w-md shrink-0">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-3">
              Xem trước giao diện
            </span>
            
            {/* Mock Chat Window */}
            <div className={`border border-slate-200 rounded-xl overflow-hidden shadow-md flex flex-col h-[420px] transition-colors duration-300 ${
              theme === 'dark' ? 'bg-[#0f172a] border-slate-800' : 'bg-[#f0f4fa]'
            }`}>
              
              {/* Preview Header */}
              <div className={`px-4 py-3 flex items-center justify-between border-b ${
                theme === 'dark' ? 'bg-[#1e293b] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-800'
              }`}>
                <div className="flex items-center gap-3">
                  {/* Group Avatar */}
                  <div className="relative">
                    <div className="w-9 h-9 rounded-full bg-slate-300 overflow-hidden flex items-center justify-center">
                      <img 
                        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=100&auto=format&fit=crop"
                        alt="Avatar"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white bg-[#2E7D32]" />
                  </div>
                  
                  {/* Title */}
                  <div className="flex flex-col leading-tight">
                    <span className="text-xs font-bold">Hội nhóm thiết kế</span>
                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">Đang hoạt động</span>
                  </div>
                </div>

                {/* Call/Menu Icons */}
                <div className="flex items-center gap-2 text-slate-400">
                  <button className="p-1 hover:text-slate-600 transition-colors">
                    <Video className="w-4 h-4" />
                  </button>
                  <button className="p-1 hover:text-slate-600 transition-colors">
                    <Phone className="w-4 h-4" />
                  </button>
                  <button className="p-1 hover:text-slate-600 transition-colors">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Preview Chat Body */}
              <div className="flex-1 p-4 overflow-y-auto space-y-4 flex flex-col justify-end">
                
                {/* Message Left */}
                <div className="flex items-end gap-2 max-w-[85%]">
                  <div className="w-6 h-6 rounded-full bg-slate-300 overflow-hidden shrink-0">
                    <img 
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop"
                      alt="User"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className={`px-3.5 py-2.5 rounded-xl text-left ${
                      theme === 'dark' ? 'bg-[#1e293b] text-slate-100' : 'bg-[#e8f1ff] text-slate-800'
                    }`}>
                      <p className={`leading-relaxed ${
                        fontSize === 'small' ? 'text-[10px]' : fontSize === 'medium' ? 'text-xs' : 'text-sm'
                      }`}>
                        Chào mọi người, giao diện mới trông rất tuyệt! Cám giác rất hiện đại và dễ nhìn.
                      </p>
                    </div>
                    <span className="text-[8px] text-slate-400 font-bold block mt-1 ml-1">10:42 AM</span>
                  </div>
                </div>

                {/* Message Right (Self) */}
                <div className="flex flex-col items-end gap-1 self-end max-w-[85%]">
                  <div className="px-3.5 py-2.5 bg-[#0056C6] text-white rounded-xl text-left">
                    <p className={`leading-relaxed ${
                      fontSize === 'small' ? 'text-[10px]' : fontSize === 'medium' ? 'text-xs' : 'text-sm'
                    }`}>
                      Cảm ơn bạn! Bạn có thể tùy chỉnh kích thước chữ ở bên trái để phù hợp nhất với mắt mình nhé.
                    </p>
                  </div>
                  <div className="flex items-center gap-1 mt-1 mr-1">
                    <span className="text-[8px] text-slate-450 font-bold">10:45 AM</span>
                    <span className="text-[8px] text-[#0056C6] font-bold">✓✓</span>
                  </div>
                </div>

              </div>

              {/* Preview Input Box */}
              <div className={`p-3 border-t flex items-center gap-2.5 ${
                theme === 'dark' ? 'bg-[#1e293b] border-slate-800' : 'bg-white border-slate-200'
              }`}>
                {/* Plus circle */}
                <button className="text-slate-400 hover:text-slate-650 transition-colors shrink-0">
                  <Plus className="w-5 h-5" />
                </button>
                
                {/* Input bar */}
                <div className={`flex-1 px-3.5 py-2 rounded-full text-xs flex items-center justify-between border ${
                  theme === 'dark' ? 'bg-[#0f172a] border-slate-700 text-slate-400' : 'bg-slate-50 border-slate-250 text-slate-400'
                }`}>
                  <span>Nhập tin nhắn...</span>
                  <span className="text-[9px] font-bold tracking-wide border border-slate-300 rounded px-1 text-slate-400">GIF</span>
                </div>

                {/* Send button */}
                <button className="text-[#0056C6] hover:text-blue-700 transition-colors shrink-0 flex items-center justify-center">
                  <Send className="w-4 h-4 fill-current rotate-45 transform -translate-y-0.5" />
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>

    </div>
  )
}
