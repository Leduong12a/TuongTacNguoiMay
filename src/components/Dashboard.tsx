import React, { useState } from 'react'
import { Sidebar } from './Sidebar'
import { Menu, X, User } from 'lucide-react'

interface DashboardProps {
  onLogout: () => void
}

export const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<string>('profile')
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false)

  return (
    <div className="flex-1 flex h-screen overflow-hidden bg-white select-none">
      
      {/* Mobile Top Header (hidden on Desktop) */}
      <div className="md:hidden h-14 bg-white border-b border-slate-200 w-full fixed top-0 left-0 right-0 px-4 flex items-center justify-between z-40">
        <button
          onClick={() => setIsMobileSidebarOpen(true)}
          className="p-1.5 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg cursor-pointer"
        >
          <Menu className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#0056C6] rounded-lg flex items-center justify-center text-white shadow-sm">
            <svg
              className="w-4 h-4 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z" />
            </svg>
          </div>
          <span className="text-[17px] font-bold text-[#0056C6]">ChatApp</span>
        </div>
        <div className="w-9 h-9 rounded-xl bg-slate-200 flex items-center justify-center text-slate-500 shadow-inner">
          <User className="w-4.5 h-4.5" />
        </div>
      </div>

      {/* Sidebar - Desktop Layout (Visible on md and up) */}
      <div className="hidden md:flex shrink-0">
        <Sidebar 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
          onLogout={onLogout} 
        />
      </div>

      {/* Sidebar - Mobile Layout (Overlay drawer sliding from left) */}
      <div className={`md:hidden fixed inset-0 z-50 transition-opacity duration-300 ${
        isMobileSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        {/* Backdrop overlay */}
        <div 
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-[1.5px]" 
          onClick={() => setIsMobileSidebarOpen(false)}
        />
        
        {/* Sidebar drawer content */}
        <div className={`absolute top-0 bottom-0 left-0 w-[280px] bg-white transition-transform duration-300 transform shadow-2xl flex flex-col z-50 ${
          isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          {/* Close button for mobile sidebar */}
          <div className="absolute right-4 top-4 z-50">
            <button
              onClick={() => setIsMobileSidebarOpen(false)}
              className="p-1.5 rounded-lg bg-slate-50 text-slate-500 hover:text-slate-700 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <Sidebar 
            activeTab={activeTab} 
            onTabChange={(tab) => {
              setActiveTab(tab)
              setIsMobileSidebarOpen(false)
            }} 
            onLogout={onLogout} 
          />
        </div>
      </div>

      {/* Main content display section (Left empty as requested) */}
      <main className="flex-1 flex flex-col min-w-0 pt-14 md:pt-0 bg-[#F7F9FC] relative">
        <div className="flex-1 flex items-center justify-center text-slate-400 font-semibold text-sm">
          {/* Nội dung tab {activeTab} trống */}
        </div>
      </main>

    </div>
  )
}
