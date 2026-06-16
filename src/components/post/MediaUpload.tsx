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

  const renderGrid = () => {
    const editButton = (
      <button
        type="button"
        onClick={onEdit}
        className="absolute bottom-3 left-3 bg-white/95 hover:bg-white backdrop-blur-sm border border-slate-200/80 px-3 py-1.5 rounded-lg text-[11px] font-bold text-slate-700 hover:text-slate-900 flex items-center gap-1.5 shadow-sm hover:shadow active:scale-95 transition-all cursor-pointer focus:outline-none z-10"
      >
        <ImageIcon className="w-3.5 h-3.5 text-slate-500" />
        <span>Chỉnh sửa</span>
      </button>
    )

    if (images.length === 1) {
      return (
        <div className="relative w-full h-[220px] rounded-xl overflow-hidden bg-slate-100 group/item">
          <img
            src={images[0]}
            alt="Post attachment"
            className="w-full h-full object-cover transition-transform duration-300 group-hover/item:scale-102"
          />
          {editButton}
        </div>
      )
    }

    if (images.length === 2) {
      return (
        <div className="grid grid-cols-2 gap-1.5 overflow-hidden rounded-xl h-[220px]">
          {images.map((imgUrl, idx) => (
            <div key={idx} className="relative w-full h-full group/item overflow-hidden bg-slate-100">
              <img
                src={imgUrl}
                alt={`Post attachment ${idx + 1}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover/item:scale-102"
              />
              {idx === 0 && editButton}
            </div>
          ))}
        </div>
      )
    }

    if (images.length === 3) {
      return (
        <div className="grid grid-cols-3 gap-1.5 overflow-hidden rounded-xl h-[220px]">
          {/* Left Large Column */}
          <div className="col-span-2 relative w-full h-full group/item overflow-hidden bg-slate-100">
            <img
              src={images[0]}
              alt="Post attachment 1"
              className="w-full h-full object-cover transition-transform duration-300 group-hover/item:scale-102"
            />
            {editButton}
          </div>
          {/* Right Small Column Stacked */}
          <div className="col-span-1 flex flex-col gap-1.5 h-full">
            <img
              src={images[1]}
              alt="Post attachment 2"
              className="w-full h-[calc(50%-3px)] object-cover rounded-md"
            />
            <img
              src={images[2]}
              alt="Post attachment 3"
              className="w-full h-[calc(50%-3px)] object-cover rounded-md"
            />
          </div>
        </div>
      )
    }

    // 4 or more images
    return (
      <div className="grid grid-cols-3 gap-1.5 overflow-hidden rounded-xl h-[220px]">
        {/* Left Large Column */}
        <div className="col-span-2 relative w-full h-full group/item overflow-hidden bg-slate-100">
          <img
            src={images[0]}
            alt="Post attachment 1"
            className="w-full h-full object-cover transition-transform duration-300 group-hover/item:scale-102"
          />
          {editButton}
        </div>
        {/* Right Small Column Stacked */}
        <div className="col-span-1 flex flex-col gap-1.5 h-full">
          <img
            src={images[1]}
            alt="Post attachment 2"
            className="w-full h-[calc(33.33%-3px)] object-cover rounded-md"
          />
          <img
            src={images[2]}
            alt="Post attachment 3"
            className="w-full h-[calc(33.33%-3px)] object-cover rounded-md"
          />
          <div className="relative w-full h-[calc(33.33%-3px)] bg-slate-100 rounded-md overflow-hidden">
            <img
              src={images[3]}
              alt="Post attachment 4"
              className="w-full h-full object-cover"
            />
            {images.length > 4 && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white font-bold text-[14px]">
                +{images.length - 3}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative border border-slate-200/80 rounded-2xl p-1.5 bg-[#F8F9FA] group shadow-inner">
      {/* Remove all button */}
      <button
        type="button"
        onClick={onRemoveAll}
        className="absolute top-4 right-4 z-20 p-1.5 bg-slate-900/60 hover:bg-slate-900/80 text-white rounded-full transition-colors duration-150 focus:outline-none cursor-pointer"
        title="Gỡ ảnh"
      >
        <X className="w-4 h-4" />
      </button>

      {renderGrid()}
    </div>
  )
}
