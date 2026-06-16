import React, { useState } from 'react'
import { Sidebar } from './Sidebar'
import { Menu, X, User, Camera, Edit3 } from 'lucide-react'
import { CreateStory } from './story/CreateStory'
import { CreatePost } from './post/CreatePost'
import { SearchFriend } from './SearchFriend'
import { Contacts } from './Contacts'
import { Chat } from './Chat'
import { Calls } from './Calls'

interface DashboardProps {
  onLogout: () => void
}

export const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<string>('profile')
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false)
  const [isCreateStoryOpen, setIsCreateStoryOpen] = useState<boolean>(false)
  const [isCreatePostOpen, setIsCreatePostOpen] = useState<boolean>(false)


  return (
    <div className="flex-1 flex h-screen overflow-hidden bg-white select-none relative">
      
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
          <span className="text-[17px] font-bold text-[#0056C6]">Messenger</span>
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
          onProfileClick={() => setIsCreateModalOpen(true)}
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
            onProfileClick={() => setIsCreateModalOpen(true)}
          />
        </div>
      </div>

      {/* Main content display section */}
      <main className="flex-1 flex flex-col min-w-0 pt-14 md:pt-0 bg-[#F7F9FC] relative overflow-hidden">
        {activeTab === 'chat' ? (
          <Chat />
        ) : activeTab === 'contacts' ? (
          <Contacts />
        ) : activeTab === 'calls' ? (
          <Calls />
        ) : activeTab === 'search' ? (
          <SearchFriend />
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-400 font-semibold text-sm">
            <span className="text-[16px] text-slate-400 font-bold uppercase tracking-wider mb-2">
              Tab {activeTab === 'profile' ? 'Hồ sơ' : 'Cài đặt'}
            </span>
            <span className="text-[13px] text-slate-400 font-medium">
              Nội dung của tab đang được phát triển...
            </span>
          </div>
        )}
      </main>

      {/* Create Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop overlay */}
          <div 
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-[1.5px] transition-opacity duration-300"
            onClick={() => setIsCreateModalOpen(false)}
          />
          
          {/* Modal Content */}
          <div className="relative bg-white rounded-2xl p-7 max-w-[420px] w-full mx-4 shadow-2xl border border-slate-100/80 z-50 transform transition-all duration-300 scale-100 flex flex-col">
            <h3 className="text-[17px] font-bold text-slate-800 mb-6">Tạo mới</h3>
            
            {/* Grid options */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              
              {/* Option 1: Tạo tin */}
              <button
                onClick={() => {
                  setIsCreateModalOpen(false);
                  setIsCreateStoryOpen(true);
                }}
                className="bg-slate-50/70 border border-slate-150 hover:bg-slate-100/70 hover:border-slate-200/80 rounded-xl p-6 flex flex-col items-center justify-center gap-3 transition-all duration-200 cursor-pointer group active:scale-95 select-none focus:outline-none"
              >
                <div className="w-12 h-12 rounded-full bg-blue-50/70 text-[#0056C6] flex items-center justify-center transition-colors group-hover:bg-blue-100">
                  <Camera className="w-5.5 h-5.5" />
                </div>
                <span className="text-[14px] font-bold text-slate-700">Tạo tin</span>
              </button>

              {/* Option 2: Tạo bài viết */}
              <button
                onClick={() => {
                  setIsCreateModalOpen(false);
                  setIsCreatePostOpen(true);
                }}
                className="bg-slate-50/70 border border-slate-150 hover:bg-slate-100/70 hover:border-slate-200/80 rounded-xl p-6 flex flex-col items-center justify-center gap-3 transition-all duration-200 cursor-pointer group active:scale-95 select-none focus:outline-none"
              >
                <div className="w-12 h-12 rounded-full bg-blue-50/70 text-[#0056C6] flex items-center justify-center transition-colors group-hover:bg-blue-100">
                  <Edit3 className="w-5.5 h-5.5" />
                </div>
                <span className="text-[14px] font-bold text-slate-700">Tạo bài viết</span>
              </button>

            </div>

            {/* Close action */}
            <button
              onClick={() => setIsCreateModalOpen(false)}
              className="text-[14px] font-bold text-slate-400 hover:text-slate-600 transition-colors duration-150 cursor-pointer text-center pt-2 focus:outline-none"
            >
              Đóng
            </button>
          </div>
        </div>
      )}

      {/* CreateStory Modal Overlay */}
      {isCreateStoryOpen && (
        <CreateStory
          onClose={() => setIsCreateStoryOpen(false)}
          onShare={(storyData) => {
            alert('Đã chia sẻ tin của bạn thành công!');
            console.log('Story Shared Data:', storyData);
            setIsCreateStoryOpen(false);
          }}
        />
      )}

      {/* CreatePost Modal Overlay */}
      {isCreatePostOpen && (
        <CreatePost
          onClose={() => setIsCreatePostOpen(false)}
          onPublish={(postData) => {
            alert('Đã đăng bài viết thành công!');
            console.log('Post Published Data:', postData);
            setIsCreatePostOpen(false);
          }}
        />
      )}

    </div>
  )
}
