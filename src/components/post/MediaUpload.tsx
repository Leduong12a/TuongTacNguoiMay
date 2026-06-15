import React from 'react'
import { X, Image as ImageIcon } from 'lucide-react'

interface MediaUploadProps {
  images: string[]
  onRemoveAll: () => void
  onEdit: () => void
}

export const MediaUpload: React.FC<MediaUploadProps> = ({
  images,
  onRemoveAll,
  onEdit
}) => {
  if (images.length === 0) return null

  return (
    <div className="relative border border-slate-200/80 rounded-2xl p-1.5 bg-[#F8F9FA] group shadow-inner">
      {/* Remove all button */}
      <button
        type="button"
        onClick={onRemoveAll}
        className="absolute top-4 right-4 z-10 p-1.5 bg-slate-900/60 hover:bg-slate-900/80 text-white rounded-full transition-colors duration-150 focus:outline-none cursor-pointer"
        title="Gỡ ảnh"
      >
        <X className="w-4 h-4" />
      </button>

      {/* Images Grid */}
      <div className={`grid gap-1.5 overflow-hidden rounded-xl h-[220px] ${
        images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'
      }`}>
        {images.map((imgUrl, idx) => (
          <div key={idx} className="relative w-full h-full group/item overflow-hidden bg-slate-100">
            <img
              src={imgUrl}
              alt={`Post attachment ${idx + 1}`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover/item:scale-103"
            />

            {/* "Chỉnh sửa" overlay button on the first image */}
            {idx === 0 && (
              <button
                type="button"
                onClick={onEdit}
                className="absolute bottom-3 left-3 bg-white/90 hover:bg-white backdrop-blur-sm border border-slate-200/80 px-3 py-1.5 rounded-lg text-[11px] font-bold text-slate-700 hover:text-slate-900 flex items-center gap-1.5 shadow-sm hover:shadow active:scale-95 transition-all cursor-pointer focus:outline-none"
              >
                <ImageIcon className="w-3.5 h-3.5 text-slate-500" />
                <span>Chỉnh sửa</span>
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
