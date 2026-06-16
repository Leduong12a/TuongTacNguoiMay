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
  CheckCheck,
  ChevronUp,
  ChevronDown,
  X,
  FileText,
  Download,
  ArrowLeft
} from 'lucide-react'

interface Message {
  id: string
  senderId: 'me' | 'other'
  senderName: string
  text: string
  time: string
  status?: 'sent' | 'delivered' | 'read'
  attachment?: {
    name: string
    size: string
    type: string
  }
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

const welcomeSlides = [
  {
    title: 'Chào mừng đến với ChatApp!',
    description: 'Khám phá những tiện ích hỗ trợ làm việc và trò chuyện cùng người thân, bè bạn được tối ưu hoá cho máy tính của bạn.',
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=500&auto=format&fit=crop&q=60',
    badge: 'Kết nối nhanh chóng',
    detail: 'Đồng bộ tin nhắn tức thời giữa điện thoại và máy tính của bạn.'
  },
  {
    title: 'Giao diện Dark Mode',
    description: 'Trải nghiệm giao diện tối giúp làm việc ban đêm dễ chịu hơn, bảo vệ thị lực của bạn.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&auto=format&fit=crop&q=60',
    badge: 'Thư giãn & Bảo vệ mắt',
    detail: 'Thư giãn và bảo vệ mắt với chế độ giao diện tối mới trên ChatApp.',
    actionText: 'Thử ngay'
  },
  {
    title: 'Tìm kiếm tin nhắn thông minh',
    description: 'Dễ dàng tìm lại các tin nhắn cũ, tài liệu, tệp tin PDF quan trạng đã chia sẻ.',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=500&auto=format&fit=crop&q=60',
    badge: 'Lọc & Định vị thông minh',
    detail: 'Tự động định vị và highlight từ khóa tìm kiếm trong phòng chat.'
  }
]

export const Chat: React.FC = () => {
  // Mock chat threads list (including group and direct messages)
  const [threads, setThreads] = useState<ChatThread[]>([
    {
      id: 't1',
      name: 'Lê Quý Dương',
      avatar: 'QD',
      avatarBg: 'bg-green-600',
      isGroup: false,
      lastMessage: 'Phiên bản cho chiến dịch thực tế của tôi đã tải lên...',
      time: '15:40',
      unreadCount: 0,
      status: 'online',
      messages: [
        { id: 'm1_1', senderId: 'other', senderName: 'Lê Quý Dương', text: 'Chào anh! Bạn đã có thời gian xem qua văn bản dự thảo Giao diện mà tôi gửi sáng nay chưa?', time: '09:15' },
        { id: 'm1_2', senderId: 'me', senderName: 'Phùng Văn Duy', text: 'Tớ đang xem đây, dự thảo Chương trình của Cộng đồng Học tập thiết kế rất tốt.', time: '09:20' },
        { id: 'm1_3', senderId: 'other', senderName: 'Lê Quý Dương', text: 'Rất vui khi bạn thấy hợp. Tôi cũng đã chuẩn bị một vài phương án thay thế cho phần biểu mẫu đăng ký. Tớ gửi kèm file chứng nhận của dự án, cậu check thử xem nhé!', time: '09:22' },
        { id: 'm1_4', senderId: 'me', senderName: 'Phùng Văn Duy', text: 'Vâng, cảm ơn anh. Tôi sẽ xem qua trước buổi họp lúc 2 giờ chiều. Chúng ta có thể bàn luận về cách chọn font chữ phù hợp nhất ở phần cài đặt nhé!', time: '09:25' },
        { id: 'm1_5', senderId: 'other', senderName: 'Lê Quý Dương', text: 'Phiên bản cho chiến dịch thực tế của tôi đã tải lên folder chung rồi nhé Lê Quý Dương.', time: '15:30' },
        { id: 'm1_6', senderId: 'me', senderName: 'Phùng Văn Duy', text: 'Tớ đang hoàn thiện nốt phần chiến dịch marketing. Chỉ tầm 30 phút nữa là xong.', time: '15:32' },
        { 
          id: 'm1_7', 
          senderId: 'other', 
          senderName: 'Lê Quý Dương', 
          text: 'Phiên bản cho chiến dịch thực tế của tôi đã tải lên folder chung rồi nhé Lê Quý Dương.', 
          time: '15:35',
          attachment: {
            name: 'Technical_Report_V1.pdf',
            size: '2.4 MB',
            type: 'pdf'
          }
        },
        { id: 'm1_8', senderId: 'other', senderName: 'Lê Quý Dương', text: 'Phiên bản cho chiến dịch thực tế của tôi đã tải lên folder chung rồi nhé Lê Quý Dương.', time: '15:40' }
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

  // Initialize activeThreadId to null so the welcoming carousel is shown by default
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [messageText, setMessageText] = useState('')
  const [activeTab, setActiveTab] = useState<'all' | 'unread'>('all')

  // Welcome carousel slide index
  const [currentWelcomeSlide, setCurrentWelcomeSlide] = useState(0)

  // Message search state variables
  const [isSearchingMessages, setIsSearchingMessages] = useState(false)
  const [messageSearchQuery, setMessageSearchQuery] = useState('')
  const [selectedSearchResultIndex, setSelectedSearchResultIndex] = useState(0)
  const [highlightedMessageId, setHighlightedMessageId] = useState<string | null>(null)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messageSearchInputRef = useRef<HTMLInputElement>(null)

  const activeThread = threads.find(t => t.id === activeThreadId)

  // Toggle middle column based on thread selection and message search state
  const shouldShowMiddleColumn = activeThreadId === null || isSearchingMessages

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

  // Focus message search input when search is opened
  useEffect(() => {
    if (isSearchingMessages) {
      messageSearchInputRef.current?.focus()
    }
  }, [isSearchingMessages])

  // Filter threads based on search and tab
  const filteredThreads = threads.filter(thread => {
    const matchesSearch = thread.name.toLowerCase().includes(searchQuery.toLowerCase())
    if (activeTab === 'unread') {
      return matchesSearch && thread.unreadCount > 0
    }
    return matchesSearch
  })

  // Messages matching current search query in the active thread
  const matchingMessages = activeThread && messageSearchQuery.trim()
    ? activeThread.messages.filter(msg => 
        msg.text.toLowerCase().includes(messageSearchQuery.toLowerCase())
      )
    : []

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

  // Handle selecting a search result and scrolling/flashing it
  const handleSelectSearchResult = (index: number) => {
    setSelectedSearchResultIndex(index)
    const targetMsg = matchingMessages[index]
    if (targetMsg) {
      setHighlightedMessageId(targetMsg.id)
      const element = document.getElementById(`message-${targetMsg.id}`)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }
  }

  const handlePrevResult = () => {
    if (matchingMessages.length === 0) return
    const nextIndex = (selectedSearchResultIndex - 1 + matchingMessages.length) % matchingMessages.length
    handleSelectSearchResult(nextIndex)
  }

  const handleNextResult = () => {
    if (matchingMessages.length === 0) return
    const nextIndex = (selectedSearchResultIndex + 1) % matchingMessages.length
    handleSelectSearchResult(nextIndex)
  }

  // Auto clear highlighted message styling after a duration
  useEffect(() => {
    if (highlightedMessageId) {
      const timer = setTimeout(() => {
        setHighlightedMessageId(null)
      }, 2500)
      return () => clearTimeout(timer)
    }
  }, [highlightedMessageId])

  // Helper function to highlight query matches
  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return <span>{text}</span>
    const regex = new RegExp(`(${query.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'gi')
    const parts = text.split(regex)
    return (
      <>
        {parts.map((part, i) => 
          regex.test(part) 
            ? <mark key={i} className="bg-yellow-250 font-bold px-0.5 rounded text-slate-900">{part}</mark>
            : <span key={i}>{part}</span>
        )}
      </>
    )
  }

  // Carousel slide handlers
  const handleNextWelcomeSlide = () => {
    setCurrentWelcomeSlide(prev => (prev + 1) % welcomeSlides.length)
  }

  const handlePrevWelcomeSlide = () => {
    setCurrentWelcomeSlide(prev => (prev - 1 + welcomeSlides.length) % welcomeSlides.length)
  }

  return (
    <div className="flex-1 flex h-full overflow-hidden bg-white select-none">
      
      {/* ======================================================== */}
      {/* COLUMN 1 (MIDDLE): Conversations List OR Search Messages */}
      {/* ======================================================== */}
      {shouldShowMiddleColumn && (
        <div className="w-[350px] shrink-0 bg-white border-r border-slate-200 flex flex-col h-full z-10 transition-all duration-300">
          
          {isSearchingMessages ? (
            /* ================= MESSAGE SEARCH PANEL ================= */
            <>
              {/* Header Section */}
              <div className="px-6 pt-6 pb-4 flex items-center justify-between shrink-0">
                <h2 className="text-[20px] font-bold text-slate-800 tracking-tight">Tìm kiếm tin nhắn</h2>
              </div>

              {/* Message Search input and close action */}
              <div className="px-5 pb-3 border-b border-slate-100 flex flex-col gap-2 shrink-0">
                <div className="flex items-center gap-2">
                  <div className="flex-1 relative flex items-center bg-slate-100/70 border border-transparent rounded-xl p-1 focus-within:bg-white focus-within:border-slate-200 focus-within:shadow-sm transition-all">
                    <div className="pl-3 text-slate-400">
                      <Search className="w-4 h-4" />
                    </div>
                    <input
                      ref={messageSearchInputRef}
                      type="text"
                      value={messageSearchQuery}
                      onChange={(e) => {
                        setMessageSearchQuery(e.target.value)
                        setSelectedSearchResultIndex(0)
                      }}
                      placeholder="Nhập tin nhắn..."
                      className="w-full h-8 px-2 text-[12.5px] bg-transparent border-none outline-none text-slate-800 placeholder-slate-400 focus:ring-0"
                    />
                    {messageSearchQuery.trim() && (
                      <span className="text-[9.5px] font-bold text-slate-500 bg-slate-200/80 px-1.5 py-0.5 rounded mr-1 shrink-0">
                        Tìm thấy {matchingMessages.length}
                      </span>
                    )}
                  </div>
                  
                  {/* Red Close Button */}
                  <button
                    type="button"
                    onClick={() => {
                      setIsSearchingMessages(false)
                      setMessageSearchQuery('')
                      setHighlightedMessageId(null)
                    }}
                    className="flex items-center gap-1 bg-red-50 text-red-500 hover:bg-red-100 px-2.5 py-2 rounded-xl text-[11px] font-bold cursor-pointer transition-colors shrink-0"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Đóng</span>
                  </button>
                </div>

                {/* Navigation buttons */}
                {messageSearchQuery.trim() && matchingMessages.length > 0 && (
                  <div className="flex items-center justify-between text-[11px] text-slate-500 px-1 pt-1">
                    <span>Kết quả {selectedSearchResultIndex + 1}/{matchingMessages.length}</span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={handlePrevResult}
                        className="p-1 hover:bg-slate-150 rounded text-slate-600 cursor-pointer"
                        title="Kết quả trước"
                      >
                        <ChevronUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={handleNextResult}
                        className="p-1 hover:bg-slate-150 rounded text-slate-600 cursor-pointer"
                        title="Kết quả sau"
                      >
                        <ChevronDown className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Search Results list */}
              <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-2">
                {messageSearchQuery.trim() === '' ? (
                  <div className="flex flex-col items-center justify-center text-center py-12 text-slate-400 px-4">
                    <span className="text-[12.5px] font-semibold leading-relaxed">
                      Nhập từ khóa để tìm kiếm tin nhắn trong cuộc hội thoại này
                    </span>
                  </div>
                ) : matchingMessages.length > 0 ? (
                  matchingMessages.map((msg, index) => {
                    const isMe = msg.senderId === 'me'
                    const senderName = isMe ? 'Phùng Văn Duy (Tôi)' : activeThread?.name || 'Người dùng'
                    const avatarBg = isMe ? 'bg-blue-500' : activeThread?.avatarBg || 'bg-slate-400'
                    const avatarText = isMe ? 'VD' : activeThread?.avatar || 'U'
                    const isSelected = index === selectedSearchResultIndex

                    return (
                      <div
                        key={msg.id}
                        onClick={() => handleSelectSearchResult(index)}
                        className={`flex flex-col p-3.5 rounded-xl cursor-pointer transition-all border ${
                          isSelected 
                            ? 'bg-blue-50/50 border-[#0056C6]' 
                            : 'border-transparent hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="flex items-center gap-2">
                            <div className={`w-6 h-6 rounded-full ${avatarBg} text-white font-bold text-[9px] flex items-center justify-center shrink-0`}>
                              {avatarText}
                            </div>
                            <span className="text-[12px] font-bold text-slate-800 truncate max-w-[150px]">
                              {senderName}
                            </span>
                          </div>
                          <span className="text-[10px] text-slate-400 font-semibold">{msg.time}</span>
                        </div>
                        
                        <p className="text-[12.5px] text-slate-600 leading-relaxed pl-8">
                          {highlightText(msg.text, messageSearchQuery)}
                        </p>

                        {msg.attachment && (
                          <div className="mt-2.5 ml-8 bg-slate-50 border border-slate-200 rounded-lg p-2 flex items-center justify-between hover:bg-slate-100 transition-colors">
                            <div className="flex items-center gap-2 overflow-hidden">
                              <FileText className="w-4 h-4 text-red-500 shrink-0" />
                              <div className="flex flex-col overflow-hidden">
                                <span className="text-[10.5px] font-bold text-slate-700 truncate">{msg.attachment.name}</span>
                                <span className="text-[9px] text-slate-400 font-semibold">{msg.attachment.size}</span>
                              </div>
                            </div>
                            <Download className="w-3.5 h-3.5 text-slate-400 hover:text-slate-600 cursor-pointer" />
                          </div>
                        )}
                      </div>
                    )
                  })
                ) : (
                  <div className="flex flex-col items-center justify-center text-center py-12 text-slate-400">
                    <span className="text-xs font-semibold">Không tìm thấy tin nhắn nào</span>
                  </div>
                )}
              </div>
            </>
          ) : (
            /* ================= NORMAL CHAT THREADS PANEL ================= */
            <>
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
                        onClick={() => {
                          setActiveThreadId(thread.id)
                          setIsSearchingMessages(false)
                          setMessageSearchQuery('')
                          setHighlightedMessageId(null)
                        }}
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
                                thread.status === 'online' ? 'bg-green-500' : 'bg-slate-455'
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
            </>
          )}

        </div>
      )}

      {/* ======================================================== */}
      {/* COLUMN 2 (RIGHT): Welcome Carousel OR Message Window     */}
      {/* ======================================================== */}
      <div className="flex-1 flex flex-col h-full bg-[#F8F9FA] relative">
        {activeThread ? (
          <>
            {/* Thread Header */}
            <div className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0 z-10 shadow-sm/50">
              <div className="flex items-center gap-3.5">
                {/* Back button shown when middle column is hidden */}
                {!shouldShowMiddleColumn && (
                  <button
                    type="button"
                    onClick={() => {
                      setActiveThreadId(null)
                      setIsSearchingMessages(false)
                      setMessageSearchQuery('')
                      setHighlightedMessageId(null)
                    }}
                    className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-[#0056C6] cursor-pointer focus:outline-none mr-2 transition-all active:scale-90"
                    title="Quay lại danh sách trò chuyện"
                  >
                    <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
                  </button>
                )}

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

              {/* Header actions (Search input in header + call icons) */}
              <div className="flex items-center gap-4">
                {/* Custom Search Box in Header matching Zalo PC mockup */}
                <div className="relative flex items-center bg-slate-100 border border-transparent rounded-full px-3 py-1.5 focus-within:bg-white focus-within:border-slate-200 w-48 transition-all shrink-0">
                  <Search className="w-3.5 h-3.5 text-slate-400 mr-2" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm tin nhắn..."
                    onClick={() => {
                      setIsSearchingMessages(true)
                    }}
                    value={messageSearchQuery}
                    onChange={(e) => {
                      setIsSearchingMessages(true)
                      setMessageSearchQuery(e.target.value)
                      setSelectedSearchResultIndex(0)
                    }}
                    className="w-full text-[11.5px] bg-transparent border-none outline-none text-slate-800 placeholder-slate-400 p-0 focus:ring-0"
                  />
                  {messageSearchQuery.trim() && (
                    <button 
                      onClick={() => {
                        setMessageSearchQuery('')
                        setHighlightedMessageId(null)
                      }}
                      className="text-slate-400 hover:text-slate-650"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>

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
                        id={`message-${msg.id}`}
                        className={`p-3.5 px-4 text-[14.2px] leading-relaxed shadow-sm/50 transition-all duration-300 ${
                          msg.id === highlightedMessageId
                            ? 'ring-4 ring-yellow-400 ring-offset-2 bg-yellow-100 text-slate-905 border-yellow-350 shadow-md animate-pulse'
                            : isMe 
                              ? 'bg-[#0056C6] text-white rounded-2xl rounded-tr-none' 
                              : 'bg-white border border-slate-150 text-slate-800 rounded-2xl rounded-tl-none'
                        }`}
                      >
                        {messageSearchQuery.trim() && msg.text.toLowerCase().includes(messageSearchQuery.toLowerCase())
                          ? highlightText(msg.text, messageSearchQuery)
                          : msg.text
                        }

                        {/* File Attachment Block */}
                        {msg.attachment && (
                          <div className={`mt-2 bg-slate-50 border border-slate-200 rounded-lg p-2.5 flex items-center justify-between hover:bg-slate-105 transition-colors text-slate-805`}>
                            <div className="flex items-center gap-2.5 overflow-hidden">
                              <FileText className="w-5 h-5 text-red-500 shrink-0" />
                              <div className="flex flex-col overflow-hidden text-left">
                                <span className="text-[12px] font-bold truncate">{msg.attachment.name}</span>
                                <span className="text-[10px] text-slate-400 font-semibold">{msg.attachment.size}</span>
                              </div>
                            </div>
                            <Download className="w-4 h-4 text-slate-400 hover:text-slate-655 cursor-pointer ml-3 shrink-0" />
                          </div>
                        )}
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
                placeholder={`Nhắn tin cho ${activeThread.name}...`}
                className="flex-1 h-10 px-4 border border-slate-250 rounded-full text-[14.2px] text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0056C6] focus:ring-1 focus:ring-[#0056C6] bg-slate-50/50"
              />

              {/* Smiley & Send button */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => alert('Chọn emoji')}
                  className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-455 hover:text-slate-705 cursor-pointer focus:outline-none"
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
          /* ================= WELCOME CAROUSEL (LIGHT & COHESIVE THEME) ================= */
          <div className="flex-1 flex flex-col h-full bg-gradient-to-br from-white to-slate-50/80 text-slate-800 relative items-center justify-center overflow-hidden p-12">
            
            {/* Left slide arrow */}
            <button
              type="button"
              onClick={handlePrevWelcomeSlide}
              className="absolute left-10 top-1/2 transform -translate-y-1/2 w-11 h-11 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 cursor-pointer transition-all z-20 border border-slate-200/50 active:scale-90 shadow-sm"
              title="Slide trước"
            >
              <svg className="w-6 h-6 stroke-current fill-none stroke-[2.5]" viewBox="0 0 24 24">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            {/* Right slide arrow */}
            <button
              type="button"
              onClick={handleNextWelcomeSlide}
              className="absolute right-10 top-1/2 transform -translate-y-1/2 w-11 h-11 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 cursor-pointer transition-all z-20 border border-slate-200/50 active:scale-90 shadow-sm"
              title="Slide sau"
            >
              <svg className="w-6 h-6 stroke-current fill-none stroke-[2.5]" viewBox="0 0 24 24">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>

            {/* Active Slide content wrapper */}
            <div className="max-w-md w-full flex flex-col items-center text-center px-4 transition-all duration-300">
              <h2 className="text-[21px] font-bold text-slate-800 tracking-tight mb-2.5">
                {welcomeSlides[currentWelcomeSlide].title}
              </h2>
              
              <p className="text-[12.8px] text-slate-500 leading-relaxed max-w-sm mb-9">
                {welcomeSlides[currentWelcomeSlide].description}
              </p>

              {/* Slider Image Illustration box */}
              <div className="relative w-80 h-48 rounded-xl overflow-hidden shadow-md border border-slate-200 mb-8 bg-slate-100 flex items-center justify-center select-none group">
                <img 
                  src={welcomeSlides[currentWelcomeSlide].image} 
                  alt="Slide illustration" 
                  className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Visual accent for dark mode slide */}
                {currentWelcomeSlide === 1 && (
                  <div className="absolute inset-0 bg-slate-950/20 flex items-center justify-center">
                    <span className="w-14 h-14 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-yellow-500 border border-slate-250 text-2xl shadow-md animate-pulse">
                      🌙
                    </span>
                  </div>
                )}
              </div>

              {/* Tag / Badge */}
              <span className="text-[13px] font-bold text-[#0056C6] tracking-wide block mb-1.5">
                {welcomeSlides[currentWelcomeSlide].badge}
              </span>

              {/* Detail sub-bullet */}
              <p className="text-[11.8px] text-slate-450 leading-relaxed mb-8 max-w-[280px]">
                {welcomeSlides[currentWelcomeSlide].detail}
              </p>

              {/* Optional Call to Action Button */}
              {welcomeSlides[currentWelcomeSlide].actionText && (
                <button
                  type="button"
                  onClick={() => alert('Đã áp dụng cài đặt giao diện tối!')}
                  className="bg-[#0056C6] hover:bg-[#0047A5] text-white font-bold text-xs px-6 py-2.5 rounded-lg transition-colors cursor-pointer shadow-sm active:scale-95 focus:outline-none"
                >
                  {welcomeSlides[currentWelcomeSlide].actionText}
                </button>
              )}

            </div>

            {/* Dots navigation indicator */}
            <div className="absolute bottom-12 flex gap-2.5 z-20">
              {welcomeSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentWelcomeSlide(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === currentWelcomeSlide 
                      ? 'bg-[#0056C6] w-5' 
                      : 'bg-slate-200 hover:bg-slate-350 w-1.5'
                  }`}
                  title={`Tới slide ${idx + 1}`}
                />
              ))}
            </div>

          </div>
        )}
      </div>

    </div>
  )
}

export default Chat
