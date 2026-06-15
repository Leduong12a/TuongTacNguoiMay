import React from 'react'
import { X, Music } from 'lucide-react'

interface PostMusicPlayerProps {
  title: string
  artist: string
  coverStyle?: string
  onRemove: () => void
}

export const PostMusicPlayer: React.FC<PostMusicPlayerProps> = ({
  title,
  artist,
  coverStyle = 'bg-gradient-to-br from-[#0e072b] via-[#1c0a35] to-[#401254]',
  onRemove
}) => {
  return (
    <div className="bg-[#F8F9FA]/70 border border-slate-200/80 rounded-2xl p-3.5 flex items-center justify-between relative group select-none shadow-sm">
      
      {/* Content */}
      <div className="flex items-center gap-3.5 min-w-0 flex-1 pr-4">
        {/* Cover Art */}
        <div className={`w-12 h-12 rounded-xl ${coverStyle} text-white font-bold flex items-center justify-center overflow-hidden shrink-0 shadow-md relative`}>
          <Music className="w-5 h-5 text-white/70 animate-pulse" />
        </div>

        {/* Details & Waveform */}
        <div className="flex-1 min-w-0 flex flex-col gap-2">
          <div className="min-w-0 leading-tight">
            <h4 className="text-[13px] font-bold text-slate-800 truncate">{title}</h4>
            <p className="text-[10.5px] font-semibold text-slate-400 truncate mt-0.5">{artist}</p>
          </div>

          {/* Waveform Player Bar */}
          <div className="relative h-6 bg-slate-100 rounded-lg overflow-hidden flex items-end px-2 gap-[2px]">
            {/* Waveform bars */}
            {Array.from({ length: 30 }).map((_, i) => {
              const h = 6 + Math.sin(i * 0.7) * 8 + Math.cos(i * 0.4) * 4
              const isPlayed = i < 12 // play head line is at index 12
              return (
                <div
                  key={i}
                  style={{ height: `${Math.max(4, Math.min(18, h))}px` }}
                  className={`flex-1 rounded-sm transition-colors duration-150 ${
                    isPlayed ? 'bg-[#0056C6]/80' : 'bg-slate-300'
                  }`}
                />
              )
            })}

            {/* Play cursor blue line */}
            <div 
              style={{ left: '40%' }} 
              className="absolute top-0 bottom-0 w-[2px] bg-[#0056C6] pointer-events-none shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* Remove Button */}
      <button
        type="button"
        onClick={onRemove}
        className="p-1.5 hover:bg-slate-200 text-slate-400 hover:text-slate-650 rounded-full transition-colors cursor-pointer focus:outline-none shrink-0"
        title="Gỡ nhạc"
      >
        <X className="w-4 h-4" />
      </button>

    </div>
  )
}
