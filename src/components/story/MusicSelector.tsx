import React, { useState, useRef, useEffect } from 'react'
import { Music, ChevronDown, Check, PlusCircle, X, Search } from 'lucide-react'

export interface Song {
  id: string
  title: string
  artist: string
  coverStyle: string
}

interface MusicSelectorProps {
  selectedSong: Song | null
  onSelectSong: (song: Song | null) => void
  trimStart: number
  onChangeTrimStart: (start: number) => void
  songDuration?: number
}

export const mockSongs: Song[] = [
  { id: '1', title: 'Mưa Trên Cuộc Tình', artist: 'Hứa Kim Tuyền', coverStyle: 'bg-gradient-to-br from-[#0e072b] via-[#1c0a35] to-[#401254]' },
  { id: '2', title: 'Ngày Đầu Tiên', artist: 'Đức Phúc', coverStyle: 'bg-gradient-to-br from-[#2b1707] via-[#482b0e] to-[#120b05]' },
  { id: '3', title: 'Waiting For You', artist: 'MONO', coverStyle: 'bg-gradient-to-br from-[#f83a5e] via-[#e2697b] to-[#7ce0d3]' },
  { id: '4', title: 'Có Không Giữ Mất Đừng Tìm', artist: 'Trúc Nhân', coverStyle: 'bg-gradient-to-br from-[#c84e1b] via-[#a13b0f] to-[#1f0f08]' },
  { id: '5', title: 'Vì Mẹ Anh Bắt Chia Tay', artist: 'Miu Lê, Karik', coverStyle: 'bg-gradient-to-br from-[#333] via-[#111] to-[#222]' },
  { id: '6', title: 'Bên Trên Tầng Lầu', artist: 'Tăng Duy Tân', coverStyle: 'bg-gradient-to-br from-[#0b1b3d] via-[#152e63] to-[#040914]' }
]

const categories = ['Cho bạn', 'Thịnh hành', 'Tâm trạng', 'Pop', 'Indie']

export const MusicSelector: React.FC<MusicSelectorProps> = ({
  selectedSong,
  onSelectSong,
  trimStart,
  onChangeTrimStart,
  songDuration = 30
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Cho bạn')

  // Format time (e.g. 2 -> "0:02")
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? '0' + secs : secs}`
  }

  // Filter songs based on search
  const filteredSongs = mockSongs.filter(song =>
    song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    song.artist.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="flex flex-col gap-2.5 relative">
      
      {/* Title / Action Header */}
      {selectedSong && (
        <div className="flex justify-between items-baseline">
          <label className="text-[12.5px] font-bold text-slate-400 uppercase tracking-wider">🎵 Âm thanh</label>
          <button
            onClick={() => onSelectSong(null)}
            className="text-xs font-bold text-[#0056C6] hover:underline cursor-pointer flex items-center gap-1"
          >
            Xóa
          </button>
        </div>
      )}

      {/* Main Selector UI */}
      {selectedSong ? (
        /* Trimmer View when song is selected */
        <div className="bg-slate-50/70 border border-slate-150 rounded-xl p-4 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Cover Art Image */}
              <div className={`w-11 h-11 rounded-lg ${selectedSong.coverStyle} text-white font-bold flex items-center justify-center overflow-hidden shrink-0 shadow-md relative group`}>
                <Music className="w-5 h-5 text-white/80 animate-pulse" />
              </div>
              <div className="min-w-0">
                <h4 className="text-[13.5px] font-bold text-slate-800 leading-tight truncate">{selectedSong.title}</h4>
                <p className="text-[11px] font-semibold text-slate-400 truncate">{selectedSong.artist}</p>
              </div>
            </div>
            
            {/* Click to change song */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
            >
              <ChevronDown className="w-4.5 h-4.5" />
            </button>
          </div>

          {/* Trimmer Slider Area */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              <span>{formatTime(trimStart)}</span>
              <span>{formatTime(trimStart + 15)}</span>
            </div>

            {/* Waveform track */}
            <div className="relative h-10 bg-slate-200/70 rounded-lg overflow-hidden flex items-end px-1 gap-[3px]">
              {Array.from({ length: 24 }).map((_, i) => {
                const h = 14 + Math.sin(i * 0.8) * 12 + Math.cos(i * 0.3) * 6
                const indexPercent = (i / 24) * 100
                const isSelected = indexPercent >= (trimStart / songDuration) * 100 && indexPercent <= ((trimStart + 15) / songDuration) * 100
                return (
                  <div
                    key={i}
                    style={{ height: `${Math.max(6, Math.min(32, h))}px` }}
                    className={`flex-1 rounded-sm transition-colors duration-150 ${
                      isSelected ? 'bg-[#0056C6]/80' : 'bg-slate-400/50'
                    }`}
                  />
                )
              })}

              {/* Slider highlighted range overlay */}
              <div 
                style={{ 
                  left: `${(trimStart / songDuration) * 100}%`, 
                  width: `${(15 / songDuration) * 100}%` 
                }} 
                className="absolute top-0 bottom-0 border-2 border-[#0056C6] bg-[#0056C6]/10 pointer-events-none rounded-lg transition-all duration-150"
              />

              {/* Range input slider */}
              <input
                type="range"
                min="0"
                max={songDuration - 15}
                value={trimStart}
                onChange={(e) => onChangeTrimStart(parseInt(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
              />
            </div>
          </div>
        </div>
      ) : (
        /* Initial Card to Select Music matching the reference mockup */
        <div className="bg-slate-50/70 border border-slate-150 rounded-xl p-4 flex flex-col gap-3.5 select-none">
          <div className="flex items-center gap-1.5 text-[#0056C6] font-bold text-[13.5px]">
            <Music className="w-4.5 h-4.5" />
            <span>Âm thanh</span>
          </div>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="border border-dashed border-slate-300 rounded-xl py-6 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-slate-100/50 hover:border-slate-400 transition-all duration-150 active:scale-98 w-full focus:outline-none bg-white"
          >
            <PlusCircle className="w-7 h-7 text-slate-400" />
            <span className="text-[13px] font-bold text-slate-500">Thêm âm thanh</span>
          </button>
        </div>
      )}

      {/* Select Music Modal Overlay (Centered pop-up) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          
          {/* Backdrop overlay */}
          <div 
            className="absolute inset-0 bg-slate-900/50 backdrop-blur-[1.5px] transition-opacity duration-300"
            onClick={() => setIsModalOpen(false)}
          />
          
          {/* Modal Container */}
          <div className="relative bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-[420px] h-[85vh] max-h-[640px] overflow-hidden flex flex-col z-50 animate-scaleUp text-slate-800 font-sans">
            
            {/* Modal Header */}
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2 text-[#0056C6] font-bold text-[16px]">
                <Music className="w-4.5 h-4.5" />
                <span>Chọn âm nhạc</span>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 hover:bg-slate-50 rounded-full text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </div>

            {/* Modal Body Contents */}
            <div className="p-4 flex flex-col gap-4 overflow-hidden flex-1">
              
              {/* Search input bar */}
              <div className="relative w-full">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm kiếm âm nhạc..."
                  className="w-full h-11 pl-10 pr-4 rounded-xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-[#0056C6] focus:ring-1 focus:ring-[#0056C6] focus:outline-none text-[13.5px] text-slate-700 font-medium transition-all duration-150 placeholder-slate-400"
                />
              </div>

              {/* Category Pills Row (Scrollable horizontally) */}
              <div className="flex gap-2 overflow-x-auto pb-1.5 shrink-0 scrollbar-none">
                {categories.map((cat) => {
                  const isActive = selectedCategory === cat
                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap cursor-pointer transition-all duration-150 ${
                        isActive 
                          ? 'bg-[#0056C6] text-white shadow-sm' 
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                      }`}
                    >
                      {cat}
                    </button>
                  )
                })}
              </div>

              {/* Scrollable list of songs */}
              <div className="flex-1 overflow-y-auto space-y-4 pr-1">
                {filteredSongs.map((song) => {
                  const isSelected = selectedSong?.id === song.id
                  return (
                    <div key={song.id} className="flex items-center justify-between">
                      
                      {/* Left: Thumbnail & Details */}
                      <div className="flex items-center gap-3 min-w-0 flex-1 pr-2">
                        {/* Cover Art styled with CSS gradient background */}
                        <div className={`w-12 h-12 rounded-xl ${song.coverStyle} text-white font-bold flex items-center justify-center shadow-md relative shrink-0`}>
                          <Music className="w-5 h-5 text-white/60" />
                          {isSelected && (
                            <div className="absolute inset-0 bg-[#0056C6]/20 flex items-center justify-center rounded-xl">
                              <Check className="w-5 h-5 text-white drop-shadow" />
                            </div>
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="text-[13.5px] font-bold text-slate-800 leading-tight truncate">{song.title}</h4>
                          <p className="text-[11px] font-bold text-slate-400 truncate mt-0.5">{song.artist}</p>
                        </div>
                      </div>

                      {/* Right: Select Action Button */}
                      <button
                        onClick={() => {
                          onSelectSong(song)
                          setIsModalOpen(false)
                        }}
                        className={`h-7 px-4 rounded-full font-bold text-xs cursor-pointer transition-all duration-150 ${
                          isSelected
                            ? 'bg-[#E8F1FF] text-[#0056C6]'
                            : 'bg-slate-100 hover:bg-[#E8F1FF]/50 text-slate-700 hover:text-[#0056C6]'
                        }`}
                      >
                        Chọn
                      </button>
                    </div>
                  )
                })}

                {filteredSongs.length === 0 && (
                  <div className="text-center py-12 text-slate-400 font-semibold text-sm">
                    Không tìm thấy bài hát nào
                  </div>
                )}
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-100 shrink-0">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-full h-11 bg-[#0056C6] hover:bg-[#0047A5] active:bg-[#003882] text-white font-bold text-[14px] rounded-lg shadow-sm hover:shadow transition-all duration-200 cursor-pointer flex items-center justify-center"
              >
                Xem thêm thể loại
              </button>
            </div>

          </div>

        </div>
      )}

    </div>
  )
}
