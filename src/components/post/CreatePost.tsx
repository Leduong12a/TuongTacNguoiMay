import React, { useState } from 'react'
import { X, Image as ImageIcon, UserPlus, MapPin, Smile, User, Check } from 'lucide-react'
import { PostPrivacySelector } from './PostPrivacySelector'
import { MediaUpload } from './MediaUpload'
import { PostMusicPlayer } from './PostMusicPlayer'

interface CreatePostProps {
  onClose: () => void
  onPublish: (postData: {
    text: string
    privacy: string
    images: string[]
    music: { title: string; artist: string } | null
    tags: string[]
    location: string | null
  }) => void
}

const mockPostImages = [
  'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=500&auto=format&fit=crop', // onesies
  'https://images.unsplash.com/photo-1496181130204-755241524eab?w=500&auto=format&fit=crop'  // laptop
]

export const CreatePost: React.FC<CreatePostProps> = ({ onClose, onPublish }) => {
  const [text, setText] = useState<string>('Bạn đang nghĩ gì?')
  const [privacy, setPrivacy] = useState<string>('public')
  const [images, setImages] = useState<string[]>(mockPostImages)
  const [music, setMusic] = useState<{ title: string; artist: string } | null>({
    title: 'Lofi Chill Beats',
    artist: 'Various Artists'
  })
  
  // Custom metadata states
  const [location, setLocation] = useState<string | null>(null)
  const [tags, setTags] = useState<string[]>([])

  const handlePublish = () => {
    onPublish({
      text: text === 'Bạn đang nghĩ gì?' ? '' : text,
      privacy,
      images,
      music,
      tags,
      location
    })
  }

  // Quick toggles for tools
  const handleToggleImages = () => {
    if (images.length > 0) {
      setImages([])
    } else {
      setImages(mockPostImages)
    }
  }

  const handleToggleLocation = () => {
    if (location) {
      setLocation(null)
    } else {
      setLocation('Hà Nội')
    }
  }

  const handleToggleTags = () => {
    if (tags.length > 0) {
      setTags([])
    } else {
      setTags(['Lê Minh'])
    }
  }

  const handleAddEmoji = () => {
    if (text === 'Bạn đang nghĩ gì?') {
      setText('😊')
    } else {
      setText(prev => prev + ' 😊')
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop overlay */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-[1.5px] transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative bg-white rounded-2xl shadow-2xl border border-slate-200/80 w-full max-w-[480px] overflow-hidden flex flex-col z-10 animate-scaleUp text-slate-800 font-sans select-none">
        
        {/* Main Content Area (Scrollable if needed) */}
        <div className="p-5 flex flex-col gap-4 max-h-[75vh] overflow-y-auto scrollbar-none">
          
          {/* Header: User Info & Privacy */}
          <div className="flex items-center gap-3">
            {/* User Avatar */}
            <div className="w-11 h-11 rounded-full bg-slate-200 border border-slate-100 flex items-center justify-center text-slate-500 overflow-hidden shadow-inner shrink-0">
              <img 
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop" 
                alt="Avatar"
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback to Icon
                  (e.target as HTMLImageElement).style.display = 'none'
                }}
              />
              <User className="w-5 h-5 text-slate-400" />
            </div>

            {/* Name and Privacy selection */}
            <div className="flex flex-col items-start gap-1">
              <div className="flex flex-wrap items-center gap-1 text-[14.5px] font-bold text-slate-800">
                <span>Lê Minh</span>
                {tags.length > 0 && (
                  <span className="text-slate-550 font-normal">
                    cùng với <span className="font-semibold text-slate-700">{tags.join(', ')}</span>
                  </span>
                )}
                {location && (
                  <span className="text-slate-550 font-normal">
                    tại <span className="font-semibold text-slate-700">{location}</span>
                  </span>
                )}
              </div>
              <PostPrivacySelector 
                selectedPrivacy={privacy}
                onSelectPrivacy={setPrivacy}
              />
            </div>
          </div>

          {/* Text input area */}
          <div className="w-full">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              onFocus={() => {
                if (text === 'Bạn đang nghĩ gì?') setText('')
              }}
              onBlur={() => {
                if (text.trim() === '') setText('Bạn đang nghĩ gì?')
              }}
              className="w-full min-h-[90px] border-0 focus:ring-0 resize-none text-[15px] text-slate-700 font-medium placeholder-slate-400 focus:outline-none leading-relaxed"
            />
          </div>

          {/* Media Grid upload layout */}
          <MediaUpload 
            images={images}
            onRemoveAll={() => setImages([])}
            onEdit={() => alert('Chế độ chỉnh sửa hình ảnh')}
          />

          {/* Music player widget block */}
          {music && (
            <PostMusicPlayer
              title={music.title}
              artist={music.artist}
              onRemove={() => setMusic(null)}
            />
          )}

        </div>

        {/* Action bar block ("Thêm vào:") */}
        <div className="mx-5 mb-5 p-3.5 bg-white border border-slate-200/80 rounded-xl flex items-center justify-between shrink-0 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="text-[12.5px] font-bold text-slate-400">Thêm vào:</span>
            <div className="flex items-center gap-2">
              {/* Media Button */}
              <button
                type="button"
                onClick={handleToggleImages}
                className={`p-2 rounded-lg cursor-pointer transition-all duration-150 active:scale-90 ${
                  images.length > 0 ? 'bg-blue-50 text-[#0056C6]' : 'text-slate-400 hover:bg-slate-100 hover:text-slate-650'
                }`}
                title="Đính kèm hình ảnh"
              >
                <ImageIcon className="w-4.5 h-4.5" />
              </button>

              {/* Tag Friends Button */}
              <button
                type="button"
                onClick={handleToggleTags}
                className={`p-2 rounded-lg cursor-pointer transition-all duration-150 active:scale-90 ${
                  tags.length > 0 ? 'bg-blue-50 text-[#0056C6]' : 'text-slate-400 hover:bg-slate-100 hover:text-slate-650'
                }`}
                title="Gắn thẻ bạn bè"
              >
                <UserPlus className="w-4.5 h-4.5" />
              </button>

              {/* Location Button */}
              <button
                type="button"
                onClick={handleToggleLocation}
                className={`p-2 rounded-lg cursor-pointer transition-all duration-150 active:scale-90 ${
                  location ? 'bg-blue-50 text-[#0056C6]' : 'text-slate-400 hover:bg-slate-100 hover:text-slate-650'
                }`}
                title="Thêm vị trí"
              >
                <MapPin className="w-4.5 h-4.5" />
              </button>

              {/* Emoji Button */}
              <button
                type="button"
                onClick={handleAddEmoji}
                className="p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-650 rounded-lg cursor-pointer transition-all duration-150 active:scale-90"
                title="Thêm emoji"
              >
                <Smile className="w-4.5 h-4.5" />
              </button>
            </div>
          </div>

          {/* Post submission button */}
          <button
            type="button"
            onClick={handlePublish}
            className="px-5 py-2 bg-[#1877F2] hover:bg-[#156BEC] active:bg-[#1054C7] text-white font-bold text-[13px] rounded-lg shadow-sm hover:shadow active:scale-97 transition-all cursor-pointer flex items-center justify-center focus:outline-none"
          >
            Đăng
          </button>
        </div>

        {/* Bottom Title Bar with close icon matching mockup */}
        <div className="border-t border-slate-150 px-5 py-4 flex items-center justify-between bg-slate-50/50 shrink-0">
          <span className="text-[14.5px] font-bold text-slate-800">Tạo bài viết</span>
          <button
            type="button"
            onClick={onClose}
            className="p-1 hover:bg-slate-200 rounded-full text-slate-450 hover:text-slate-650 transition-colors duration-150 cursor-pointer focus:outline-none"
            title="Đóng"
          >
            <X className="w-4.5 h-4.5" />
          </button>
        </div>

      </div>
    </div>
  )
}
