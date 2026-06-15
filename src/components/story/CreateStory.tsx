import React, { useState, useRef, useEffect } from 'react'
import { X, AlignCenter, AlignLeft, AlignRight, Type, Search, Music, Sparkles, User, ChevronDown, Check } from 'lucide-react'
import { MusicSelector, mockSongs } from './MusicSelector'
import type { Song } from './MusicSelector'

interface CreateStoryProps {
  onClose: () => void
  onShare: (storyData: { text: string; bgStyle: string; fontStyle: string; alignment: string; songName: string | null }) => void
}

const backgrounds = [
  { id: 'gradient-pink', value: 'bg-gradient-to-br from-[#FF9A9E] via-[#FECFEF] to-[#FECFEF]' },
  { id: 'gradient-teal', value: 'bg-gradient-to-br from-[#4FACFE] to-[#00F2FE]' },
  { id: 'gradient-purple', value: 'bg-gradient-to-br from-[#CD9CF2] to-[#F6D365]' },
  { id: 'solid-black', value: 'bg-slate-900 text-white' },
  { id: 'solid-grey', value: 'bg-slate-200 text-slate-800' },
  { id: 'gradient-orange', value: 'bg-gradient-to-br from-[#F857A6] to-[#FF5858]' }
]

const fonts = [
  { id: 'sans', name: 'Sans-serif', className: 'font-sans' },
  { id: 'serif', name: 'Serif', className: 'font-serif' },
  { id: 'mono', name: 'Monospace', className: 'font-mono' }
]

const alignments = [
  { id: 'center', label: 'Căn giữa', icon: AlignCenter, justify: 'text-center justify-center' },
  { id: 'left', label: 'Căn trái', icon: AlignLeft, justify: 'text-left justify-start' },
  { id: 'right', label: 'Căn phải', icon: AlignRight, justify: 'text-right justify-end' }
]

export const CreateStory: React.FC<CreateStoryProps> = ({ onClose, onShare }) => {
  const [text, setText] = useState<string>('Chào ngày mới! ☀️')
  const [selectedBg, setSelectedBg] = useState<string>('gradient-pink')
  const [selectedFont, setSelectedFont] = useState<string>('sans')
  const [selectedAlignment, setSelectedAlignment] = useState<string>('center')
  
  // Dropdown states
  const [isFontDropdownOpen, setIsFontDropdownOpen] = useState(false)
  const [isAlignDropdownOpen, setIsAlignDropdownOpen] = useState(false)
  
  const fontDropdownRef = useRef<HTMLDivElement>(null)
  const alignDropdownRef = useRef<HTMLDivElement>(null)

  // Music states
  const [selectedSong, setSelectedSong] = useState<Song | null>(mockSongs[0])
  const [trimStart, setTrimStart] = useState<number>(2) // start at 0:02

  const activeBgObj = backgrounds.find(b => b.id === selectedBg) || backgrounds[0]
  const activeFontObj = fonts.find(f => f.id === selectedFont) || fonts[0]
  const activeAlignObj = alignments.find(a => a.id === selectedAlignment) || alignments[0]

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (fontDropdownRef.current && !fontDropdownRef.current.contains(e.target as Node)) {
        setIsFontDropdownOpen(false)
      }
      if (alignDropdownRef.current && !alignDropdownRef.current.contains(e.target as Node)) {
        setIsAlignDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleShareStory = () => {
    onShare({
      text,
      bgStyle: activeBgObj.value,
      fontStyle: activeFontObj.className,
      alignment: activeAlignObj.justify,
      songName: selectedSong ? selectedSong.title : null
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop overlay */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-[1.5px] transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Modal content container */}
      <div className="relative bg-[#F0F2F5] rounded-2xl shadow-2xl border border-slate-200/80 w-full max-w-[960px] h-[90vh] max-h-[650px] overflow-hidden flex z-10 animate-scaleUp text-slate-800 font-sans select-none">
        
        {/* Left panel - Configurator */}
        <div className="w-[350px] bg-white border-r border-slate-200 flex flex-col justify-between shrink-0 shadow-md h-full">
          
          {/* Header */}
          <div className="flex flex-col shrink-0">
            <div className="h-16 px-5 flex items-center gap-4 border-b border-slate-100">
              <button
                onClick={onClose}
                className="p-1.5 hover:bg-slate-100 rounded-full text-slate-500 hover:text-slate-700 transition-colors cursor-pointer focus:outline-none"
                title="Đóng"
              >
                <X className="w-5 h-5" />
              </button>
              <h2 className="text-[17px] font-bold text-slate-800">Tạo tin</h2>
            </div>
          </div>

          {/* Config list (Scrollable) */}
          <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-6">
            
            {/* Input Text Section */}
            <div className="flex flex-col gap-2">
              <label className="text-[12.5px] font-bold text-slate-400 uppercase tracking-wider">Văn bản</label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Bắt đầu nhập..."
                className="w-full h-24 p-3.5 rounded-xl border border-slate-200 text-sm text-slate-700 focus:outline-none focus:border-[#0056C6] focus:ring-1 focus:ring-[#0056C6] transition-all resize-none font-medium placeholder-slate-400"
              />
              
              {/* Text formatting row */}
              <div className="flex justify-between items-center mt-1">
                {/* Font Selector Dropdown */}
                <div className="relative" ref={fontDropdownRef}>
                  <button
                    type="button"
                    onClick={() => {
                      setIsFontDropdownOpen(!isFontDropdownOpen)
                      setIsAlignDropdownOpen(false)
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 rounded-lg text-xs font-bold text-slate-600 cursor-pointer transition-colors focus:outline-none"
                  >
                    <Type className="w-3.5 h-3.5" />
                    <span>Phông chữ ({activeFontObj.name})</span>
                    <ChevronDown className="w-3 h-3 opacity-60 ml-0.5" />
                  </button>

                  {isFontDropdownOpen && (
                    <div className="absolute left-0 mt-1.5 bg-white border border-slate-200 rounded-xl shadow-xl z-30 py-1 w-40 overflow-hidden animate-scaleUp">
                      {fonts.map((f) => (
                        <button
                          key={f.id}
                          type="button"
                          onClick={() => {
                            setSelectedFont(f.id)
                            setIsFontDropdownOpen(false)
                          }}
                          className={`w-full flex items-center justify-between px-3.5 py-2.5 hover:bg-slate-50 text-left text-xs font-bold transition-colors focus:outline-none ${
                            selectedFont === f.id ? 'text-[#0056C6] bg-blue-50/20 font-bold' : 'text-slate-700'
                          } ${f.className}`}
                        >
                          <span>{f.name}</span>
                          {selectedFont === f.id && <Check className="w-3.5 h-3.5 text-[#0056C6]" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Alignment Selector Dropdown */}
                <div className="relative" ref={alignDropdownRef}>
                  <button
                    type="button"
                    onClick={() => {
                      setIsAlignDropdownOpen(!isAlignDropdownOpen)
                      setIsFontDropdownOpen(false)
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 rounded-lg text-xs font-bold text-slate-600 cursor-pointer transition-colors focus:outline-none"
                  >
                    {React.createElement(activeAlignObj.icon, { className: 'w-3.5 h-3.5 animate-fadeIn' })}
                    <span>{activeAlignObj.label}</span>
                    <ChevronDown className="w-3 h-3 opacity-60 ml-0.5" />
                  </button>

                  {isAlignDropdownOpen && (
                    <div className="absolute right-0 mt-1.5 bg-white border border-slate-200 rounded-xl shadow-xl z-30 py-1 w-36 overflow-hidden animate-scaleUp">
                      {alignments.map((a) => {
                        const Icon = a.icon
                        return (
                          <button
                            key={a.id}
                            type="button"
                            onClick={() => {
                              setSelectedAlignment(a.id)
                              setIsAlignDropdownOpen(false)
                            }}
                            className={`w-full flex items-center justify-between px-3.5 py-2.5 hover:bg-slate-50 text-left text-xs font-bold transition-colors focus:outline-none ${
                              selectedAlignment === a.id ? 'text-[#0056C6] bg-blue-50/20' : 'text-slate-700'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <Icon className="w-3.5 h-3.5" />
                              <span>{a.label}</span>
                            </div>
                            {selectedAlignment === a.id && <Check className="w-3.5 h-3.5 text-[#0056C6]" />}
                          </button>
                        )
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Background selection */}
            <div className="flex flex-col gap-2.5">
              <label className="text-[12.5px] font-bold text-slate-400 uppercase tracking-wider">Phông nền</label>
              <div className="flex flex-wrap gap-2.5">
                {backgrounds.map((bg) => (
                  <button
                    key={bg.id}
                    onClick={() => setSelectedBg(bg.id)}
                    className={`w-9 h-9 rounded-full cursor-pointer relative transition-transform duration-150 hover:scale-105 active:scale-95 ${bg.value.split(' ')[0]} ${
                      selectedBg === bg.id 
                        ? 'ring-[3px] ring-white ring-offset-[2px] ring-offset-[#0056C6]' 
                        : 'border border-slate-200/50'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Modular Music Selector */}
            <MusicSelector
              selectedSong={selectedSong}
              onSelectSong={setSelectedSong}
              trimStart={trimStart}
              onChangeTrimStart={setTrimStart}
            />

          </div>

          {/* Footer actions */}
          <div className="p-5 border-t border-slate-100 bg-white shrink-0">
            <button
              onClick={handleShareStory}
              className="w-full h-11 bg-[#0056C6] hover:bg-[#0047A5] active:bg-[#003882] text-white font-bold text-[14px] rounded-lg shadow-sm hover:shadow transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-white" />
              Chia sẻ lên tin
            </button>
          </div>

        </div>

        {/* Right panel - Preview canvas */}
        <div className="flex-1 flex flex-col relative h-full bg-[#E9EBEE]">
          {/* Zoom/Search icon in top-right */}
          <div className="absolute top-5 right-5 z-20">
            <button className="p-2 bg-white hover:bg-slate-50 rounded-full shadow-md text-slate-500 hover:text-slate-800 transition-colors cursor-pointer">
              <Search className="w-4.5 h-4.5" />
            </button>
          </div>

          {/* Outer background wrapper */}
          <div className="flex-1 flex items-center justify-center p-6 h-full">
            
            {/* Vertical story phone preview */}
            <div className="w-[300px] h-[500px] rounded-2xl shadow-xl relative overflow-hidden flex flex-col justify-between p-4 border border-slate-200 bg-white">
              
              {/* Header info */}
              <div className={`absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/40 to-transparent flex justify-between items-center z-10 text-white rounded-t-2xl`}>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-slate-300 flex items-center justify-center relative text-slate-500 border border-white/50">
                    <User className="w-4.5 h-4.5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold leading-tight">Phùng Văn Duy</span>
                    <span className="text-[9px] font-semibold text-white/70 uppercase">Ngoại tuyến</span>
                  </div>
                </div>
                <button className="text-white hover:text-slate-200 cursor-pointer">
                  <span className="text-xs font-bold tracking-widest">•••</span>
                </button>
              </div>

              {/* Simulated background color of story */}
              <div className={`absolute inset-0 ${activeBgObj.value} transition-colors duration-200`} />

              {/* Centered preview text */}
              <div className={`flex-1 flex items-center ${activeAlignObj.justify} px-6 z-10`}>
                <p className={`text-[19px] font-bold text-white leading-snug drop-shadow-md break-words w-full ${activeFontObj.className}`}>
                  {text || 'Bắt đầu nhập...'}
                </p>
              </div>

              {/* Footer music pill wrapper */}
              {selectedSong && (
                <div className="w-full flex justify-center z-10 mb-2">
                  <div className="bg-white/90 backdrop-blur-sm px-3.5 py-2 rounded-xl shadow-md border border-white/40 flex items-center gap-2 max-w-[90%] transform transition-transform hover:scale-102 duration-150">
                    <div className="w-6 h-6 rounded-md bg-slate-900 text-amber-500 flex items-center justify-center">
                      <Music className="w-3 h-3 text-amber-500" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[10.5px] font-bold text-slate-800 truncate leading-tight">{selectedSong.title}</span>
                      <span className="text-[8.5px] font-bold text-slate-400 truncate">{selectedSong.artist}</span>
                    </div>
                  </div>
                </div>
              )}

            </div>

          </div>

        </div>

      </div>
    </div>
  )
}
