import React, { useState } from 'react'
import { 
  Search, 
  UserPlus, 
  Users, 
  RefreshCw, 
  ChevronRight,
  ChevronLeft,
  Check,
  X,
  Plus,
  MoreHorizontal,
  Ban,
  UserX,
  Copy,
  MessageSquare,
  User,
  MapPin,
  Calendar,
  Phone,
  Info,
  ShieldAlert,
  Trash2
} from 'lucide-react'

// Contact item interfaces
interface Contact {
  id: string
  name: string
  status: 'online' | 'offline'
  avatar: string
  avatarBg: string
  phone: string
  gender: string
  birthday: string
  address: string
  mutualFriends: number
}

interface PendingRequest {
  id: string
  name: string
  avatar: string
  avatarBg: string
  mutualFriends: number
  time: string
  phone: string
  gender: string
  birthday: string
  address: string
}

interface Suggestion {
  id: string
  name: string
  mutualFriends: number
  avatar: string
  avatarBg: string
  phone: string
  gender: string
  birthday: string
  address: string
  added?: boolean
}

interface BlockedUser {
  id: string
  name: string
  avatar: string
  avatarBg: string
}

interface GroupChat {
  id: string
  name: string
  avatar: string
  avatarBg: string
  membersCount: number
  memberNames: string[]
}

export const Contacts: React.FC = () => {
  // Alphabetically grouped contacts
  const [contacts, setContacts] = useState<Contact[]>([
    { 
      id: 'c1', 
      name: 'Đỗ Đình An', 
      status: 'online', 
      avatar: 'DA', 
      avatarBg: 'bg-indigo-500', 
      phone: '0981112223',
      gender: 'Nam',
      birthday: '15/04/2001',
      address: 'Đống Đa, Hà Nội',
      mutualFriends: 4
    },
    { 
      id: 'c2', 
      name: 'Ngọc Bình', 
      status: 'offline', 
      avatar: 'NB', 
      avatarBg: 'bg-blue-500', 
      phone: '0982223334',
      gender: 'Nữ',
      birthday: '24/11/1999',
      address: 'Quận 1, TP. Hồ Chí Minh',
      mutualFriends: 2
    },
    { 
      id: 'c3', 
      name: 'Phạm Ngọc Hách', 
      status: 'online', 
      avatar: 'NH', 
      avatarBg: 'bg-pink-500', 
      phone: '0983334445',
      gender: 'Nam',
      birthday: '08/08/2000',
      address: 'Cầu Giấy, Hà Nội',
      mutualFriends: 6
    },
    { 
      id: 'c4', 
      name: 'Lại Anh Đào', 
      status: 'online', 
      avatar: 'AD', 
      avatarBg: 'bg-purple-500', 
      phone: '0984445556',
      gender: 'Nữ',
      birthday: '12/09/2002',
      address: 'Thanh Xuân, Hà Nội',
      mutualFriends: 8
    }
  ])

  // Pending friend requests (from "Lời mời kết bạn 5")
  const [pendingRequests, setPendingRequests] = useState<PendingRequest[]>([
    { id: 'r1', name: 'Nguyễn Thị Hồng', avatar: 'TH', avatarBg: 'bg-amber-500', mutualFriends: 4, time: '2 giờ trước', phone: '0971234567', gender: 'Nữ', birthday: '10/05/2001', address: 'Hai Bà Trưng, Hà Nội' },
    { id: 'r2', name: 'Lê Hoàng Long', avatar: 'HL', avatarBg: 'bg-emerald-500', mutualFriends: 8, time: '5 giờ trước', phone: '0972345678', gender: 'Nam', birthday: '21/02/2000', address: 'Ba Đình, Hà Nội' },
    { id: 'r3', name: 'Bùi Minh Đức', avatar: 'MD', avatarBg: 'bg-blue-600', mutualFriends: 2, time: '1 ngày trước', phone: '0973456789', gender: 'Nam', birthday: '14/12/1998', address: 'Hoàn Kiếm, Hà Nội' },
    { id: 'r4', name: 'Vương Gia Hân', avatar: 'GH', avatarBg: 'bg-rose-500', mutualFriends: 12, time: '1 ngày trước', phone: '0974567890', gender: 'Nữ', birthday: '03/07/2003', address: 'Tây Hồ, Hà Nội' },
    { id: 'r5', name: 'Trịnh Quốc Bảo', avatar: 'QB', avatarBg: 'bg-violet-500', mutualFriends: 1, time: '2 ngày trước', phone: '0975678901', gender: 'Nam', birthday: '30/10/1999', address: 'Hoàng Mai, Hà Nội' }
  ])

  // Friend suggestions
  const [suggestions, setSuggestions] = useState<Suggestion[]>([
    { id: 's1', name: 'Hoàng Linh', mutualFriends: 12, avatar: 'HL', avatarBg: 'bg-sky-500', phone: '0901234567', gender: 'Nữ', birthday: '01/01/2001', address: 'Hà Đông, Hà Nội' },
    { id: 's2', name: 'Vũ Nam', mutualFriends: 5, avatar: 'VN', avatarBg: 'bg-teal-500', phone: '0902345678', gender: 'Nam', birthday: '18/06/2000', address: 'Long Biên, Hà Nội' },
    { id: 's3', name: 'Nguyễn Tiến', mutualFriends: 9, avatar: 'NT', avatarBg: 'bg-orange-500', phone: '0903456789', gender: 'Nam', birthday: '22/03/1997', address: 'Thanh Trì, Hà Nội' },
    { id: 's4', name: 'Phan Khánh', mutualFriends: 3, avatar: 'PK', avatarBg: 'bg-cyan-500', phone: '0904567890', gender: 'Nữ', birthday: '15/10/2002', address: 'Nam Từ Liêm, Hà Nội' }
  ])

  // Blocked users
  const [blockedUsers, setBlockedUsers] = useState<BlockedUser[]>([
    { id: 'b1', name: 'Đỗ Thanh Sơn', avatar: 'TS', avatarBg: 'bg-rose-500' },
    { id: 'b2', name: 'Nguyễn Văn Nam', avatar: 'VN', avatarBg: 'bg-slate-500' }
  ])

  // Group Chats List
  const [groups, setGroups] = useState<GroupChat[]>([
    {
      id: 'g1',
      name: 'Nhóm Học Tập UI/UX 🎨',
      avatar: 'UI',
      avatarBg: 'bg-gradient-to-tr from-pink-500 to-indigo-650',
      membersCount: 5,
      memberNames: ['Phùng Văn Duy', 'Đỗ Đình An', 'Ngọc Bình', 'Lại Anh Đào', 'Phạm Ngọc Hách']
    },
    {
      id: 'g2',
      name: 'Gia Đình ❤️',
      avatar: 'GD',
      avatarBg: 'bg-gradient-to-tr from-red-500 to-rose-600',
      membersCount: 3,
      memberNames: ['Phùng Văn Duy', 'Nguyễn Thị Hồng', 'Lê Hoàng Long']
    }
  ])

  // Navigation, Tab and View states
  const [contactTab, setContactTab] = useState<'friends' | 'groups'>('friends')
  const [currentSubView, setCurrentSubView] = useState<'overview' | 'requests'>('overview')
  const [searchQuery, setSearchQuery] = useState('')
  const [activeMenuRequestId, setActiveMenuRequestId] = useState<string | null>(null)
  
  // Active details pane states
  const [activeProfileUser, setActiveProfileUser] = useState<any | null>(null)
  const [activeGroup, setActiveGroup] = useState<GroupChat | null>(null)
  
  // Modals state
  const [showBlockedList, setShowBlockedList] = useState(false)
  const [showCreateGroup, setShowCreateGroup] = useState(false)
  const [newGroupName, setNewGroupName] = useState('')
  const [selectedGroupMembers, setSelectedGroupMembers] = useState<string[]>([])
  
  const [isSyncing, setIsSyncing] = useState(false)
  const [syncSuccess, setSyncSuccess] = useState(false)
  const [showToast, setShowToast] = useState(false)
  
  // Confirmation Modal state
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean
    type: 'unfriend' | 'block' | 'unblock' | 'decline' | 'disband'
    userId: string
    userName: string
  }>({
    isOpen: false,
    type: 'unfriend',
    userId: '',
    userName: ''
  })

  // Alert/Success Modal state
  const [successModal, setSuccessModal] = useState<{
    isOpen: boolean
    type: 'accepted' | 'declined' | 'unfriended' | 'blocked' | 'unblocked' | 'disbanded' | ''
    userName: string
  }>({
    isOpen: false,
    type: '',
    userName: ''
  })

  // Group contacts helper
  const getGroupLetter = (name: string): string => {
    if (name === 'Đỗ Đình An') return 'A'
    if (name === 'Ngọc Bình') return 'B'
    if (name === 'Phạm Ngọc Hách') return 'H'
    if (name === 'Lại Anh Đào') return 'L'
    if (name === 'Trần Quốc Bảo') return 'B'
    return name.charAt(0).toUpperCase()
  }

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredGroups = groups.filter(group =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const groupedContacts: { [key: string]: Contact[] } = {}
  filteredContacts.forEach(contact => {
    const letter = getGroupLetter(contact.name)
    if (!groupedContacts[letter]) {
      groupedContacts[letter] = []
    }
    groupedContacts[letter].push(contact)
  })

  const groupKeys = Object.keys(groupedContacts).sort()
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

  // Actions
  const handleAddSuggestion = (id: string) => {
    setSuggestions(prev => prev.map(s => 
      s.id === id ? { ...s, added: !s.added } : s
    ))
  }

  const triggerSuccessAlert = (type: 'accepted' | 'declined' | 'unfriended' | 'blocked' | 'unblocked' | 'disbanded', userName: string) => {
    setSuccessModal({
      isOpen: true,
      type,
      userName
    })
  }

  // Accept Invite Flow
  const handleAcceptRequest = (id: string, name: string) => {
    setPendingRequests(prev => prev.filter(r => r.id !== id))
    const matchedReq = pendingRequests.find(r => r.id === id)
    const initials = name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
    
    const newContact: Contact = {
      id: `c_${Date.now()}`,
      name,
      status: 'online',
      avatar: initials,
      avatarBg: matchedReq ? matchedReq.avatarBg : 'bg-blue-500',
      phone: matchedReq ? matchedReq.phone : '0981234567',
      gender: matchedReq ? matchedReq.gender : 'Nam',
      birthday: matchedReq ? matchedReq.birthday : '01/01/2000',
      address: matchedReq ? matchedReq.address : 'Hà Nội, Việt Nam',
      mutualFriends: matchedReq ? matchedReq.mutualFriends : 2
    }
    
    setContacts(prev => [...prev, newContact])
    triggerSuccessAlert('accepted', name)
  }

  // Decline Invite Flow
  const handleDeclineRequest = (id: string, name: string) => {
    setPendingRequests(prev => prev.filter(r => r.id !== id))
    triggerSuccessAlert('declined', name)
  }

  // Unfriend Flow
  const handleConfirmUnfriend = (userId: string, userName: string) => {
    setConfirmModal({
      isOpen: true,
      type: 'unfriend',
      userId,
      userName
    })
    setActiveProfileUser(null)
  }

  const executeUnfriend = () => {
    const { userId, userName } = confirmModal
    setContacts(prev => prev.filter(c => c.id !== userId))
    setConfirmModal(prev => ({ ...prev, isOpen: false }))
    triggerSuccessAlert('unfriended', userName)
  }

  // Block Flow
  const handleConfirmBlock = (userId: string, userName: string) => {
    setConfirmModal({
      isOpen: true,
      type: 'block',
      userId,
      userName
    })
    setActiveProfileUser(null)
    setActiveMenuRequestId(null)
  }

  const executeBlock = () => {
    const { userId, userName } = confirmModal
    setContacts(prev => prev.filter(c => c.id !== userId))
    setPendingRequests(prev => prev.filter(r => r.id !== userId))
    
    const isAlreadyBlocked = blockedUsers.some(u => u.id === userId)
    if (!isAlreadyBlocked) {
      const initials = userName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
      setBlockedUsers(prev => [...prev, {
        id: userId,
        name: userName,
        avatar: initials,
        avatarBg: 'bg-slate-500'
      }])
    }

    setConfirmModal(prev => ({ ...prev, isOpen: false }))
    triggerSuccessAlert('blocked', userName)
  }

  // Unblock Flow
  const handleConfirmUnblock = (userId: string, userName: string) => {
    setConfirmModal({
      isOpen: true,
      type: 'unblock',
      userId,
      userName
    })
  }

  const executeUnblock = () => {
    const { userId, userName } = confirmModal
    setBlockedUsers(prev => prev.filter(u => u.id !== userId))
    setConfirmModal(prev => ({ ...prev, isOpen: false }))
    triggerSuccessAlert('unblocked', userName)
  }

  // Group Disband Flow (node-id: 24-1376)
  const handleConfirmDisband = (groupId: string, groupName: string) => {
    setConfirmModal({
      isOpen: true,
      type: 'disband',
      userId: groupId,
      userName: groupName
    })
  }

  const executeDisband = () => {
    const { userId, userName } = confirmModal
    setGroups(prev => prev.filter(g => g.id !== userId))
    setActiveGroup(null)
    setConfirmModal(prev => ({ ...prev, isOpen: false }))
    triggerSuccessAlert('disbanded', userName)
  }

  // Copy Profile Link Flow
  const handleCopyLink = () => {
    setShowToast(true)
    setTimeout(() => setShowToast(false), 2000)
  }

  // Sync Contacts
  const handleSync = () => {
    setIsSyncing(true)
    setTimeout(() => {
      setIsSyncing(false)
      setSyncSuccess(true)
      const hasAdded = contacts.some(c => c.name === 'Trần Quốc Bảo')
      if (!hasAdded) {
        setContacts(prev => [
          ...prev,
          { 
            id: 'c5', 
            name: 'Trần Quốc Bảo', 
            status: 'online', 
            avatar: 'QB', 
            avatarBg: 'bg-indigo-600', 
            phone: '0977889900',
            gender: 'Nam',
            birthday: '30/10/1999',
            address: 'Hoàng Mai, Hà Nội',
            mutualFriends: 1
          }
        ])
      }
      setTimeout(() => setSyncSuccess(false), 3000)
    }, 1500)
  }

  // Open Create Group Modal (node-id: 24-1238)
  const handleOpenCreateGroup = () => {
    setNewGroupName('')
    setSelectedGroupMembers([])
    setShowCreateGroup(true)
  }

  // Toggle Member Checkbox in Create Group
  const handleToggleGroupMember = (name: string) => {
    setSelectedGroupMembers(prev => 
      prev.includes(name) 
        ? prev.filter(item => item !== name) 
        : [...prev, name]
    )
  }

  // Submit Create Group
  const handleCreateGroupSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newGroupName.trim()) return

    const initials = newGroupName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
    const newGroup: GroupChat = {
      id: `g_${Date.now()}`,
      name: newGroupName,
      avatar: initials,
      avatarBg: 'bg-gradient-to-tr from-blue-500 to-indigo-650',
      membersCount: selectedGroupMembers.length + 1, // Include current user
      memberNames: ['Phùng Văn Duy', ...selectedGroupMembers]
    }

    setGroups(prev => [...prev, newGroup])
    setShowCreateGroup(false)
    setContactTab('groups')
    setActiveGroup(newGroup)
  }

  return (
    <div className="flex-1 flex h-full overflow-hidden bg-[#F8F9FA] relative select-none">
      
      {/* Toast Notification for Link Copied */}
      {showToast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] bg-white border border-slate-100 px-5 py-2.5 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.08)] flex items-center gap-2.5 animate-fadeIn">
          <div className="w-5.5 h-5.5 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center">
            <Check className="w-3.5 h-3.5 stroke-[2.5]" />
          </div>
          <span className="text-[13.5px] font-bold text-slate-700">Đã sao chép link liên kết thành công!</span>
        </div>
      )}

      {/* ======================================================== */}
      {/* COLUMN 1 (MIDDLE): Danh bạ List (Alphabetical / Groups)  */}
      {/* ======================================================== */}
      <div className="w-[350px] shrink-0 bg-white border-r border-slate-200 flex flex-col h-full z-10">
        
        {/* Header Section */}
        <div className="px-6 pt-6 pb-4 flex items-center justify-between">
          <h2 className="text-[22px] font-bold text-slate-800 tracking-tight">Danh bạ</h2>
          <div className="flex items-center gap-1.5">
            <button 
              onClick={() => setShowBlockedList(true)}
              className="w-9 h-9 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800 cursor-pointer transition-colors focus:outline-none"
              title="Danh sách chặn"
            >
              <Ban className="w-4.5 h-4.5" />
            </button>
            <button 
              onClick={() => {
                if (contactTab === 'groups') {
                  handleOpenCreateGroup()
                } else {
                  alert('Thêm bạn mới')
                }
              }}
              className="w-9 h-9 rounded-full hover:bg-slate-100 flex items-center justify-center text-[#0056C6] cursor-pointer transition-colors focus:outline-none"
              title={contactTab === 'groups' ? 'Tạo nhóm mới' : 'Thêm bạn bè'}
            >
              <UserPlus className="w-5.5 h-5.5" />
            </button>
          </div>
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
              placeholder={contactTab === 'groups' ? 'Tìm kiếm nhóm' : 'Tìm kiếm bạn bè'}
              className="w-full h-9 px-2 text-[14px] bg-transparent border-none outline-none text-slate-800 placeholder-slate-450 focus:ring-0"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-md cursor-pointer mr-1"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* TABS SWITCH: Bạn bè / Danh sách nhóm (node-id: 24-1033) */}
        <div className="px-5 pb-3 flex gap-2 border-b border-slate-100 shrink-0">
          <button
            onClick={() => {
              setContactTab('friends')
              setActiveGroup(null)
            }}
            className={`px-4 py-1.5 rounded-full text-[13px] font-bold cursor-pointer transition-all ${
              contactTab === 'friends' 
                ? 'bg-[#E8F1FF] text-[#0056C6]' 
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-850'
            }`}
          >
            Bạn bè
          </button>
          <button
            onClick={() => {
              setContactTab('groups')
              setActiveProfileUser(null)
            }}
            className={`px-4 py-1.5 rounded-full text-[13px] font-bold cursor-pointer transition-all flex items-center gap-1.5 ${
              contactTab === 'groups' 
                ? 'bg-[#E8F1FF] text-[#0056C6]' 
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-850'
            }`}
          >
            Danh sách nhóm
            <span className="text-[10px] px-1.5 py-0.5 bg-slate-100 text-slate-500 rounded-md font-bold">
              {groups.length}
            </span>
          </button>
        </div>

        {/* List scroll panel */}
        <div className="flex-1 overflow-y-auto relative pr-8 flex pt-3">
          
          {/* TAB 1: FRIENDS LIST */}
          {contactTab === 'friends' && (
            <div className="flex-1 flex flex-col pl-6">
              {groupKeys.length > 0 ? (
                groupKeys.map(letter => (
                  <div key={letter} className="mb-5">
                    <span className="text-[14px] font-extrabold text-[#0056C6] block mb-2 px-1">
                      {letter}
                    </span>
                    <div className="flex flex-col gap-3">
                      {groupedContacts[letter].map(contact => (
                        <div
                          key={contact.id}
                          onClick={() => {
                            setActiveProfileUser(contact)
                            setActiveGroup(null)
                          }}
                          className="flex items-center gap-3.5 p-1 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors group"
                        >
                          <div className={`w-11 h-11 rounded-full ${contact.avatarBg || 'bg-slate-350'} text-white font-bold text-[14.5px] flex items-center justify-center relative shadow-sm shrink-0`}>
                            {contact.avatar}
                            <span className={`absolute bottom-0 right-0 block h-2.8 w-2.8 rounded-full ring-2 ring-white ${
                              contact.status === 'online' ? 'bg-green-500' : 'bg-slate-400'
                            }`} />
                          </div>
                          <div className="flex flex-col overflow-hidden">
                            <span className="text-[14.5px] font-bold text-slate-800 group-hover:text-[#0056C6] transition-colors truncate">
                              {contact.name}
                            </span>
                            <span className="text-[11.5px] text-slate-450 font-medium">
                              {contact.status === 'online' ? 'Trực tuyến' : 'Ngoại tuyến'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center text-center py-10 pr-6 text-slate-400">
                  <span className="text-sm font-semibold">Không tìm thấy bạn bè</span>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: GROUPS LIST (node-id: 24-1033) */}
          {contactTab === 'groups' && (
            <div className="flex-1 flex flex-col pl-6">
              {filteredGroups.length > 0 ? (
                <div className="flex flex-col gap-3">
                  {filteredGroups.map(group => {
                    const isActive = activeGroup?.id === group.id
                    return (
                      <div
                        key={group.id}
                        onClick={() => {
                          setActiveGroup(group)
                          setActiveProfileUser(null)
                        }}
                        className={`flex items-center gap-3.5 p-3 rounded-2xl cursor-pointer transition-all ${
                          isActive 
                            ? 'bg-[#E8F1FF]/60 hover:bg-[#E8F1FF]/80' 
                            : 'hover:bg-slate-50'
                        }`}
                      >
                        <div className={`w-12 h-12 rounded-xl ${group.avatarBg} text-white font-bold text-[15px] flex items-center justify-center shadow-sm shrink-0`}>
                          {group.avatar}
                        </div>
                        <div className="flex flex-col overflow-hidden">
                          <span className="text-[14.5px] font-bold text-slate-800 truncate">
                            {group.name}
                          </span>
                          <span className="text-[11.5px] text-slate-450 font-semibold mt-1">
                            {group.membersCount} thành viên
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-center py-10 pr-6 text-slate-450">
                  <span className="text-sm font-bold">Chưa tham gia nhóm nào</span>
                  <button
                    onClick={handleOpenCreateGroup}
                    className="mt-3 text-[#0056C6] text-[13px] font-bold hover:underline cursor-pointer focus:outline-none"
                  >
                    Tạo nhóm mới ngay
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Quick jump alphabet (Only show for friends tab) */}
          {contactTab === 'friends' && (
            <div className="absolute right-1 top-2 bottom-2 w-6 flex flex-col items-center justify-between py-1 text-[#0056C6] font-bold text-[9.5px]">
              {alphabet.map(lettr => {
                const hasContacts = groupKeys.includes(lettr)
                return (
                  <span 
                    key={lettr}
                    className={`cursor-pointer transition-all hover:scale-125 ${
                      hasContacts ? 'text-[#0056C6] font-extrabold scale-110' : 'text-slate-350 font-semibold'
                    }`}
                    onClick={() => {
                      if (hasContacts) {
                        alert(`Nhảy tới nhóm: ${lettr}`)
                      }
                    }}
                  >
                    {lettr}
                  </span>
                )
              })}
            </div>
          )}
        </div>

      </div>

      {/* ======================================================== */}
      {/* COLUMN 2 (RIGHT): Chi tiết danh bạ (Details / Group info) */}
      {/* ======================================================== */}
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#F8F9FA]">
        
        {/* CASE 1: ACTIVE GROUP DETAILS PANEL (node-id: 24-1376) */}
        {activeGroup ? (
          <>
            {/* Top Header */}
            <div className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <button 
                  onClick={() => setActiveGroup(null)}
                  className="p-1 rounded-lg hover:bg-slate-100 text-slate-700 cursor-pointer focus:outline-none mr-1.5"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0056C6] flex items-center justify-center font-bold text-[13px]">
                  {activeGroup.avatar}
                </div>
                <h3 className="text-[15.5px] font-bold text-slate-800">Thông tin nhóm</h3>
              </div>
              
              <button
                onClick={() => handleConfirmDisband(activeGroup.id, activeGroup.name)}
                className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 hover:text-red-700 transition-colors cursor-pointer focus:outline-none"
                title="Giải tán nhóm"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>

            {/* Group details body */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 flex flex-col items-center">
              
              {/* Header Box */}
              <div className="bg-white border border-slate-150 rounded-2xl p-6.5 w-full max-w-[480px] flex flex-col items-center text-center shadow-sm mb-6">
                <div className={`w-20 h-20 rounded-2xl ${activeGroup.avatarBg} text-white font-extrabold text-[26px] flex items-center justify-center shadow-sm mb-4`}>
                  {activeGroup.avatar}
                </div>
                <h4 className="text-[18px] font-bold text-slate-800">{activeGroup.name}</h4>
                <p className="text-[12.8px] text-slate-450 mt-1 font-semibold">{activeGroup.membersCount} thành viên</p>
              </div>

              {/* Members List Box */}
              <div className="bg-white border border-slate-150 rounded-2xl p-6.5 w-full max-w-[480px] shadow-sm flex flex-col">
                <h5 className="text-[14px] font-extrabold text-slate-800 mb-4 uppercase tracking-wider">Danh sách thành viên</h5>
                
                <div className="flex flex-col gap-3.5">
                  {activeGroup.memberNames.map((memberName, i) => {
                    const isMe = memberName === 'Phùng Văn Duy'
                    const matchedContact = contacts.find(c => c.name === memberName)
                    const initials = memberName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
                    
                    return (
                      <div key={i} className="flex items-center justify-between border-b border-slate-50 pb-2 last:border-0 last:pb-0">
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-lg ${
                            isMe ? 'bg-blue-600' : (matchedContact ? matchedContact.avatarBg : 'bg-slate-400')
                          } text-white font-bold text-[12px] flex items-center justify-center`}>
                            {isMe ? 'VD' : initials}
                          </div>
                          <span className="text-[14px] font-bold text-slate-700">{memberName}</span>
                        </div>
                        {isMe && (
                          <span className="text-[10px] font-bold text-[#0056C6] bg-blue-50 px-2 py-0.5 rounded-md">
                            Trưởng nhóm
                          </span>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Warning Disband button */}
              <div className="w-full max-w-[480px] mt-6 flex justify-center">
                <button
                  onClick={() => handleConfirmDisband(activeGroup.id, activeGroup.name)}
                  className="w-full h-11 bg-red-650 hover:bg-red-700 text-white text-[13.5px] font-bold rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer focus:outline-none"
                >
                  <Trash2 className="w-4.5 h-4.5" />
                  Giải tán nhóm
                </button>
              </div>

            </div>
          </>
        ) : (
          /* CASE 2: NORMAL OVERVIEW / PERSONAL DETAILS VIEW */
          <>
            {/* Top Header */}
            <div className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0056C6] flex items-center justify-center">
                  <Users className="w-4.5 h-4.5" />
                </div>
                <h3 className="text-[15.5px] font-bold text-slate-800">Chi tiết danh bạ</h3>
              </div>
              
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setShowBlockedList(true)}
                  className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                  title="Danh sách chặn"
                >
                  <Ban className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => alert('Thêm bạn mới')}
                  className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                >
                  <UserPlus className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* View 1: Overview & Suggestions */}
            {currentSubView === 'overview' && (
              <div className="flex-1 overflow-y-auto p-6 md:p-8 flex flex-col gap-7 animate-fadeIn">
                
                {/* Banner 1: Lời mời kết bạn banner */}
                <div 
                  onClick={() => setCurrentSubView('requests')}
                  className="bg-[#0056C6] hover:bg-[#0047A5] text-white p-5 rounded-2xl flex items-center justify-between shadow-md cursor-pointer transition-all duration-200 hover:shadow-lg active:scale-[0.99] group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-sm group-hover:scale-105 transition-transform">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[16px] font-bold tracking-wide">Lời mời kết bạn</span>
                      <span className="text-[12.5px] text-blue-100 mt-0.5 font-medium">Bấm để xem danh sách lời mời</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {pendingRequests.length > 0 && (
                      <span className="w-7 h-7 bg-red-500 text-white text-[13px] font-bold rounded-full flex items-center justify-center shadow-sm">
                        {pendingRequests.length}
                      </span>
                    )}
                    <ChevronRight className="w-5 h-5 text-blue-200 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* Section 2: Gợi ý kết bạn */}
                <div className="flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-[15.5px] font-extrabold text-slate-800">Gợi ý kết bạn</h4>
                    <button 
                      onClick={() => alert('Xem tất cả gợi ý')}
                      className="text-[13px] font-bold text-[#0056C6] hover:underline cursor-pointer"
                    >
                      Xem tất cả
                    </button>
                  </div>

                  <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none">
                    {suggestions.map((sug) => (
                      <div 
                        key={sug.id}
                        className="w-[185px] bg-white border border-slate-150 rounded-2xl p-4 flex flex-col items-center text-center shadow-sm shrink-0 hover:shadow-md hover:border-slate-200 transition-all duration-300 group"
                      >
                        <div 
                          onClick={() => setActiveProfileUser(sug)}
                          className="w-20 h-20 rounded-2xl overflow-hidden relative mb-3.5 shadow-sm cursor-pointer"
                        >
                          <div className={`w-full h-full ${sug.avatarBg} text-white font-extrabold text-[24px] flex items-center justify-center`}>
                            {sug.avatar}
                          </div>
                          <div className="absolute bottom-1 right-1 w-6 h-6 rounded-lg bg-blue-50 border border-white text-[#0056C6] flex items-center justify-center shadow-sm">
                            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                          </div>
                        </div>

                        <span 
                          onClick={() => setActiveProfileUser(sug)}
                          className="text-[14px] font-bold text-slate-800 truncate w-full hover:text-[#0056C6] cursor-pointer"
                        >
                          {sug.name}
                        </span>
                        <span className="text-[11.5px] text-slate-450 font-medium mt-0.5 mb-4 block">
                          {sug.mutualFriends} bạn chung
                        </span>

                        <button
                          onClick={() => handleAddSuggestion(sug.id)}
                          className={`w-full py-2 text-[12.5px] font-bold rounded-xl transition-all cursor-pointer focus:outline-none ${
                            sug.added 
                              ? 'bg-blue-50 text-[#0056C6] border border-transparent'
                              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                          }`}
                        >
                          {sug.added ? 'Đã gửi' : 'Thêm bạn bè'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section 3: Kết nối nhiều hơn */}
                <div className="bg-white border border-slate-150 rounded-2xl p-7 flex flex-col items-center text-center max-w-[450px] w-full mx-auto shadow-sm mt-2">
                  <div className="w-16 h-16 rounded-full bg-slate-50 border border-slate-100 text-slate-400 flex items-center justify-center mb-4 shadow-inner">
                    <Users className="w-7 h-7" />
                  </div>
                  <h4 className="text-[16px] font-bold text-slate-800">Kết nối nhiều hơn</h4>
                  <p className="text-[12.8px] text-slate-450 mt-2 leading-relaxed max-w-[320px]">
                    Tìm kiếm bạn bè qua số điện thoại hoặc đồng bộ danh bạ từ thiết bị của bạn.
                  </p>
                  <button
                    onClick={handleSync}
                    disabled={isSyncing}
                    className={`px-6 h-10 border border-[#0056C6] hover:bg-blue-50 text-[#0056C6] text-[13px] font-bold rounded-full transition-all cursor-pointer flex items-center justify-center gap-2 mt-5 focus:outline-none active:scale-95 ${
                      isSyncing ? 'opacity-70 pointer-events-none' : ''
                    }`}
                  >
                    <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
                    {isSyncing ? 'Đang đồng bộ...' : 'Đồng bộ danh bạ'}
                  </button>

                  {syncSuccess && (
                    <span className="text-[12px] font-bold text-green-650 mt-3 flex items-center gap-1 animate-fadeIn">
                      <Check className="w-4 h-4 stroke-[2.5]" />
                      Đồng bộ danh bạ thành công!
                    </span>
                  )}
                </div>

              </div>
            )}

            {/* View 2: Lời mời kết bạn list */}
            {currentSubView === 'requests' && (
              <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4 animate-fadeIn">
                <div className="flex items-center gap-3 mb-2 shrink-0">
                  <button 
                    onClick={() => setCurrentSubView('overview')}
                    className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-800 cursor-pointer focus:outline-none"
                    title="Quay lại"
                  >
                    <ChevronLeft className="w-5.5 h-5.5 text-slate-700" />
                  </button>
                  <div className="flex items-center gap-2">
                    <h3 className="text-[16px] font-bold text-slate-850">Lời mời kết bạn</h3>
                    <span className="px-2 py-0.5 bg-red-100 text-red-650 text-[11.5px] font-bold rounded-full">
                      {pendingRequests.length}
                    </span>
                  </div>
                </div>

                {pendingRequests.length > 0 ? (
                  pendingRequests.map((req) => (
                    <div 
                      key={req.id}
                      className="bg-white border border-slate-150 rounded-2xl p-5 flex items-center justify-between shadow-sm hover:shadow-md transition-all duration-300 relative group"
                    >
                      <div className="flex items-center gap-4">
                        <div 
                          onClick={() => setActiveProfileUser(req)}
                          className="w-13 h-13 rounded-xl bg-slate-100 overflow-hidden relative cursor-pointer"
                        >
                          <div className={`w-full h-full ${req.avatarBg} text-white font-bold text-[16px] flex items-center justify-center`}>
                            {req.avatar}
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <span 
                            onClick={() => setActiveProfileUser(req)}
                            className="text-[15px] font-bold text-slate-850 hover:text-[#0056C6] cursor-pointer"
                          >
                            {req.name}
                          </span>
                          <span className="text-[12px] text-slate-450 font-medium mt-0.5">
                            {req.mutualFriends} bạn chung • {req.time}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2.5 relative">
                        <button
                          onClick={() => handleAcceptRequest(req.id, req.name)}
                          className="h-8.5 px-4 bg-[#0056C6] hover:bg-[#0047A5] text-white text-[12.5px] font-bold rounded-lg shadow-sm cursor-pointer"
                        >
                          Đồng ý
                        </button>
                        <button
                          onClick={() => handleDeclineRequest(req.id, req.name)}
                          className="h-8.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-650 text-[12.5px] font-bold rounded-lg cursor-pointer"
                        >
                          Từ chối
                        </button>

                        <div className="relative">
                          <button
                            onClick={() => setActiveMenuRequestId(activeMenuRequestId === req.id ? null : req.id)}
                            className="w-8.5 h-8.5 flex items-center justify-center bg-slate-50 hover:bg-slate-100 text-slate-550 rounded-lg cursor-pointer"
                          >
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                          
                          {activeMenuRequestId === req.id && (
                            <div className="absolute right-0 mt-1.5 w-40 bg-white border border-slate-100 rounded-xl shadow-xl z-20 py-1.5 animate-fadeIn">
                              <button
                                onClick={() => {
                                  setActiveProfileUser(req)
                                  setActiveMenuRequestId(null)
                                }}
                                className="w-full px-4 py-2 text-left text-[12.5px] font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer focus:outline-none"
                              >
                                <Info className="w-4 h-4 text-blue-500" />
                                Xem thông tin
                              </button>
                              <button
                                onClick={() => handleConfirmBlock(req.id, req.name)}
                                className="w-full px-4 py-2 text-left text-[12.5px] font-bold text-red-650 hover:bg-red-50/55 flex items-center gap-2 cursor-pointer focus:outline-none"
                              >
                                <Ban className="w-4 h-4 text-red-500" />
                                Chặn người này
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex-1 bg-white border border-dashed border-slate-200 rounded-2xl p-12 flex flex-col items-center justify-center text-center shadow-sm my-6">
                    <div className="w-14 h-14 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 mb-4">
                      <Users className="w-6 h-6" />
                    </div>
                    <h4 className="text-[15px] font-bold text-slate-750">Không có lời mời kết bạn</h4>
                  </div>
                )}
              </div>
            )}
          </>
        )}

      </div>

      {/* Floating Action Button (FAB) at bottom-right */}
      <button 
        onClick={() => alert('Thêm bạn nhanh')}
        className="absolute bottom-6 right-6 w-12 h-12 rounded-full bg-[#0056C6] hover:bg-[#0047A5] text-white flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 cursor-pointer transition-all z-20 focus:outline-none"
        title="Thêm bạn bè nhanh"
      >
        <Plus className="w-6 h-6 stroke-[2.5]" />
      </button>

      {/* ======================================================== */}
      {/* FIGMA MODAL 1: Thông tin cá nhân (node-id: 22-337)       */}
      {/* ======================================================== */}
      {activeProfileUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-[1.5px] transition-opacity duration-300"
            onClick={() => setActiveProfileUser(null)}
          />
          
          <div className="relative bg-white rounded-2xl w-full max-w-[420px] mx-4 shadow-2xl border border-slate-100 z-50 overflow-hidden transform transition-all duration-300 scale-100 flex flex-col animate-scaleUp">
            
            <div className="h-[130px] bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-650 relative shrink-0">
              <button
                onClick={() => setActiveProfileUser(null)}
                className="absolute right-4 top-4 w-8 h-8 rounded-full bg-black/25 hover:bg-black/40 text-white flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-col items-center -mt-[50px] px-6 pb-6 relative shrink-0">
              <div className="w-[100px] h-[100px] rounded-full border-[4px] border-white shadow-md overflow-hidden bg-slate-200 flex items-center justify-center text-white font-extrabold text-[36px] shrink-0">
                <div className={`w-full h-full ${activeProfileUser.avatarBg || 'bg-slate-455'} flex items-center justify-center`}>
                  {activeProfileUser.avatar}
                </div>
              </div>
              <h3 className="text-[19px] font-bold text-slate-800 mt-3">{activeProfileUser.name}</h3>
              <p className="text-[12px] text-slate-400 font-semibold tracking-wide uppercase mt-0.5">
                {contacts.some(c => c.name === activeProfileUser.name) ? 'Bạn bè' : 'Người dùng'}
              </p>
            </div>

            <div className="px-6 pb-6 flex-1 overflow-y-auto">
              <div className="border-t border-slate-100 pt-5">
                <h4 className="text-[14px] font-extrabold text-slate-800 mb-4 uppercase tracking-wider">Thông tin cá nhân</h4>
                
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 shrink-0">
                      <Phone className="w-4.5 h-4.5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[11.5px] font-bold text-slate-400 leading-tight">Số điện thoại</span>
                      <span className="text-[14px] text-slate-700 font-medium mt-0.5">{activeProfileUser.phone || 'Chưa cung cấp'}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 shrink-0">
                      <User className="w-4.5 h-4.5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[11.5px] font-bold text-slate-400 leading-tight">Giới tính</span>
                      <span className="text-[14px] text-slate-700 font-medium mt-0.5">{activeProfileUser.gender || 'Chưa thiết lập'}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 shrink-0">
                      <Calendar className="w-4.5 h-4.5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[11.5px] font-bold text-slate-400 leading-tight">Ngày sinh</span>
                      <span className="text-[14px] text-slate-700 font-medium mt-0.5">{activeProfileUser.birthday || 'Chưa thiết lập'}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 shrink-0">
                      <MapPin className="w-4.5 h-4.5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[11.5px] font-bold text-slate-400 leading-tight">Địa chỉ</span>
                      <span className="text-[14px] text-slate-700 font-medium mt-0.5">{activeProfileUser.address || 'Chưa thiết lập'}</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            <div className="bg-slate-50/70 border-t border-slate-100 px-6 py-4.5 flex items-center gap-3 shrink-0">
              <button
                onClick={handleCopyLink}
                className="flex-1 h-11 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-[13.5px] font-bold rounded-xl flex items-center justify-center gap-2 cursor-pointer focus:outline-none"
              >
                <Copy className="w-4.5 h-4.5" />
                Sao chép link
              </button>
              
              <button
                onClick={() => {
                  alert(`Mở hộp thoại chat với ${activeProfileUser.name}`)
                  setActiveProfileUser(null)
                }}
                className="flex-1 h-11 bg-[#0056C6] hover:bg-[#0047A5] text-white text-[13.5px] font-bold rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer focus:outline-none"
              >
                <MessageSquare className="w-4.5 h-4.5" />
                Nhắn tin
              </button>

              {contacts.some(c => c.name === activeProfileUser.name) ? (
                <button
                  onClick={() => handleConfirmUnfriend(activeProfileUser.id, activeProfileUser.name)}
                  className="w-11 h-11 bg-white hover:bg-red-50 border border-slate-200 text-red-500 rounded-xl flex items-center justify-center cursor-pointer focus:outline-none"
                  title="Hủy kết bạn"
                >
                  <UserX className="w-4.5 h-4.5" />
                </button>
              ) : (
                <button
                  onClick={() => handleConfirmBlock(activeProfileUser.id, activeProfileUser.name)}
                  className="w-11 h-11 bg-white hover:bg-slate-150 border border-slate-200 text-slate-400 hover:text-slate-600 rounded-xl flex items-center justify-center cursor-pointer focus:outline-none"
                  title="Chặn liên lạc"
                >
                  <Ban className="w-4.5 h-4.5" />
                </button>
              )}
            </div>

          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* FIGMA MODAL 2: CONFIRMATION MODALS                       */}
      {/* ======================================================== */}
      {confirmModal.isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-[1.5px]"
            onClick={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
          />
          
          <div className="relative bg-white rounded-2xl p-6.5 max-w-[370px] w-full mx-4 shadow-2xl border border-slate-100 z-50 transform transition-all duration-300 scale-100 flex flex-col animate-scaleUp">
            
            <div className="w-13 h-13 rounded-full bg-red-50 text-red-650 flex items-center justify-center mb-4 shadow-inner">
              <ShieldAlert className="w-6.5 h-6.5" />
            </div>

            <h4 className="text-[17px] font-bold text-slate-800 mb-2">
              {confirmModal.type === 'unfriend' && 'Hủy kết bạn?'}
              {confirmModal.type === 'block' && 'Chặn người dùng?'}
              {confirmModal.type === 'unblock' && 'Bỏ chặn người dùng?'}
              {confirmModal.type === 'disband' && 'Giải tán nhóm?'}
            </h4>

            <p className="text-[13.2px] text-slate-500 leading-relaxed mb-6">
              {confirmModal.type === 'unfriend' && `Bạn có chắc chắn muốn hủy kết bạn với ${confirmModal.userName} không? Hai người sẽ không còn nằm trong danh sách bạn bè.`}
              {confirmModal.type === 'block' && `Bạn có chắc chắn muốn chặn ${confirmModal.userName} không? Người bị chặn sẽ không thể gửi tin nhắn hoặc gọi điện cho bạn.`}
              {confirmModal.type === 'unblock' && `Bạn có chắc chắn muốn bỏ chặn ${confirmModal.userName} không? Hai người sẽ có thể tiếp tục liên lạc lại.`}
              {confirmModal.type === 'disband' && `Bạn có chắc chắn muốn giải tán nhóm "${confirmModal.userName}" không? Tất cả thành viên sẽ bị xóa và lịch sử trò chuyện nhóm sẽ mất.`}
            </p>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
                className="flex-1 h-10 border border-slate-200 hover:bg-slate-55 text-slate-600 text-[13.5px] font-bold rounded-xl cursor-pointer"
              >
                Hủy
              </button>
              <button
                onClick={() => {
                  if (confirmModal.type === 'unfriend') executeUnfriend()
                  if (confirmModal.type === 'block') executeBlock()
                  if (confirmModal.type === 'unblock') executeUnblock()
                  if (confirmModal.type === 'disband') executeDisband()
                }}
                className="flex-1 h-10 text-white text-[13.5px] font-bold rounded-xl shadow-sm cursor-pointer bg-red-600 hover:bg-red-700"
              >
                Đồng ý
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* FIGMA MODAL 3: ALERTS SUCCESS FEEDBACKS                  */}
      {/* ======================================================== */}
      {successModal.isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-[1.5px]"
            onClick={() => setSuccessModal(prev => ({ ...prev, isOpen: false }))}
          />
          
          <div className="relative bg-white rounded-2xl p-8 max-w-[350px] w-full mx-4 shadow-2xl border border-slate-100 z-50 flex flex-col items-center text-center animate-scaleUp">
            
            <div className="w-15 h-15 rounded-full bg-blue-50 text-[#0056C6] flex items-center justify-center mb-4.5 shadow-inner">
              <Check className="w-7.5 h-7.5 stroke-[3]" />
            </div>

            {successModal.type === 'accepted' && (
              <>
                <h4 className="text-[17.5px] font-bold text-slate-800 mb-2">Kết nối thành công!</h4>
                <p className="text-[13px] text-slate-450 leading-relaxed mb-6">
                  Bạn và <span className="font-bold text-slate-700">{successModal.userName}</span> đã trở thành bạn bè trên Messenger.
                </p>
                <div className="flex flex-col gap-2 w-full">
                  <button
                    onClick={() => {
                      setSuccessModal(prev => ({ ...prev, isOpen: false }))
                      alert(`Đang mở chat với ${successModal.userName}`)
                    }}
                    className="w-full h-10.5 bg-[#0056C6] hover:bg-[#0047A5] text-white text-[13.5px] font-bold rounded-xl cursor-pointer"
                  >
                    Nhắn tin ngay
                  </button>
                  <button
                    onClick={() => setSuccessModal(prev => ({ ...prev, isOpen: false }))}
                    className="w-full h-10.5 border border-slate-200 hover:bg-slate-50 text-slate-600 text-[13.5px] font-bold rounded-xl cursor-pointer"
                  >
                    Đóng
                  </button>
                </div>
              </>
            )}

            {successModal.type === 'declined' && (
              <>
                <h4 className="text-[17.5px] font-bold text-slate-850 mb-2">Từ chối thành công</h4>
                <p className="text-[13px] text-slate-450 leading-relaxed mb-6">
                  Đã từ chối lời mời kết bạn từ <span className="font-bold text-slate-700">{successModal.userName}</span> thành công.
                </p>
                <button
                  onClick={() => setSuccessModal(prev => ({ ...prev, isOpen: false }))}
                  className="w-full h-10.5 bg-[#0056C6] hover:bg-[#0047A5] text-white text-[13.5px] font-bold rounded-xl cursor-pointer"
                >
                  Đóng
                </button>
              </>
            )}

            {successModal.type === 'unfriended' && (
              <>
                <h4 className="text-[17.5px] font-bold text-slate-800 mb-2">Hủy kết bạn thành công</h4>
                <p className="text-[13px] text-slate-450 leading-relaxed mb-6">
                  Đã gỡ kết bạn với <span className="font-bold text-slate-700">{successModal.userName}</span>.
                </p>
                <button
                  onClick={() => setSuccessModal(prev => ({ ...prev, isOpen: false }))}
                  className="w-full h-10.5 bg-[#0056C6] hover:bg-[#0047A5] text-white text-[13.5px] font-bold rounded-xl cursor-pointer"
                >
                  Đóng
                </button>
              </>
            )}

            {successModal.type === 'blocked' && (
              <>
                <h4 className="text-[17.5px] font-bold text-slate-805 mb-2">Chặn thành công</h4>
                <p className="text-[13px] text-slate-455 leading-relaxed mb-6">
                  Đã chặn liên lạc với <span className="font-bold text-slate-700">{successModal.userName}</span>.
                </p>
                <button
                  onClick={() => setSuccessModal(prev => ({ ...prev, isOpen: false }))}
                  className="w-full h-10.5 bg-[#0056C6] hover:bg-[#0047A5] text-white text-[13.5px] font-bold rounded-xl cursor-pointer"
                >
                  Đóng
                </button>
              </>
            )}

            {successModal.type === 'unblocked' && (
              <>
                <h4 className="text-[17.5px] font-bold text-slate-800 mb-2">Bỏ chặn thành công</h4>
                <p className="text-[13px] text-slate-450 leading-relaxed mb-6">
                  Đã gỡ chặn cho <span className="font-bold text-slate-700">{successModal.userName}</span>. Các bạn có thể liên lạc lại.
                </p>
                <button
                  onClick={() => setSuccessModal(prev => ({ ...prev, isOpen: false }))}
                  className="w-full h-10.5 bg-[#0056C6] hover:bg-[#0047A5] text-white text-[13.5px] font-bold rounded-xl cursor-pointer"
                >
                  Đóng
                </button>
              </>
            )}

            {successModal.type === 'disbanded' && (
              <>
                <h4 className="text-[17.5px] font-bold text-slate-850 mb-2">Giải tán thành công</h4>
                <p className="text-[13px] text-slate-450 leading-relaxed mb-6">
                  Đã giải tán nhóm trò chuyện <span className="font-bold text-slate-700">{successModal.userName}</span> thành công.
                </p>
                <button
                  onClick={() => setSuccessModal(prev => ({ ...prev, isOpen: false }))}
                  className="w-full h-10.5 bg-[#0056C6] hover:bg-[#0047A5] text-white text-[13.5px] font-bold rounded-xl cursor-pointer"
                >
                  Đóng
                </button>
              </>
            )}

          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* FIGMA MODAL 4: Danh sách chặn (node-id: 214-228)         */}
      {/* ======================================================== */}
      {showBlockedList && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-[1.5px]"
            onClick={() => setShowBlockedList(false)}
          />
          
          <div className="relative bg-white rounded-2xl p-6.5 max-w-[420px] w-full mx-4 shadow-2xl border border-slate-100 z-50 flex flex-col max-h-[80vh] animate-scaleUp">
            
            <div className="flex items-center justify-between mb-5 shrink-0">
              <div className="flex items-center gap-2">
                <Ban className="w-5 h-5 text-red-500" />
                <h3 className="text-[17px] font-bold text-slate-805">Danh sách chặn</h3>
              </div>
              <button
                onClick={() => setShowBlockedList(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-650 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-3.5">
              {blockedUsers.length > 0 ? (
                blockedUsers.map((user) => (
                  <div 
                    key={user.id}
                    className="bg-slate-50 border border-slate-100 rounded-xl p-3 px-4 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl ${user.avatarBg} text-white font-bold text-[13.5px] flex items-center justify-center shadow-sm shrink-0`}>
                        {user.avatar}
                      </div>
                      <span className="text-[14px] font-bold text-slate-700">{user.name}</span>
                    </div>

                    <button
                      onClick={() => {
                        setShowBlockedList(false)
                        handleConfirmUnblock(user.id, user.name)
                      }}
                      className="h-8.5 px-3.5 bg-rose-50 hover:bg-rose-100 border border-rose-100 text-rose-650 text-[12.5px] font-bold rounded-lg cursor-pointer transition-colors"
                    >
                      Bỏ chặn
                    </button>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center text-center py-8 text-slate-400">
                  <span className="text-sm font-semibold">Danh sách chặn trống</span>
                </div>
              )}
            </div>

            <div className="border-t border-slate-100 pt-4 mt-4 text-right shrink-0">
              <button
                onClick={() => setShowBlockedList(false)}
                className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-600 text-[13px] font-bold rounded-xl cursor-pointer"
              >
                Đóng
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* FIGMA MODAL 5: Tạo Nhóm Mới (node-id: 24-1238)           */}
      {/* ======================================================== */}
      {showCreateGroup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop overlay */}
          <div 
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-[1.5px]"
            onClick={() => setShowCreateGroup(false)}
          />
          
          {/* Modal Container */}
          <form 
            onSubmit={handleCreateGroupSubmit}
            className="relative bg-white rounded-2xl p-6.5 max-w-[420px] w-full mx-4 shadow-2xl border border-slate-100 z-50 flex flex-col max-h-[85vh] animate-scaleUp"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-5 shrink-0">
              <h3 className="text-[17.5px] font-extrabold text-slate-800">Tạo nhóm mới</h3>
              <button
                type="button"
                onClick={() => setShowCreateGroup(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-650 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Input group name */}
            <div className="flex flex-col gap-1.5 mb-5 shrink-0">
              <label className="text-[13px] font-bold text-slate-700">Tên nhóm</label>
              <input
                type="text"
                required
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
                placeholder="Nhập tên nhóm trò chuyện..."
                className="w-full h-11 px-3.5 border border-slate-250 rounded-xl text-[14.2px] text-slate-800 focus:outline-none focus:border-[#0056C6] focus:ring-1 focus:ring-[#0056C6]"
              />
            </div>

            {/* Friends list selection */}
            <div className="flex flex-col gap-1.5 flex-1 overflow-hidden mb-6">
              <label className="text-[13px] font-bold text-slate-750 shrink-0">Thêm thành viên ({selectedGroupMembers.length})</label>
              <div className="flex-1 overflow-y-auto pr-1 border border-slate-150 rounded-xl p-2 flex flex-col gap-2 bg-slate-50/50">
                {contacts.map((contact) => {
                  const isChecked = selectedGroupMembers.includes(contact.name)
                  return (
                    <div 
                      key={contact.id}
                      onClick={() => handleToggleGroupMember(contact.name)}
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-white border border-transparent hover:border-slate-100 cursor-pointer select-none transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-lg ${contact.avatarBg} text-white font-bold text-[12px] flex items-center justify-center shadow-sm`}>
                          {contact.avatar}
                        </div>
                        <span className="text-[14.2px] font-bold text-slate-700">{contact.name}</span>
                      </div>
                      
                      {/* Checkbox indicator */}
                      <div className={`w-5.5 h-5.5 rounded-md border flex items-center justify-center transition-all ${
                        isChecked 
                          ? 'bg-[#0056C6] border-[#0056C6] text-white shadow-sm' 
                          : 'border-slate-300 bg-white'
                      }`}>
                        {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 border-t border-slate-100 pt-4 shrink-0">
              <button
                type="button"
                onClick={() => setShowCreateGroup(false)}
                className="flex-1 h-11 border border-slate-200 hover:bg-slate-50 text-slate-600 text-[13.5px] font-bold rounded-xl cursor-pointer"
              >
                Hủy
              </button>
              <button
                type="submit"
                disabled={!newGroupName.trim() || selectedGroupMembers.length === 0}
                className={`flex-1 h-11 text-white text-[13.5px] font-bold rounded-xl shadow-sm transition-all ${
                  newGroupName.trim() && selectedGroupMembers.length > 0
                    ? 'bg-[#0056C6] hover:bg-[#0047A5] cursor-pointer'
                    : 'bg-slate-200 text-slate-450 cursor-not-allowed'
                }`}
              >
                Tạo nhóm
              </button>
            </div>

          </form>
        </div>
      )}

    </div>
  )
}
