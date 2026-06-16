import React from 'react'
import { MessageSquare, Users, User, Phone, Search, Settings, LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface SidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
  onLogout: () => void
  onProfileClick?: () => void
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  onLogout,
  onProfileClick,
}) => {
  const navigate = useNavigate()
  
  const menuItems = [
    { id: 'chat', label: 'Trò chuyện', icon: MessageSquare },
    { id: 'contacts', label: 'Danh bạ', icon: Users },
    { id: 'profile', label: 'Hồ sơ', icon: User },
    { id: 'calls', label: 'Gọi điện', icon: Phone },
    { id: 'search', label: 'Tìm Kiếm', icon: Search },
    { id: 'settings', label: 'Cài đặt', icon: Settings },
  ]

  const handleMenuClick = (id: string) => {
    if (id === 'profile') {
      navigate('/profile')
    } else if (id === 'chat') {
      navigate('/dashboard')
    } else {
      onTabChange(id)
    }
  }

  const getActiveTab = () => {
    if (activeTab === 'chat') return 'chat'
    if (activeTab === 'messages') return 'chat'
    return activeTab
  }

  return (
    <aside className="w-[280px] h-screen bg-[#F8F9FA] border-r border-slate-200 flex flex-col justify-between select-none">
      
      {/* Upper section */}
      <div className="flex flex-col">
        {/* Logo and Application name */}
        <div className="flex items-center gap-3 px-6 py-6 mb-4">
          <div className="w-10 h-10 bg-[#0056C6] rounded-xl flex items-center justify-center text-white shadow-sm">
            <svg
              className="w-5 h-5 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z" />
              <rect x="6" y="7" width="12" height="2" rx="1" fill="#0056C6" />
              <rect x="6" y="11" width="12" height="2" rx="1" fill="#0056C6" />
            </svg>
          </div>
          <span className="text-[20px] font-bold text-[#0056C6] tracking-tight">
            Messenger
          </span>
        </div>

        {/* Sidebar Menu items */}
        <nav className="flex flex-col">
          {menuItems.map((item) => {
            const Icon = item.icon
            const currentActiveTab = getActiveTab()
            const isActive = currentActiveTab === item.id

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleMenuClick(item.id)}
                className={`flex items-center gap-3.5 px-6 py-3 w-full text-left text-[15px] font-semibold transition-all duration-200 relative cursor-pointer group focus:outline-none ${
                  isActive
                    ? 'bg-[#E8F1FF] text-[#0056C6] after:content-[\'\'] after:absolute after:right-0 after:top-0 after:bottom-0 after:w-[3.5px] after:bg-[#0056C6]'
                    : 'text-[#4A5568] hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Icon
                  className={`w-5 h-5 transition-colors duration-200 ${
                    isActive ? 'text-[#0056C6]' : 'text-slate-500 group-hover:text-slate-800'
                  }`}
                />
                <span>{item.label}</span>
              </button>
            )
          })}
        </nav>
      </div>

      {/* Footer User Profile section */}
      <div className="flex flex-col">
        {/* Logout button */}
        <button
          type="button"
          onClick={onLogout}
          className="flex items-center gap-3.5 px-6 py-3.5 text-left text-[14px] font-semibold text-red-500 hover:bg-red-50 transition-colors duration-200 cursor-pointer focus:outline-none border-t border-slate-200/50"
        >
          <LogOut className="w-5 h-5 text-red-500" />
          <span>Đăng xuất</span>
        </button>

        {/* Profile Details */}
        <div 
          onClick={onProfileClick}
          className="border-t border-slate-200 p-5 flex items-center gap-3 bg-slate-50/50 hover:bg-slate-100/70 active:bg-slate-200/50 transition-colors duration-150 cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-slate-200 flex items-center justify-center relative text-slate-500 shadow-inner transition-transform duration-150 active:scale-95">
            <User className="w-5 h-5" />
            <span className="absolute bottom-[-1.5px] right-[-1.5px] block h-3 w-3 rounded-full ring-[2px] ring-white bg-slate-400" />
          </div>
          <div className="flex flex-col items-start leading-tight">
            <span className="text-[14.5px] font-bold text-slate-800">
              Phùng Văn Duy
            </span>
            <span className="text-[10px] font-bold text-slate-400 tracking-wider mt-0.5 uppercase">
              Ngoại tuyến
            </span>
          </div>
        </div>
      </div>

    </aside>
  )
}
