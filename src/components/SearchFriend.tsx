import React, { useState } from 'react'
import { 
  Search, 
  UserPlus, 
  UserMinus, 
  UserCheck, 
  MessageSquare, 
  MoreVertical, 
  Check, 
  X, 
  Ban, 
  UserX,
  Sparkles
} from 'lucide-react'

// Define the friendship status types
type FriendStatus = 'none' | 'sent' | 'received' | 'friends' | 'blocked'

interface UserItem {
  id: string
  name: string
  phone: string
  avatar: string
  avatarBg: string
  mutualFriends: number
  status: FriendStatus
  bio?: string
}

export const SearchFriend: React.FC = () => {
  // Mock users list representing different friendship states
  const [users, setUsers] = useState<UserItem[]>([
    {
      id: '1',
      name: 'Lê Hải Đăng',
      phone: '0987654321',
      avatar: 'HD',
      avatarBg: 'bg-emerald-500',
      mutualFriends: 3,
      status: 'none',
      bio: 'Lập trình viên đam mê React & Node.js'
    },
    {
      id: '2',
      name: 'Nguyễn Hoàng Nam',
      phone: '0912345678',
      avatar: 'HN',
      avatarBg: 'bg-blue-500',
      mutualFriends: 1,
      status: 'sent',
      bio: 'Thích đi du lịch và chụp ảnh 📸'
    },
    {
      id: '3',
      name: 'Trần Thị Mai',
      phone: '0905556677',
      avatar: 'TM',
      avatarBg: 'bg-purple-500',
      mutualFriends: 0,
      status: 'received',
      bio: 'Học thiết kế đồ họa tại Mỹ thuật Công nghiệp'
    },
    {
      id: '4',
      name: 'Phạm Minh Tuấn',
      phone: '0933445566',
      avatar: 'MT',
      avatarBg: 'bg-amber-500',
      mutualFriends: 5,
      status: 'friends',
      bio: 'Co-founder of a tech startup'
    },
    {
      id: '5',
      name: 'Đỗ Thanh Sơn',
      phone: '0944556677',
      avatar: 'TS',
      avatarBg: 'bg-rose-500',
      mutualFriends: 2,
      status: 'blocked',
      bio: 'Chặn tạm thời'
    }
  ])

  const [searchQuery, setSearchQuery] = useState('')
  const [activeMenuUserId, setActiveMenuUserId] = useState<string | null>(null)
  
  // Modals state
  const [selectedUser, setSelectedUser] = useState<UserItem | null>(null)
  const [showInviteModal, setShowInviteModal] = useState(false)
  const [inviteMessage, setInviteMessage] = useState('Xin chào, mình là Phùng Văn Duy. Kết bạn với mình nhé!')
  
  // Alert Modals state
  const [alertType, setAlertType] = useState<'sent' | 'unfriended' | 'blocked' | 'unblocked' | 'accepted' | null>(null)
  const [alertTargetName, setAlertTargetName] = useState('')

  // Filter users based on query
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    user.phone.includes(searchQuery)
  )

  // Actions
  const handleOpenInvite = (user: UserItem) => {
    setSelectedUser(user)
    setInviteMessage(`Xin chào, mình là Phùng Văn Duy. Kết bạn với mình nhé!`)
    setShowInviteModal(true)
  }

  const handleSendInvite = () => {
    if (!selectedUser) return
    
    // Update user status to 'sent'
    setUsers(prev => prev.map(u => 
      u.id === selectedUser.id ? { ...u, status: 'sent' } : u
    ))

    setAlertTargetName(selectedUser.name)
    setAlertType('sent')
    setShowInviteModal(false)
  }

  const handleCancelInvite = (user: UserItem) => {
    setUsers(prev => prev.map(u => 
      u.id === user.id ? { ...u, status: 'none' } : u
    ))
    alert(`Đã thu hồi lời mời kết bạn gửi đến ${user.name}`)
  }

  const handleAcceptInvite = (user: UserItem) => {
    setUsers(prev => prev.map(u => 
      u.id === user.id ? { ...u, status: 'friends' } : u
    ))
    setAlertTargetName(user.name)
    setAlertType('accepted')
  }

  const handleDeclineInvite = (user: UserItem) => {
    setUsers(prev => prev.map(u => 
      u.id === user.id ? { ...u, status: 'none' } : u
    ))
    alert(`Đã từ chối lời mời kết bạn từ ${user.name}`)
  }

  const handleUnfriend = (user: UserItem) => {
    setUsers(prev => prev.map(u => 
      u.id === user.id ? { ...u, status: 'none' } : u
    ))
    setAlertTargetName(user.name)
    setAlertType('unfriended')
    setActiveMenuUserId(null)
  }

  const handleBlock = (user: UserItem) => {
    setUsers(prev => prev.map(u => 
      u.id === user.id ? { ...u, status: 'blocked' } : u
    ))
    setAlertTargetName(user.name)
    setAlertType('blocked')
    setActiveMenuUserId(null)
  }

  const handleUnblock = (user: UserItem) => {
    setUsers(prev => prev.map(u => 
      u.id === user.id ? { ...u, status: 'none' } : u
    ))
    setAlertTargetName(user.name)
    setAlertType('unblocked')
  }

  const handleMessage = (user: UserItem) => {
    alert(`Bắt đầu trò chuyện với ${user.name}`)
  }

  return (
    <div className="w-full h-full flex flex-col bg-[#F7F9FC] p-6 md:p-8 overflow-y-auto">
      
      {/* Title Header */}
      <div className="max-w-[720px] mx-auto w-full mb-8">
        <h1 className="text-[24px] font-bold text-slate-800 tracking-tight flex items-center gap-2.5">
          <Sparkles className="w-6 h-6 text-[#0056C6]" />
          Tìm kiếm bạn bè
        </h1>
        <p className="text-[14px] text-slate-500 mt-1.5">
          Nhập số điện thoại hoặc tên để tìm kiếm và kết nối với những người xung quanh.
        </p>
      </div>

      {/* Search Bar container */}
      <div className="max-w-[720px] mx-auto w-full mb-6">
        <div className="relative w-full bg-white rounded-2xl border border-slate-200/80 shadow-[0_4px_20px_rgb(0,0,0,0.02)] p-1.5 flex items-center transition-all duration-300 focus-within:border-[#0056C6] focus-within:ring-2 focus-within:ring-[#0056C6]/10">
          <div className="pl-4 text-slate-400">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Nhập số điện thoại hoặc tên người dùng..."
            className="w-full h-11 px-3 text-[15px] text-slate-800 placeholder-slate-400 bg-transparent border-none outline-none focus:ring-0"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer transition-colors mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Results Section */}
      <div className="max-w-[720px] mx-auto w-full flex-1 flex flex-col">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-[13px] font-bold text-slate-400 uppercase tracking-wider">
            {searchQuery ? 'Kết quả tìm kiếm' : 'Gợi ý kết bạn'}
          </span>
          <span className="text-[13px] text-slate-400 font-semibold">
            {filteredUsers.length} người dùng
          </span>
        </div>

        {filteredUsers.length > 0 ? (
          <div className="flex flex-col gap-4">
            {filteredUsers.map((user) => (
              <div 
                key={user.id}
                className="bg-white border border-slate-150 rounded-2xl p-5 flex items-center justify-between shadow-sm hover:shadow-md transition-all duration-300 group"
              >
                {/* User Info Left */}
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-xl ${user.avatarBg} text-white font-bold text-[18px] flex items-center justify-center relative shadow-sm transition-transform duration-300 group-hover:scale-105`}>
                    {user.avatar}
                    <span className={`absolute bottom-[-1.5px] right-[-1.5px] block h-3 w-3 rounded-full ring-[2px] ring-white ${user.status === 'blocked' ? 'bg-slate-400' : 'bg-green-500'}`} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[16px] font-bold text-slate-800 group-hover:text-[#0056C6] transition-colors">
                      {user.name}
                    </span>
                    <span className="text-[12.5px] text-slate-500 font-medium mt-0.5">
                      SĐT: {user.phone}
                    </span>
                    {user.mutualFriends > 0 ? (
                      <span className="text-[11.5px] text-slate-400 font-medium mt-0.5">
                        {user.mutualFriends} bạn chung
                      </span>
                    ) : (
                      <span className="text-[11.5px] text-slate-400 font-medium mt-0.5">
                        0 bạn chung
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions Right */}
                <div className="flex items-center gap-2.5 relative">
                  
                  {/* Status: none (Not Friends) */}
                  {user.status === 'none' && (
                    <>
                      <button
                        onClick={() => handleOpenInvite(user)}
                        className="h-9 px-4 bg-[#0056C6] hover:bg-[#0047A5] active:bg-[#003882] text-white text-[13.5px] font-bold rounded-lg shadow-sm transition-all cursor-pointer flex items-center gap-1.5 focus:outline-none"
                      >
                        <UserPlus className="w-4 h-4" />
                        Kết bạn
                      </button>
                      <button
                        onClick={() => handleMessage(user)}
                        className="h-9 px-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[13.5px] font-bold rounded-lg transition-all cursor-pointer focus:outline-none"
                      >
                        Nhắn tin
                      </button>
                    </>
                  )}

                  {/* Status: sent (Pending Sent) */}
                  {user.status === 'sent' && (
                    <>
                      <button
                        onClick={() => handleCancelInvite(user)}
                        className="h-9 px-4 bg-slate-100 hover:bg-red-50 hover:text-red-600 hover:border-red-200 border border-slate-200 text-slate-600 text-[13.5px] font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 focus:outline-none"
                      >
                        <UserMinus className="w-4 h-4" />
                        Hủy yêu cầu
                      </button>
                      <button
                        onClick={() => handleMessage(user)}
                        className="h-9 px-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[13.5px] font-bold rounded-lg transition-all cursor-pointer focus:outline-none"
                      >
                        Nhắn tin
                      </button>
                    </>
                  )}

                  {/* Status: received (Incoming Request) */}
                  {user.status === 'received' && (
                    <>
                      <button
                        onClick={() => handleAcceptInvite(user)}
                        className="h-9 px-4 bg-green-600 hover:bg-green-700 active:bg-green-800 text-white text-[13.5px] font-bold rounded-lg shadow-sm transition-all cursor-pointer flex items-center gap-1.5 focus:outline-none"
                      >
                        <UserCheck className="w-4 h-4" />
                        Đồng ý
                      </button>
                      <button
                        onClick={() => handleDeclineInvite(user)}
                        className="h-9 px-3.5 bg-slate-100 hover:bg-slate-200 text-slate-600 text-[13.5px] font-bold rounded-lg transition-all cursor-pointer focus:outline-none"
                      >
                        Từ chối
                      </button>
                    </>
                  )}

                  {/* Status: friends (Already Friends) */}
                  {user.status === 'friends' && (
                    <>
                      <button
                        onClick={() => handleMessage(user)}
                        className="h-9 px-4 bg-[#E8F1FF] hover:bg-[#d4e5ff] text-[#0056C6] text-[13.5px] font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 focus:outline-none"
                      >
                        <MessageSquare className="w-4 h-4" />
                        Nhắn tin
                      </button>
                      
                      <div className="relative">
                        <button
                          onClick={() => setActiveMenuUserId(activeMenuUserId === user.id ? null : user.id)}
                          className="w-9 h-9 flex items-center justify-center bg-slate-50 hover:bg-slate-100 active:bg-slate-200 text-slate-500 rounded-lg cursor-pointer focus:outline-none"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>
                        
                        {/* More menu dropdown */}
                        {activeMenuUserId === user.id && (
                          <div className="absolute right-0 mt-2 w-44 bg-white border border-slate-200 rounded-xl shadow-xl z-10 py-1.5 animate-fadeIn">
                            <button
                              onClick={() => handleUnfriend(user)}
                              className="w-full px-4 py-2 text-left text-[13px] font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer focus:outline-none"
                            >
                              <UserX className="w-4 h-4 text-red-500" />
                              Hủy kết bạn
                            </button>
                            <button
                              onClick={() => handleBlock(user)}
                              className="w-full px-4 py-2 text-left text-[13px] font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer focus:outline-none"
                            >
                              <Ban className="w-4 h-4 text-slate-400" />
                              Chặn người này
                            </button>
                          </div>
                        )}
                      </div>
                    </>
                  )}

                  {/* Status: blocked (Blocked by us) */}
                  {user.status === 'blocked' && (
                    <button
                      onClick={() => handleUnblock(user)}
                      className="h-9 px-4 bg-rose-50 border border-rose-200 hover:bg-rose-100 text-rose-600 text-[13.5px] font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 focus:outline-none"
                    >
                      <Ban className="w-4 h-4" />
                      Bỏ chặn
                    </button>
                  )}

                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex-1 bg-white border border-dashed border-slate-250 rounded-2xl p-12 flex flex-col items-center justify-center text-center shadow-sm">
            <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 mb-4">
              <Search className="w-7 h-7" />
            </div>
            <h3 className="text-[16px] font-bold text-slate-700">Không tìm thấy kết quả</h3>
            <p className="text-[13.5px] text-slate-400 mt-1 max-w-[320px]">
              Không tìm thấy người dùng nào khớp với số điện thoại hoặc tên "{searchQuery}".
            </p>
          </div>
        )}
      </div>

      {/* ======================================================== */}
      {/* MODAL 1: Gửi lời mời kết bạn (Send Invite Modal)         */}
      {/* ======================================================== */}
      {showInviteModal && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop overlay */}
          <div 
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-[1.5px] transition-opacity duration-300"
            onClick={() => setShowInviteModal(false)}
          />
          
          {/* Modal Content */}
          <div className="relative bg-white rounded-2xl p-7 max-w-[420px] w-full mx-4 shadow-2xl border border-slate-100/80 z-50 transform transition-all duration-300 scale-100 flex flex-col">
            
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-[18px] font-bold text-slate-800">Gửi lời mời kết bạn</h3>
              <button
                onClick={() => setShowInviteModal(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Target User Detail Box */}
            <div className="bg-slate-50/70 border border-slate-100 rounded-xl p-4 flex items-center gap-3.5 mb-5">
              <div className={`w-12 h-12 rounded-xl ${selectedUser.avatarBg} text-white font-bold text-[16px] flex items-center justify-center shadow-inner`}>
                {selectedUser.avatar}
              </div>
              <div className="flex flex-col">
                <span className="text-[14.5px] font-bold text-slate-800">{selectedUser.name}</span>
                <span className="text-[12px] text-slate-400 font-semibold mt-0.5">SĐT: {selectedUser.phone}</span>
              </div>
            </div>

            {/* Text Area Message */}
            <div className="flex flex-col gap-1.5 mb-6">
              <label className="text-[13px] font-bold text-slate-700">Lời nhắn (tùy chọn)</label>
              <textarea
                value={inviteMessage}
                onChange={(e) => setInviteMessage(e.target.value)}
                rows={3}
                maxLength={120}
                className="w-full text-[14px] text-slate-800 border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-[#0056C6] focus:ring-1 focus:ring-[#0056C6] resize-none"
              />
              <div className="text-right text-[10px] text-slate-400 font-semibold mt-0.5">
                {inviteMessage.length}/120 ký tự
              </div>
            </div>

            {/* Buttons Action */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowInviteModal(false)}
                className="flex-1 h-11 border border-slate-200 hover:bg-slate-50 text-slate-600 text-[14px] font-bold rounded-xl transition-all cursor-pointer focus:outline-none"
              >
                Hủy
              </button>
              <button
                onClick={handleSendInvite}
                className="flex-1 h-11 bg-[#0056C6] hover:bg-[#0047A5] text-white text-[14px] font-bold rounded-xl shadow-sm transition-all cursor-pointer focus:outline-none"
              >
                Gửi lời mời
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* ALERT MODALS: Success feedback matching screenshots      */}
      {/* ======================================================== */}
      {alertType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop overlay */}
          <div 
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-[1.5px] transition-opacity duration-300"
            onClick={() => setAlertType(null)}
          />
          
          {/* Success Alert Box */}
          <div className="relative bg-white rounded-2xl p-8 max-w-[360px] w-full mx-4 shadow-2xl border border-slate-100 z-50 transform transition-all duration-300 scale-100 flex flex-col items-center text-center">
            
            {/* Animated Success Badge */}
            <div className="w-16 h-16 rounded-full bg-blue-50 text-[#0056C6] flex items-center justify-center mb-5 shadow-inner">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>

            {/* Display message based on action type */}
            {alertType === 'sent' && (
              <>
                <h4 className="text-[18px] font-bold text-slate-800 mb-2">Đã gửi lời mời thành công!</h4>
                <p className="text-[13.5px] text-slate-500 mb-6 leading-relaxed">
                  Lời mời kết bạn đã được gửi đến <span className="font-bold text-slate-700">{alertTargetName}</span>.
                </p>
                <div className="flex flex-col gap-2 w-full">
                  <button
                    onClick={() => {
                      setAlertType(null)
                      // Reset to empty query to see list
                      setSearchQuery('')
                    }}
                    className="w-full h-11 bg-[#0056C6] hover:bg-[#0047A5] text-white text-[14px] font-bold rounded-xl transition-all cursor-pointer focus:outline-none"
                  >
                    Quay lại trang chủ
                  </button>
                  <button
                    onClick={() => {
                      setAlertType(null)
                      alert(`Đang chuyển tới cuộc trò chuyện với ${alertTargetName}...`)
                    }}
                    className="w-full h-11 border border-slate-200 hover:bg-slate-50 text-slate-600 text-[14px] font-bold rounded-xl transition-all cursor-pointer focus:outline-none"
                  >
                    Nhắn tin ngay
                  </button>
                </div>
              </>
            )}

            {alertType === 'unfriended' && (
              <>
                <h4 className="text-[18px] font-bold text-slate-800 mb-2">Đã hủy kết bạn thành công!</h4>
                <p className="text-[13.5px] text-slate-500 mb-6 leading-relaxed">
                  Bạn và <span className="font-bold text-slate-700">{alertTargetName}</span> không còn là bạn bè trên ChatApp.
                </p>
                <button
                  onClick={() => setAlertType(null)}
                  className="w-full h-11 bg-[#0056C6] hover:bg-[#0047A5] text-white text-[14px] font-bold rounded-xl transition-all cursor-pointer focus:outline-none"
                >
                  Đóng
                </button>
              </>
            )}

            {alertType === 'blocked' && (
              <>
                <h4 className="text-[18px] font-bold text-slate-800 mb-2">Đã chặn thành công!</h4>
                <p className="text-[13.5px] text-slate-500 mb-6 leading-relaxed">
                  Đã thêm <span className="font-bold text-slate-700">{alertTargetName}</span> vào danh sách đen chặn liên lạc.
                </p>
                <button
                  onClick={() => setAlertType(null)}
                  className="w-full h-11 bg-[#0056C6] hover:bg-[#0047A5] text-white text-[14px] font-bold rounded-xl transition-all cursor-pointer focus:outline-none"
                >
                  Đóng
                </button>
              </>
            )}

            {alertType === 'unblocked' && (
              <>
                <h4 className="text-[18px] font-bold text-slate-800 mb-2">Đã bỏ chặn thành công!</h4>
                <p className="text-[13.5px] text-slate-500 mb-6 leading-relaxed">
                  Đã gỡ chặn cho <span className="font-bold text-slate-700">{alertTargetName}</span>. Hai bạn có thể liên lạc lại.
                </p>
                <button
                  onClick={() => setAlertType(null)}
                  className="w-full h-11 bg-[#0056C6] hover:bg-[#0047A5] text-white text-[14px] font-bold rounded-xl transition-all cursor-pointer focus:outline-none"
                >
                  Đóng
                </button>
              </>
            )}

            {alertType === 'accepted' && (
              <>
                <h4 className="text-[18px] font-bold text-slate-800 mb-2">Kết nối thành công!</h4>
                <p className="text-[13.5px] text-slate-500 mb-6 leading-relaxed">
                  Bạn và <span className="font-bold text-slate-700">{alertTargetName}</span> đã trở thành bạn bè trên ChatApp.
                </p>
                <div className="flex flex-col gap-2 w-full">
                  <button
                    onClick={() => {
                      setAlertType(null)
                      alert(`Đang mở hộp thoại trò chuyện với ${alertTargetName}...`)
                    }}
                    className="w-full h-11 bg-[#0056C6] hover:bg-[#0047A5] text-white text-[14px] font-bold rounded-xl transition-all cursor-pointer focus:outline-none"
                  >
                    Nhắn tin ngay
                  </button>
                  <button
                    onClick={() => setAlertType(null)}
                    className="w-full h-11 border border-slate-200 hover:bg-slate-50 text-slate-600 text-[14px] font-bold rounded-xl transition-all cursor-pointer focus:outline-none"
                  >
                    Đóng
                  </button>
                </div>
              </>
            )}

          </div>
        </div>
      )}

    </div>
  )
}
