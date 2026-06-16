import React, { useState, useRef, useEffect } from 'react'
import { 
  Search, 
  Phone, 
  Video, 
  Info, 
  Send, 
  Smile, 
  Paperclip, 
  Image as ImageIcon,
  Plus,
  CheckCheck
} from 'lucide-react'

interface Message {
  id: string
  senderId: 'me' | 'other'
  senderName: string
  text: string
  time: string
  status?: 'sent' | 'delivered' | 'read'
}

interface ChatThread {
  id: string
  name: string
  avatar: string
  avatarBg: string
  isGroup: boolean
  lastMessage: string
  time: string
  unreadCount: number
  status: 'online' | 'offline' | string
  messages: Message[]
}

export const Chat: React.FC = () => {
  // Mock chat threads list (including group and direct messages)
  const [threads, setThreads] = useState<ChatThread[]>([
    {
      id: 't1',
      name: 'Trần Thị Mai',
      avatar: 'TM',
      avatarBg: 'bg-purple-500',
      isGroup: false,
      lastMessage: 'Cậu làm xong bài tập chưa? 📝',
      time: '10:42',
      unreadCount: 2,
      status: 'online',
      messages: [
        { id: 'm1_1', senderId: 'other', senderName: 'Trần Thị Mai', text: 'Chào cậu! Cậu đang làm gì đấy?', time: '09:15' },
        { id: 'm1_2', senderId: 'me', senderName: 'Phùng Văn Duy', text: 'Chào Mai, tớ đang code dự án môn học.', time: '09:20' },
        { id: 'm1_3', senderId: 'other', senderName: 'Trần Thị Mai', text: 'À thế hả, dự án Thiết kế giao diện à?', time: '09:22' },
        { id: 'm1_4', senderId: 'me', senderName: 'Phùng Văn Duy', text: 'Đúng rồi cậu, sắp xong phần giao diện trò chuyện rồi.', time: '09:25' },
        { id: 'm1_5', senderId: 'other', senderName: 'Trần Thị Mai', text: 'Cậu làm xong bài tập chưa? 📝', time: '10:42' }
      ]
    },
    {
      id: 't2',
      name: 'Phạm Minh Tuấn',
      avatar: 'MT',
      avatarBg: 'bg-amber-500',
      isGroup: false,
      lastMessage: 'Tối nay 8h họp nhóm nhé cậu!',
      time: '09:15',
      unreadCount: 0,
      status: 'offline',
      messages: [
        { id: 'm2_1', senderId: 'me', senderName: 'Phùng Văn Duy', text: 'Tuấn ơi, tài liệu hôm trước cậu gửi ở đâu thế?', time: '08:30' },
        { id: 'm2_2', senderId: 'other', senderName: 'Phạm Minh Tuấn', text: 'Tớ gửi trong Driver nhóm ấy, cậu check thử đi.', time: '08:35' },
        { id: 'm2_3', senderId: 'me', senderName: 'Phùng Văn Duy', text: 'Ok tớ thấy rồi, cảm ơn cậu.', time: '08:37' },
        { id: 'm2_4', senderId: 'other', senderName: 'Phạm Minh Tuấn', text: 'Tối nay 8h họp nhóm nhé cậu!', time: '09:15' }
      ]
    },
    {
      id: 't3',
      name: 'Nhóm Học Tập UI/UX 🎨',
      avatar: 'UI',
      avatarBg: 'bg-gradient-to-tr from-pink-500 to-indigo-600',
      isGroup: true,
      lastMessage: 'Đỗ Đình An: Tớ vừa cập nhật file figma mới nhất',
      time: 'Hôm qua',
      unreadCount: 0,
      status: '6 thành viên',
      messages: [
        { id: 'm3_1', senderId: 'other', senderName: 'Lại Anh Đào', text: 'Mọi người đã chuẩn bị slide báo cáo chưa?', time: 'Hôm qua 14:10' },
        { id: 'm3_2', senderId: 'other', senderName: 'Phạm Ngọc Hách', text: 'Tớ đang viết nội dung phần 1 và phần 2 rồi.', time: 'Hôm qua 14:15' },
        { id: 'm3_3', senderId: 'me', senderName: 'Phùng Văn Duy', text: 'Phần code demo tớ cũng hòm hòm rồi nhé.', time: 'Hôm qua 14:20' },
        { id: 'm3_4', senderId: 'other', senderName: 'Đỗ Đình An', text: 'Tớ vừa cập nhật file figma mới nhất', time: 'Hôm qua 15:30' }
      ]
    },
    {
      id: 't4',
      name: 'Đỗ Đình An',
      avatar: 'DA',
      avatarBg: 'bg-indigo-500',
      isGroup: false,
      lastMessage: 'Mai đi cafe không ông?',
      time: 'Hôm qua',
      unreadCount: 0,
      status: 'online',
      messages: [
        { id: 'm4_1', senderId: 'other', senderName: 'Đỗ Đình An', text: 'Mai đi cafe không ông?', time: 'Hôm qua 18:22' }
      ]
    }
  ])

  const [activeThreadId, setActiveThreadId] = useState<string>('t1')
  const [searchQuery, setSearchQuery] = useState('')
  const [messageText, setMessageText] = useState('')
  const [activeTab, setActiveTab] = useState<'all' | 'unread'>('all')

  const messagesEndRef = useRef<HTMLDivElement>(null)

  const activeThread = threads.find(t => t.id === activeThreadId)

  // Scroll to bottom when messages change or thread changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    
    // Mark as read when opening thread
    if (activeThread && activeThread.unreadCount > 0) {
      setThreads(prev => prev.map(t => 
        t.id === activeThreadId ? { ...t, unreadCount: 0 } : t
      ))
    }
  }, [activeThreadId, activeThread?.messages.length])

  // Filter threads based on search and tab
  const filteredThreads = threads.filter(thread => {
    const matchesSearch = thread.name.toLowerCase().includes(searchQuery.toLowerCase())
    if (activeTab === 'unread') {
      return matchesSearch && thread.unreadCount > 0
    }
    return matchesSearch
  })

  // Handle Send Message
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!messageText.trim() || !activeThread) return

    const now = new Date()
    const timeString = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0')

    const newMessage: Message = {
      id: `m_new_${Date.now()}`,
      senderId: 'me',
      senderName: 'Phùng Văn Duy',
      text: messageText,
      time: timeString,
      status: 'read'
    }

    setThreads(prev => prev.map(t => {
      if (t.id === activeThreadId) {
        return {
          ...t,
          lastMessage: messageText,
          time: timeString,
          messages: [...t.messages, newMessage]
        }
      }
      return t
    }))

    setMessageText('')
  }

  return (
    <div className="flex-1 flex h-full overflow-hidden bg-white select-none">
      
      {/* ======================================================== */}
      {/* COLUMN 1 (MIDDLE): Conversations List                    */}
      {/* ======================================================== */}
      <div className="w-[350px] shrink-0 bg-white border-r border-slate-200 flex flex-col h-full z-10">
        
        {/* Header Section */}
        <div className="px-6 pt-6 pb-4 flex items-center justify-between">
          <h2 className="text-[22px] font-bold text-slate-800 tracking-tight">Trò chuyện</h2>
          <button 
            onClick={() => alert('Tạo cuộc trò chuyện mới')}
            className="w-9 h-9 rounded-full hover:bg-slate-100 flex items-center justify-center text-[#0056C6] cursor-pointer transition-colors focus:outline-none"
            title="Tạo cuộc hội thoại mới"
          >
            <Plus className="w-5.5 h-5.5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="px-5 pb-3">
          <div className="relative flex items-center bg-slate-100/70 border border-transparent rounded-xl p-1 focus-within:bg-white focus-within:border-slate-200 focus-within:shadow-sm transition-all">
            <div className="pl-3 text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm cuộc trò chuyện"
              className="w-full h-9 px-2 text-[14px] bg-transparent border-none outline-none text-slate-800 placeholder-slate-450 focus:ring-0"
            />
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="px-5 pb-3 flex gap-2 border-b border-slate-100 shrink-0">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-1.5 rounded-full text-[13px] font-bold cursor-pointer transition-all ${
              activeTab === 'all' 
                ? 'bg-[#E8F1FF] text-[#0056C6]' 
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
            }`}
          >
            Tất cả
          </button>
          <button
            onClick={() => setActiveTab('unread')}
            className={`px-4 py-1.5 rounded-full text-[13px] font-bold cursor-pointer transition-all flex items-center gap-1.5 ${
              activeTab === 'unread' 
                ? 'bg-[#E8F1FF] text-[#0056C6]' 
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
            }`}
          >
            Chưa đọc
            {threads.filter(t => t.unreadCount > 0).length > 0 && (
              <span className="w-4.5 h-4.5 rounded-full bg-red-500 text-white text-[9.5px] font-extrabold flex items-center justify-center">
                {threads.filter(t => t.unreadCount > 0).length}
              </span>
            )}
          </button>
        </div>

        {/* Threads List */}
        <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-1.5">
          {filteredThreads.length > 0 ? (
            filteredThreads.map(thread => {
              const isActive = thread.id === activeThreadId
              return (
                <div
                  key={thread.id}
                  onClick={() => setActiveThreadId(thread.id)}
                  className={`flex items-center justify-between p-3.5 rounded-2xl cursor-pointer transition-all duration-200 select-none ${
                    isActive 
                      ? 'bg-[#E8F1FF]/60 hover:bg-[#E8F1FF]/80' 
                      : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3.5 overflow-hidden">
                    {/* Avatar */}
                    <div className={`w-12 h-12 rounded-xl ${thread.avatarBg} text-white font-bold text-[15px] flex items-center justify-center relative shadow-sm shrink-0`}>
                      {thread.avatar}
                      {!thread.isGroup && (
                        <span className={`absolute bottom-[-1.5px] right-[-1.5px] block h-3 w-3 rounded-full ring-[2px] ring-white ${
                          thread.status === 'online' ? 'bg-green-500' : 'bg-slate-450'
                        }`} />
                      )}
                    </div>

                    {/* Meta info */}
                    <div className="flex flex-col overflow-hidden">
                      <span className={`text-[14.5px] font-bold text-slate-800 truncate ${thread.unreadCount > 0 ? 'text-black' : ''}`}>
                        {thread.name}
                      </span>
                      <span className={`text-[12.2px] truncate mt-1 ${
                        thread.unreadCount > 0 ? 'text-[#0056C6] font-bold' : 'text-slate-450'
                      }`}>
                        {thread.lastMessage}
                      </span>
                    </div>
                  </div>

                  {/* Badge & Time */}
                  <div className="flex flex-col items-end gap-1.5 shrink-0 ml-2">
                    <span className="text-[10.5px] font-semibold text-slate-400">
                      {thread.time}
                    </span>
                    {thread.unreadCount > 0 && (
                      <span className="w-5.5 h-5.5 rounded-full bg-[#0056C6] text-white text-[11px] font-extrabold flex items-center justify-center shadow-sm">
                        {thread.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              )
            })
          ) : (
            <div className="flex flex-col items-center justify-center text-center py-12 text-slate-400">
              <span className="text-sm font-semibold">Không tìm thấy cuộc hội thoại</span>
            </div>
          )}
        </div>

      </div>

      {/* ======================================================== */}
      {/* COLUMN 2 (RIGHT): Message Window                         */}
      {/* ======================================================== */}
      <div className="flex-1 flex flex-col h-full bg-[#F8F9FA] relative">
        {activeThread ? (
          <>
            {/* Thread Header */}
            <div className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0 z-10 shadow-sm/50">
              <div className="flex items-center gap-3.5">
                <div className={`w-10.5 h-10.5 rounded-xl ${activeThread.avatarBg} text-white font-bold text-[14.5px] flex items-center justify-center shadow-sm shrink-0`}>
                  {activeThread.avatar}
                </div>
                <div className="flex flex-col">
                  <span className="text-[14.8px] font-extrabold text-slate-800">{activeThread.name}</span>
                  <span className="text-[11.2px] text-slate-450 font-bold mt-0.5">
                    {activeThread.isGroup ? activeThread.status : (activeThread.status === 'online' ? 'Đang hoạt động' : 'Ngoại tuyến')}
                  </span>
                </div>
              </div>

              {/* Header actions */}
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => alert(`Gọi điện thoại cho ${activeThread.name}`)}
                  className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-800 cursor-pointer focus:outline-none"
                  title="Bắt đầu cuộc gọi thoại"
                >
                  <Phone className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => alert(`Gọi video cho ${activeThread.name}`)}
                  className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-800 cursor-pointer focus:outline-none"
                  title="Bắt đầu cuộc gọi video"
                >
                  <Video className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => alert(`Xem chi tiết thông tin hội thoại`)}
                  className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-800 cursor-pointer focus:outline-none"
                  title="Thông tin chi tiết"
                >
                  <Info className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages Feed */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
              {activeThread.messages.map((msg, index) => {
                const isMe = msg.senderId === 'me'
                const showSenderName = activeThread.isGroup && !isMe

                return (
                  <div 
                    key={msg.id || index}
                    className={`flex flex-col max-w-[70%] ${
                      isMe ? 'self-end items-end' : 'self-start items-start'
                    }`}
                  >
                    {/* Group Chat Sender Name */}
                    {showSenderName && (
                      <span className="text-[11px] font-extrabold text-slate-400 mb-1 pl-1">
                        {msg.senderName}
                      </span>
                    )}

                    {/* Chat Bubble Container */}
                    <div className="flex items-end gap-2 group">
                      {/* Message Bubble */}
                      <div 
                        className={`p-3.5 px-4 text-[14.2px] leading-relaxed shadow-sm/50 ${
                          isMe 
                            ? 'bg-[#0056C6] text-white rounded-2xl rounded-tr-none' 
                            : 'bg-white border border-slate-150 text-slate-800 rounded-2xl rounded-tl-none'
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>

                    {/* Time & Read Status */}
                    <div className="flex items-center gap-1 mt-1 px-1.5 text-slate-400 font-semibold text-[10px]">
                      <span>{msg.time}</span>
                      {isMe && (
                        <span>
                          <CheckCheck className="w-3.5 h-3.5 text-blue-500" />
                        </span>
                      )}
                    </div>

                  </div>
                )
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <form 
              onSubmit={handleSendMessage}
              className="bg-white border-t border-slate-200 px-6 py-4 flex items-center gap-4.5 shrink-0 z-10"
            >
              {/* Attachments buttons */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => alert('Chọn tệp đính kèm')}
                  className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-450 hover:text-slate-700 cursor-pointer focus:outline-none"
                  title="Đính kèm tệp"
                >
                  <Paperclip className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => alert('Chọn ảnh đính kèm')}
                  className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-450 hover:text-slate-700 cursor-pointer focus:outline-none"
                  title="Đính kèm ảnh"
                >
                  <ImageIcon className="w-5 h-5" />
                </button>
              </div>

              {/* Text Input */}
              <input
                type="text"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Nhập tin nhắn..."
                className="flex-1 h-10 px-4 border border-slate-250 rounded-full text-[14.2px] text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0056C6] focus:ring-1 focus:ring-[#0056C6] bg-slate-50/50"
              />

              {/* Smiley & Send button */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => alert('Chọn emoji')}
                  className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-450 hover:text-slate-700 cursor-pointer focus:outline-none"
                  title="Emoji"
                >
                  <Smile className="w-5 h-5" />
                </button>
                <button
                  type="submit"
                  disabled={!messageText.trim()}
                  className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-all focus:outline-none active:scale-95 ${
                    messageText.trim()
                      ? 'bg-[#0056C6] hover:bg-[#0047A5] text-white cursor-pointer'
                      : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  }`}
                  title="Gửi tin nhắn"
                >
                  <Send className="w-4 h-4 text-inherit" />
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8 text-slate-400">
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-slate-350 shadow-sm border border-slate-150 mb-4 animate-scaleUp">
              <MessageSquare className="w-7 h-7" />
            </div>
            <h4 className="text-[15.5px] font-bold text-slate-700">Chọn cuộc trò chuyện</h4>
            <p className="text-[12.8px] text-slate-450 mt-1 max-w-[280px]">
              Nhấp vào cuộc hội thoại bất kỳ ở danh sách bên trái để bắt đầu trò chuyện.
            </p>
          </div>
        )}
      </div>

    </div>
  )
}
