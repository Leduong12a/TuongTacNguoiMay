import React, { useState } from 'react'
import { X, Search, Check, User } from 'lucide-react'

interface Friend {
  id: string
  name: string
  avatarUrl: string
}

interface TagFriendsModalProps {
  initialSelected: string[]
  onClose: () => void
  onSave: (selectedNames: string[]) => void
}

const mockFriends: Friend[] = [
  { id: '1', name: 'Nguyễn Văn A', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop' },
  { id: '2', name: 'Trần Thị B', avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop' },
  { id: '3', name: 'Lê Văn C', avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop' },
  { id: '4', name: 'Phạm Thị D', avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop' },
  { id: '5', name: 'Hoàng Văn E', avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop' },
  { id: '6', name: 'Đặng Thị F', avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop' }
]

export const TagFriendsModal: React.FC<TagFriendsModalProps> = ({
  initialSelected,
  onClose,
  onSave
}) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selected, setSelected] = useState<string[]>(initialSelected)

  const handleToggle = (name: string) => {
    if (selected.includes(name)) {
      setSelected(selected.filter(item => item !== name))
    } else {
      setSelected([...selected, name])
    }
  }

  const handleSave = () => {
    onSave(selected)
  }

  const filteredFriends = mockFriends.filter(friend =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-[1.5px] transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Card Container */}
      <div className="relative bg-white rounded-2xl shadow-2xl border border-slate-200/80 w-full max-w-[420px] overflow-hidden flex flex-col z-10 animate-scaleUp text-slate-800 font-sans">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between shrink-0">
          <h3 className="text-[16px] font-bold text-slate-800">Gắn thẻ bạn bè</h3>
          <button 
            onClick={onClose}
            className="p-1.5 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-650 transition-colors cursor-pointer focus:outline-none"
            title="Đóng"
          >
            <X className="w-4.5 h-4.5" />
          </button>
        </div>

        {/* Content body */}
        <div className="p-4 flex flex-col gap-4 overflow-hidden flex-1">
          
          {/* Search Input */}
          <div className="relative w-full shrink-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm bạn bè"
              className="w-full h-11 pl-10 pr-4 rounded-xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-[#1877F2] focus:ring-1 focus:ring-[#1877F2] focus:outline-none text-[13.5px] text-slate-700 font-medium transition-all duration-150 placeholder-slate-400"
            />
          </div>

          {/* Friends List (Scrollable) */}
          <div className="flex-1 overflow-y-auto space-y-2 max-h-[320px] pr-1 scrollbar-none">
            {filteredFriends.map((friend) => {
              const isChecked = selected.includes(friend.name)
              return (
                <div
                  key={friend.id}
                  onClick={() => handleToggle(friend.name)}
                  className="flex items-center justify-between py-2.5 px-2 hover:bg-slate-50/60 rounded-xl cursor-pointer transition-colors duration-150 select-none group"
                >
                  {/* Left: Avatar + Name */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-200 border border-slate-100 flex items-center justify-center text-slate-500 overflow-hidden shadow-inner shrink-0">
                      <img 
                        src={friend.avatarUrl} 
                        alt={friend.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none'
                        }}
                      />
                      <User className="w-4.5 h-4.5 text-slate-400" />
                    </div>
                    <span className="text-[13.5px] font-bold text-slate-800 leading-snug">
                      {friend.name}
                    </span>
                  </div>

                  {/* Right: Custom Checkbox */}
                  <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all duration-150 shrink-0 ${
                    isChecked 
                      ? 'border-[#1877F2] bg-[#1877F2]' 
                      : 'border-slate-300 bg-white group-hover:border-slate-450'
                  }`}>
                    {isChecked && <Check className="w-3.5 h-3.5 text-white stroke-[3.5] animate-scaleUp" />}
                  </div>
                </div>
              )
            })}

            {filteredFriends.length === 0 && (
              <div className="text-center py-12 text-slate-400 font-semibold text-sm">
                Không tìm thấy bạn bè nào
              </div>
            )}
          </div>

        </div>

        {/* Footer Action Button */}
        <div className="p-4 border-t border-slate-100 bg-white shrink-0">
          <button
            type="button"
            onClick={handleSave}
            className="w-full h-11 bg-[#1877F2] hover:bg-[#156BEC] active:bg-[#1054C7] text-white font-bold text-[14px] rounded-lg shadow-sm hover:shadow active:scale-98 transition-all duration-150 cursor-pointer flex items-center justify-center focus:outline-none"
          >
            Xong
          </button>
        </div>

      </div>
    </div>
  )
}
