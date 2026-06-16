import React, { useState } from 'react'
import { X, Check, Image as ImageIcon, Upload } from 'lucide-react'

interface ImageSelectorModalProps {
  initialSelected: string[]
  onClose: () => void
  onSave: (selectedUrls: string[]) => void
}

const defaultImages = [
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&auto=format&fit=crop', // forest
  'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400&auto=format&fit=crop', // lake
  'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&auto=format&fit=crop', // grass
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&auto=format&fit=crop', // mountain
  'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&auto=format&fit=crop', // field
  'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=400&auto=format&fit=crop', // starry sky
  'https://images.unsplash.com/photo-1472214222555-d404758b4342?w=400&auto=format&fit=crop', // sunset
  'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=400&auto=format&fit=crop'  // waterfall
]

// Additional backup images for "Tải ảnh lên" simulation
const uploadPool = [
  'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=400&auto=format&fit=crop', // beach
  'https://images.unsplash.com/photo-1433832597046-4f10e10ac764?w=400&auto=format&fit=crop', // balloon
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&auto=format&fit=crop'  // ocean
]

export const ImageSelectorModal: React.FC<ImageSelectorModalProps> = ({
  initialSelected,
  onClose,
  onSave
}) => {
  const [availableImages, setAvailableImages] = useState<string[]>(defaultImages)
  const [selected, setSelected] = useState<string[]>(initialSelected)
  const [uploadIndex, setUploadIndex] = useState(0)

  const handleToggle = (url: string) => {
    if (selected.includes(url)) {
      setSelected(selected.filter(item => item !== url))
    } else {
      if (selected.length >= 10) {
        alert('Bạn chỉ có thể chọn tối đa 10 hình ảnh.')
        return
      }
      setSelected([...selected, url])
    }
  }

  // Simulate uploading a new image
  const handleUploadClick = () => {
    if (uploadIndex >= uploadPool.length) {
      alert('Không còn hình ảnh mẫu để tải lên.')
      return
    }
    const newImgUrl = uploadPool[uploadIndex]
    setAvailableImages([...availableImages, newImgUrl])
    setSelected([...selected, newImgUrl])
    setUploadIndex(uploadIndex + 1)
  }

  const handleSave = () => {
    onSave(selected)
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-[1.5px] transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Card Container */}
      <div className="relative bg-white rounded-2xl shadow-2xl border border-slate-200/80 w-full max-w-[650px] overflow-hidden flex flex-col z-10 animate-scaleUp text-slate-800 font-sans">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-[#1877F2] font-bold text-[16px]">
            <ImageIcon className="w-5 h-5" />
            <span>Chọn ảnh</span>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-650 transition-colors cursor-pointer focus:outline-none"
            title="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Subheader action line */}
        <div className="px-5 py-3 bg-slate-50/50 border-b border-slate-100 flex items-center justify-between gap-4 shrink-0">
          <p className="text-[12.5px] font-bold text-slate-400 leading-snug">
            Chọn tối đa 10 hình ảnh để tải lên bài viết của bạn.
          </p>
          <button
            type="button"
            onClick={handleUploadClick}
            className="h-9 px-3.5 bg-blue-50 hover:bg-blue-100 text-[#1877F2] font-bold text-[12.5px] rounded-lg cursor-pointer transition-colors duration-150 flex items-center gap-1.5 focus:outline-none shrink-0"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Tải ảnh lên</span>
          </button>
        </div>

        {/* Image Grid Content (Scrollable) */}
        <div className="p-5 overflow-y-auto max-h-[380px] scrollbar-none">
          <div className="grid grid-cols-4 gap-3">
            {availableImages.map((url, index) => {
              const isSelected = selected.includes(url)
              return (
                <div
                  key={index}
                  onClick={() => handleToggle(url)}
                  className={`aspect-square rounded-xl overflow-hidden relative cursor-pointer group/img transition-all duration-150 border-2 select-none ${
                    isSelected 
                      ? 'border-[#1877F2] ring-2 ring-[#1877F2]/20 scale-98 shadow-sm' 
                      : 'border-transparent hover:scale-102 hover:shadow'
                  }`}
                >
                  <img
                    src={url}
                    alt={`Selectable ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover/img:scale-105"
                  />

                  {/* Checkmark overlay badge */}
                  {isSelected && (
                    <div className="absolute inset-0 bg-[#1877F2]/10 flex items-center justify-center">
                      <div className="w-7 h-7 rounded-full bg-green-500 flex items-center justify-center text-white shadow-md animate-scaleUp">
                        <Check className="w-4 h-4 stroke-[3]" />
                      </div>
                    </div>
                  )}

                  {/* Hover visual feedback outline */}
                  {!isSelected && (
                    <div className="absolute inset-0 border border-black/5 opacity-0 group-hover/img:opacity-100 rounded-xl pointer-events-none transition-opacity duration-150" />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="border-t border-slate-100 px-5 py-4 flex items-center justify-between bg-slate-50/50 shrink-0">
          <span className="text-[13px] font-bold text-slate-500">
            {selected.length} ảnh đã chọn
          </span>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onClose}
              className="text-[13px] font-bold text-slate-500 hover:text-[#1877F2] hover:underline cursor-pointer transition-colors focus:outline-none"
            >
              Hủy bỏ
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-6 py-2 bg-[#1877F2] hover:bg-[#156BEC] active:bg-[#1054C7] text-white font-bold text-[13.5px] rounded-lg shadow-sm hover:shadow active:scale-97 transition-all cursor-pointer focus:outline-none"
            >
              Xong
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}
