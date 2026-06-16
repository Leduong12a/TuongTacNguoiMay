import React, { useState } from 'react'
import { X, Search, ArrowLeft, Trash2 } from 'lucide-react'

export interface FeelingItem {
  emoji: string
  label: string
}

interface FeelingSelectorModalProps {
  currentFeeling: FeelingItem | null
  onClose: () => void
  onSelect: (feeling: FeelingItem | null) => void
}

const mockFeelings: FeelingItem[] = [
  { emoji: '😃', label: 'Hạnh phúc' },
  { emoji: '🥰', label: 'Được yêu' },
  { emoji: '🥳', label: 'Hào hứng' },
  { emoji: '😌', label: 'Bình yên' },
  { emoji: '😎', label: 'Tuyệt vời' },
  { emoji: '😇', label: 'Biết ơn' },
  { emoji: '💪', label: 'Mạnh mẽ' },
  { emoji: '🤔', label: 'Đang suy nghĩ' },
  { emoji: '😢', label: 'Buồn' },
  { emoji: '😴', label: 'Mệt mỏi' }
]

export const FeelingSelectorModal: React.FC<FeelingSelectorModalProps> = ({
  currentFeeling,
  onClose,
  onSelect
}) => {
  const [activeTab, setActiveTab] = useState<'emotions' | 'activities'>('emotions')
  const [searchQuery, setSearchQuery] = useState('')
  const [tempSelected, setTempSelected] = useState<FeelingItem | null>(currentFeeling)

  const filteredFeelings = mockFeelings.filter(feel =>
    feel.label.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleConfirm = () => {
    onSelect(tempSelected)
    onClose()
  }

  const handleToggle = (feel: FeelingItem) => {
    if (tempSelected && tempSelected.label === feel.label) {
      setTempSelected(null) // toggle off if clicked again
    } else {
      setTempSelected(feel)
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-[1.5px] transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Card Container */}
      <div className="relative bg-white rounded-2xl shadow-2xl border border-slate-200/80 w-full max-w-[420px] overflow-hidden flex flex-col z-10 animate-scaleUp text-slate-800 font-sans">
        
        {/* Header with back button */}
        <div className="px-4 py-4 border-b border-slate-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <button 
              onClick={onClose}
              className="p-1 hover:bg-slate-100 rounded-full text-slate-500 hover:text-slate-700 transition-colors cursor-pointer focus:outline-none"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <span className="text-[14.5px] font-bold text-slate-800">Bạn đang cảm thấy thế nào?</span>
          </div>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-650 transition-colors cursor-pointer focus:outline-none"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-100 shrink-0 text-sm font-bold text-slate-500">
          <button
            type="button"
            onClick={() => setActiveTab('emotions')}
            className={`flex-1 py-3 text-center border-b-2 transition-all duration-150 cursor-pointer focus:outline-none ${
              activeTab === 'emotions'
                ? 'border-[#1877F2] text-[#1877F2]'
                : 'border-transparent hover:bg-slate-50 text-slate-500'
            }`}
          >
            Cảm xúc
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('activities')}
            className={`flex-1 py-3 text-center border-b-2 transition-all duration-150 cursor-pointer focus:outline-none ${
              activeTab === 'activities'
                ? 'border-[#1877F2] text-[#1877F2]'
                : 'border-transparent hover:bg-slate-50 text-slate-500'
            }`}
          >
            Hoạt động
          </button>
        </div>

        {/* Search & Grid Content */}
        <div className="p-4 flex flex-col gap-4 overflow-hidden flex-1">
          
          {/* Search Input */}
          <div className="relative w-full shrink-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm cảm xúc hoặc hoạt động..."
              className="w-full h-11 pl-10 pr-4 rounded-xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-[#1877F2] focus:ring-1 focus:ring-[#1877F2] focus:outline-none text-[13.5px] text-slate-700 font-medium transition-all duration-150 placeholder-slate-400"
            />
          </div>

          {activeTab === 'emotions' ? (
            /* Grid layout for emotions (2 columns) */
            <div className="flex-1 overflow-y-auto space-y-3 pr-1 max-h-[280px] scrollbar-none">
              
              {/* Option to clear feeling if one is chosen */}
              {tempSelected && (
                <div
                  onClick={() => setTempSelected(null)}
                  className="flex items-center gap-3 p-2.5 bg-red-50/50 hover:bg-red-50 border border-dashed border-red-200/50 rounded-xl cursor-pointer transition-colors duration-150 select-none shrink-0"
                >
                  <div className="w-8 h-8 rounded-full bg-red-100 text-red-550 flex items-center justify-center shrink-0">
                    <Trash2 className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[12.5px] font-bold text-red-650 leading-snug">
                      Gỡ cảm xúc hiện tại
                    </span>
                    <span className="text-[10px] font-bold text-red-400 mt-0.5 leading-snug">
                      Xóa "{tempSelected.emoji} {tempSelected.label}" khỏi bài viết
                    </span>
                  </div>
                </div>
              )}

              {/* Feelings Grid */}
              <div className="grid grid-cols-2 gap-2 pb-2">
                {filteredFeelings.map((feel, idx) => {
                  const isSelected = tempSelected?.label === feel.label
                  return (
                    <div
                      key={idx}
                      onClick={() => handleToggle(feel)}
                      className={`flex items-center gap-2.5 p-3 rounded-xl border cursor-pointer select-none transition-all duration-150 group ${
                        isSelected 
                          ? 'border-[#1877F2] bg-[#E8F1FF]/50 text-[#1877F2]' 
                          : 'border-slate-100 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-200 text-slate-700'
                      }`}
                    >
                      <span className="text-[18px] shrink-0 leading-none">{feel.emoji}</span>
                      <span className={`text-[12.5px] font-bold truncate leading-none ${
                        isSelected ? 'text-[#1877F2]' : 'text-slate-700 group-hover:text-slate-800'
                      }`}>
                        {feel.label}
                      </span>
                    </div>
                  )
                })}
              </div>

              {filteredFeelings.length === 0 && (
                <div className="text-center py-12 text-slate-400 font-semibold text-xs">
                  Không tìm thấy cảm xúc nào
                </div>
              )}
            </div>
          ) : (
            /* Activities list placeholder */
            <div className="flex-1 flex flex-col items-center justify-center py-12 text-slate-400 font-semibold text-xs gap-2 shrink-0">
              <span>Tính năng Hoạt động đang được phát triển</span>
              <span className="text-[10.5px] font-bold text-slate-350">Vui lòng chọn tab Cảm xúc</span>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50 shrink-0 flex items-center justify-end gap-3.5">
          <button
            type="button"
            onClick={onClose}
            className="text-[13.5px] font-bold text-slate-500 hover:text-slate-700 hover:underline cursor-pointer focus:outline-none"
          >
            Bỏ qua
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="px-5 py-2 bg-[#1877F2] hover:bg-[#156BEC] active:bg-[#1054C7] text-white font-bold text-[13.5px] rounded-lg shadow-sm hover:shadow active:scale-97 transition-all cursor-pointer focus:outline-none"
          >
            Xác nhận
          </button>
        </div>

      </div>
    </div>
  )
}
