import React from 'react'
import { MessageSquare, Users, User, Phone, Search, Settings, LogOut, PanelLeft, PanelRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'

interface SidebarProps {
  activeTab: string
  onLogout: () => void
  onProfileClick?: () => void
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onLogout,
  onProfileClick,
}) => {
  const navigate = useNavigate()
  const { toggleSidebar, state } = useSidebar()
  const isCollapsed = state === 'collapsed'
  
  const menuItems = [
    { id: 'chat', label: 'Trò chuyện', icon: MessageSquare },
    { id: 'contacts', label: 'Danh bạ', icon: Users },
    { id: 'profile', label: 'Hồ sơ', icon: User },
    { id: 'calls', label: 'Gọi điện', icon: Phone },
    { id: 'search', label: 'Tìm Kiếm', icon: Search },
    { id: 'settings', label: 'Cài đặt', icon: Settings },
  ]

  const handleMenuClick = (id: string) => {
    navigate(`/${id}`)
  }

  const getActiveTab = () => {
    if (activeTab === 'chat' || activeTab === 'messages') return 'chat'
    return activeTab
  }

  return (
    <ShadcnSidebar collapsible="icon" className="border-r border-slate-200 bg-[#F8F9FA]">
      {/* Header with App Logo and Collapse Trigger */}
      <SidebarHeader className="border-b border-slate-200/50">
        <div className={cn(
          "flex items-center p-2",
          isCollapsed ? "justify-center" : "justify-between"
        )}>
          {!isCollapsed && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#0056C6] rounded-xl flex items-center justify-center text-white shadow-sm shrink-0">
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
              <span className="text-[20px] font-bold text-[#0056C6] tracking-tight whitespace-nowrap">
                ChatApp
              </span>
            </div>
          )}
          
          {/* Custom Collapse Button */}
          <button
            type="button"
            onClick={toggleSidebar}
            className={cn(
              "p-1 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-slate-700 cursor-pointer focus:outline-none transition-all flex items-center justify-center",
              isCollapsed ? "w-6 h-6" : "w-7 h-7"
            )}
            title={isCollapsed ? "Mở rộng" : "Thu gọn"}
          >
            {isCollapsed ? <PanelRight className="w-4 h-4" /> : <PanelLeft className="w-4 h-4" />}
          </button>
        </div>
      </SidebarHeader>

      {/* Content containing Nav Links */}
      <SidebarContent className="py-4">
        <SidebarMenu className="px-2 gap-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon
            const currentActiveTab = getActiveTab()
            const isActive = currentActiveTab === item.id

            return (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton
                  tooltip={item.label}
                  isActive={isActive}
                  onClick={() => handleMenuClick(item.id)}
                  className={cn(
                    "flex items-center gap-3.5 rounded-lg text-left text-[15px] font-semibold transition-all duration-200 cursor-pointer group focus:outline-none",
                    isCollapsed ? "justify-center p-0 size-9 mx-auto" : "px-3 py-5 w-full",
                    isActive
                      ? 'bg-[#E8F1FF] text-[#0056C6]'
                      : 'text-[#4A5568] hover:bg-slate-100 hover:text-slate-900'
                  )}
                >
                  <Icon
                    className={cn(
                      "transition-colors duration-200 shrink-0",
                      isCollapsed ? "w-4.5 h-4.5" : "w-5 h-5",
                      isActive ? 'text-[#0056C6]' : 'text-slate-500 group-hover:text-slate-800'
                    )}
                  />
                  {!isCollapsed && <span>{item.label}</span>}
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarContent>

      {/* Footer with User profile and Popover logout */}
      <SidebarFooter className="border-t border-slate-200/50 p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="relative group/profile">
              {/* Logout popover */}
              <div className="absolute bottom-full left-0 right-0 bg-white border border-slate-200 rounded-lg mb-1 shadow-lg scale-y-0 group-hover/profile:scale-y-100 origin-bottom transition-all duration-200 z-30">
                <button
                  type="button"
                  onClick={onLogout}
                  className={cn(
                    "flex items-center text-red-500 hover:bg-red-50 transition-colors duration-200 cursor-pointer rounded-lg focus:outline-none",
                    isCollapsed ? "justify-center p-2 w-9 h-9 mx-auto" : "gap-3 px-4 py-3 w-full text-left text-[14px] font-semibold"
                  )}
                  title={isCollapsed ? "Đăng xuất" : undefined}
                >
                  <LogOut className="w-5 h-5 text-red-500 shrink-0" />
                  {!isCollapsed && <span>Đăng xuất</span>}
                </button>
              </div>

              {/* Profile Card */}
              <div
                onClick={onProfileClick}
                className={cn(
                  "flex items-center gap-3 hover:bg-slate-100 rounded-xl transition-all duration-150 cursor-pointer p-2",
                  isCollapsed ? "justify-center" : "justify-start"
                )}
                title={isCollapsed ? "Phùng Văn Duy" : undefined}
              >
                <div className="w-9 h-9 rounded-xl bg-slate-200 flex items-center justify-center relative text-slate-500 shadow-inner shrink-0">
                  <User className="w-4.5 h-4.5" />
                  <span className="absolute bottom-[-1px] right-[-1px] block h-2.5 w-2.5 rounded-full ring-[1.5px] ring-white bg-green-500" />
                </div>
                {!isCollapsed && (
                  <div className="flex flex-col items-start leading-tight overflow-hidden">
                    <span className="text-[14px] font-bold text-slate-800 truncate max-w-[130px]">
                      Phùng Văn Duy
                    </span>
                    <span className="text-[9px] font-bold text-green-500 tracking-wider mt-0.5 uppercase">
                      Đang hoạt động
                    </span>
                  </div>
                )}
              </div>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </ShadcnSidebar>
  )
}
