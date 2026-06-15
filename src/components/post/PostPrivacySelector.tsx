import React, { useState, useRef, useEffect } from 'react'
import { Globe, Users, Lock, UserPlus, ChevronDown, Check } from 'lucide-react'

export interface PrivacyOption {
  id: string
  label: string
  desc: string
  icon: React.ComponentType<{ className?: string }>
}

export const privacyOptions: PrivacyOption[] = [
  { id: 'public', label: 'Công khai', desc: 'Bất kỳ ai trên hoặc ngoài ứng dụng', icon: Globe },
  { id: 'friends', label: 'Bạn bè', desc: 'Chỉ bạn bè của bạn trên ứng dụng', icon: Users },
  { id: 'only_me', label: 'Chỉ mình tôi', desc: 'Chỉ mình bạn có thể xem bài viết này', icon: Lock },
  { id: 'specific', label: 'Bạn bè cụ thể', desc: 'Chỉ hiển thị với một số người bạn nhất định', icon: UserPlus }
]

interface PostPrivacySelectorProps {
  selectedPrivacy: string
  onSelectPrivacy: (privacyId: string) => void
}

export const PostPrivacySelector: React.FC<PostPrivacySelectorProps> = ({
  selectedPrivacy,
  onSelectPrivacy
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const activeOption = privacyOptions.find(opt => opt.id === selectedPrivacy) || privacyOptions[0]
  const ActiveIcon = activeOption.icon

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-800 rounded-md text-[11px] font-bold cursor-pointer transition-colors duration-150 focus:outline-none"
      >
        <ActiveIcon className="w-3.5 h-3.5 text-slate-500" />
        <span>{activeOption.label}</span>
        <ChevronDown className="w-3 h-3 opacity-60 ml-0.5" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-0 mt-1.5 bg-white border border-slate-200 rounded-xl shadow-2xl z-50 p-2 w-[340px] overflow-hidden animate-scaleUp">
          
          <div className="px-2.5 py-2 border-b border-slate-100 mb-1">
            <h4 className="text-[12.5px] font-bold text-slate-800">Chọn đối tượng</h4>
            <p className="text-[10px] font-bold text-slate-400 mt-0.5 leading-relaxed">
              Ai có thể xem bài viết của bạn?
            </p>
          </div>

          <div className="flex flex-col">
            {privacyOptions.map((option) => {
              const Icon = option.icon
              const isChecked = selectedPrivacy === option.id
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => {
                    onSelectPrivacy(option.id)
                    setIsOpen(false)
                  }}
                  className="w-full flex items-center justify-between p-2 hover:bg-slate-50 rounded-lg text-left transition-colors cursor-pointer focus:outline-none group"
                >
                  <div className="flex items-center gap-2.5 min-w-0 flex-1">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                      isChecked 
                        ? 'bg-[#E8F1FF] text-[#0056C6]' 
                        : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200 group-hover:text-slate-700'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[12px] font-bold text-slate-850 truncate leading-snug">{option.label}</span>
                      <span className="text-[10px] font-semibold text-slate-450 leading-snug break-words pr-2">{option.desc}</span>
                    </div>
                  </div>

                  {/* Radio indicator */}
                  <div className={`w-4.5 h-4.5 rounded-full border flex items-center justify-center transition-all duration-150 shrink-0 ${
                    isChecked 
                      ? 'border-[#0056C6] bg-[#0056C6]' 
                      : 'border-slate-300 bg-white group-hover:border-slate-400'
                  }`}>
                    {isChecked && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                </button>
              )
            })}
          </div>

        </div>
      )}
    </div>
  )
}
