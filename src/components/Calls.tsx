import React, { useState, useEffect } from 'react'
import { 
  Search, 
  Phone, 
  Video, 
  PhoneCall, 
  PhoneIncoming, 
  PhoneOutgoing, 
  PhoneMissed,
  X,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Video as VideoIcon,
  VideoOff,
  Plus
} from 'lucide-react'

interface CallRecord {
  id: string
  name: string
  avatar: string
  avatarBg: string
  type: 'incoming' | 'outgoing' | 'missed'
  isVideo: boolean
  time: string
  duration?: string
  phone: string
}

export const Calls: React.FC = () => {
  // Mock call history
  const [callHistory, setCallHistory] = useState<CallRecord[]>([
    { id: 'h1', name: 'Đỗ Đình An', avatar: 'DA', avatarBg: 'bg-indigo-500', type: 'incoming', isVideo: false, time: '14:20', duration: '03:45', phone: '0981112223' },
    { id: 'h2', name: 'Lại Anh Đào', avatar: 'AD', avatarBg: 'bg-purple-500', type: 'outgoing', isVideo: true, time: '11:15', duration: '12:20', phone: '0984445556' },
    { id: 'h3', name: 'Phạm Ngọc Hách', avatar: 'NH', avatarBg: 'bg-pink-500', type: 'missed', isVideo: false, time: 'Hôm qua 19:30', phone: '0983334445' },
    { id: 'h4', name: 'Ngọc Bình', avatar: 'NB', avatarBg: 'bg-blue-500', type: 'incoming', isVideo: false, time: '12/06/2026', duration: '01:15', phone: '0982223334' }
  ])

  const [searchQuery, setSearchQuery] = useState('')
  const [activeCallUser, setActiveCallUser] = useState<CallRecord | null>(null)
  
  // Call simulation states
  const [callStatus, setCallStatus] = useState<'connecting' | 'ringing' | 'connected' | 'ended'>('connecting')
  const [seconds, setSeconds] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [isSpeakerOn, setIsSpeakerOn] = useState(false)
  const [isVideoOn, setIsVideoOn] = useState(false)

  // Filter history
  const filteredHistory = callHistory.filter(record => 
    record.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Start Call Simulation
  const handleStartCall = (record: CallRecord, isVideo: boolean = false) => {
    setActiveCallUser({ ...record, isVideo })
    setCallStatus('connecting')
    setSeconds(0)
    setIsMuted(false)
    setIsSpeakerOn(false)
    setIsVideoOn(isVideo)
  }

  // Handle Call Timer
  useEffect(() => {
    let statusTimer: NodeJS.Timeout
    let secondsTimer: NodeJS.Timeout

    if (activeCallUser && callStatus !== 'ended') {
      if (callStatus === 'connecting') {
        statusTimer = setTimeout(() => {
          setCallStatus('ringing')
        }, 1200)
      } else if (callStatus === 'ringing') {
        statusTimer = setTimeout(() => {
          setCallStatus('connected')
        }, 1500)
      } else if (callStatus === 'connected') {
        secondsTimer = setInterval(() => {
          setSeconds(prev => prev + 1)
        }, 1000)
      }
    }

    return () => {
      clearTimeout(statusTimer)
      clearInterval(secondsTimer)
    }
  }, [activeCallUser, callStatus])

  // Format seconds to mm:ss
  const formatTime = (secs: number) => {
    const mm = Math.floor(secs / 60).toString().padStart(2, '0')
    const ss = (secs % 60).toString().padStart(2, '0')
    return `${mm}:${ss}`
  }

  // End Call
  const handleEndCall = () => {
    setCallStatus('ended')
    setTimeout(() => {
      // Add call record to history list
      if (activeCallUser) {
        const newRecord: CallRecord = {
          id: `h_new_${Date.now()}`,
          name: activeCallUser.name,
          avatar: activeCallUser.avatar,
          avatarBg: activeCallUser.avatarBg,
          type: 'outgoing',
          isVideo: activeCallUser.isVideo,
          time: 'Vừa xong',
          duration: seconds > 0 ? formatTime(seconds) : undefined,
          phone: activeCallUser.phone
        }
        setCallHistory(prev => [newRecord, ...prev])
      }
      setActiveCallUser(null)
    }, 800)
  }

  return (
    <div className="flex-1 flex h-full overflow-hidden bg-white select-none">
      
      {/* ======================================================== */}
      {/* COLUMN 1 (MIDDLE): Call History                          */}
      {/* ======================================================== */}
      <div className="w-[350px] shrink-0 bg-white border-r border-slate-200 flex flex-col h-full z-10">
        
        {/* Header Section */}
        <div className="px-6 pt-6 pb-4 flex items-center justify-between">
          <h2 className="text-[22px] font-bold text-slate-800 tracking-tight">Gọi điện</h2>
          <button 
            onClick={() => alert('Quay số mới')}
            className="w-9 h-9 rounded-full hover:bg-slate-100 flex items-center justify-center text-[#0056C6] cursor-pointer transition-colors focus:outline-none"
            title="Cuộc gọi mới"
          >
            <Plus className="w-5.5 h-5.5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="px-5 pb-4 border-b border-slate-100">
          <div className="relative flex items-center bg-slate-100/70 border border-transparent rounded-xl p-1 focus-within:bg-white focus-within:border-slate-200 focus-within:shadow-sm transition-all">
            <div className="pl-3 text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm lịch sử cuộc gọi"
              className="w-full h-9 px-2 text-[14px] bg-transparent border-none outline-none text-slate-800 placeholder-slate-450 focus:ring-0"
            />
          </div>
        </div>

        {/* Call History list */}
        <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-1.5">
          {filteredHistory.length > 0 ? (
            filteredHistory.map(record => (
              <div
                key={record.id}
                className="flex items-center justify-between p-3.5 rounded-2xl hover:bg-slate-50 transition-all group select-none"
              >
                {/* User Info */}
                <div className="flex items-center gap-3.5 overflow-hidden">
                  <div className={`w-11 h-11 rounded-xl ${record.avatarBg} text-white font-bold text-[14.5px] flex items-center justify-center shadow-sm shrink-0`}>
                    {record.avatar}
                  </div>
                  
                  <div className="flex flex-col">
                    <span className="text-[14.5px] font-bold text-slate-800 truncate">
                      {record.name}
                    </span>
                    <div className="flex items-center gap-1.5 mt-1">
                      {record.type === 'incoming' && <PhoneIncoming className="w-3.5 h-3.5 text-green-500" />}
                      {record.type === 'outgoing' && <PhoneOutgoing className="w-3.5 h-3.5 text-blue-500" />}
                      {record.type === 'missed' && <PhoneMissed className="w-3.5 h-3.5 text-red-500" />}
                      <span className="text-[11.5px] text-slate-400 font-semibold">
                        {record.time} {record.duration && `(${record.duration})`}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Call buttons */}
                <div className="flex items-center gap-2.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleStartCall(record, false)}
                    className="w-8 h-8 rounded-lg bg-slate-50 hover:bg-blue-50 hover:text-[#0056C6] text-slate-500 flex items-center justify-center cursor-pointer transition-colors focus:outline-none"
                    title="Gọi thoại"
                  >
                    <Phone className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleStartCall(record, true)}
                    className="w-8 h-8 rounded-lg bg-slate-50 hover:bg-blue-50 hover:text-[#0056C6] text-slate-500 flex items-center justify-center cursor-pointer transition-colors focus:outline-none"
                    title="Gọi video"
                  >
                    <Video className="w-4 h-4" />
                  </button>
                </div>

              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center text-center py-12 text-slate-400">
              <span className="text-sm font-semibold">Lịch sử cuộc gọi trống</span>
            </div>
          )}
        </div>

      </div>

      {/* ======================================================== */}
      {/* COLUMN 2 (RIGHT): Call Simulator Screen                  */}
      {/* ======================================================== */}
      <div className="flex-1 flex flex-col h-full bg-[#F8F9FA] relative items-center justify-center overflow-hidden">
        
        {activeCallUser ? (
          /* Active Call Simulator (Dark interface) */
          <div className="absolute inset-0 bg-gradient-to-b from-[#1E293B] to-[#0F172A] flex flex-col items-center justify-between p-12 text-white animate-scaleUp z-20">
            
            {/* Top row */}
            <div className="flex flex-col items-center mt-8">
              <div className="px-3 py-1 bg-white/10 rounded-full border border-white/10 text-[12px] font-bold tracking-wide flex items-center gap-1.5">
                <div className={`w-2 h-2 rounded-full ${callStatus === 'connected' ? 'bg-green-500 animate-pulse' : 'bg-amber-500 animate-ping'}`} />
                {activeCallUser.isVideo ? 'CUỘC GỌI VIDEO' : 'CUỘC GỌI THOẠI'}
              </div>
            </div>

            {/* Middle row: Avatar & Status */}
            <div className="flex flex-col items-center">
              <div className="relative mb-6">
                <div className={`w-28 h-28 rounded-full ${activeCallUser.avatarBg} text-white text-[42px] font-extrabold flex items-center justify-center shadow-2xl ring-4 ring-white/10 animate-pulse`}>
                  {activeCallUser.avatar}
                </div>
                {callStatus === 'connected' && isVideoOn && (
                  <div className="absolute inset-0 rounded-full bg-slate-800/80 flex items-center justify-center overflow-hidden border-2 border-green-500">
                    <VideoIcon className="w-10 h-10 text-green-400 animate-pulse" />
                  </div>
                )}
              </div>
              <h3 className="text-[22px] font-bold tracking-tight">{activeCallUser.name}</h3>
              <p className="text-[13px] text-slate-400 font-semibold tracking-wide uppercase mt-1">
                {callStatus === 'connecting' && 'Đang kết nối...'}
                {callStatus === 'ringing' && 'Đang đổ chuông...'}
                {callStatus === 'connected' && formatTime(seconds)}
                {callStatus === 'ended' && 'Cuộc gọi đã kết thúc'}
              </p>
            </div>

            {/* Bottom row: Control Panel */}
            <div className="flex items-center gap-6 mb-8 bg-black/25 backdrop-blur-md px-8 py-4.5 rounded-3xl border border-white/5 shadow-2xl">
              {/* Mute Mic */}
              <button
                onClick={() => setIsMuted(!isMuted)}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all cursor-pointer focus:outline-none ${
                  isMuted 
                    ? 'bg-red-500/20 border border-red-500 text-red-500' 
                    : 'bg-white/10 hover:bg-white/20 border border-transparent text-white'
                }`}
                title={isMuted ? 'Bật mic' : 'Tắt mic'}
              >
                {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>

              {/* Speaker */}
              <button
                onClick={() => setIsSpeakerOn(!isSpeakerOn)}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all cursor-pointer focus:outline-none ${
                  isSpeakerOn 
                    ? 'bg-blue-500/20 border border-blue-500 text-blue-400' 
                    : 'bg-white/10 hover:bg-white/20 border border-transparent text-white'
                }`}
                title={isSpeakerOn ? 'Tắt loa ngoài' : 'Bật loa ngoài'}
              >
                {isSpeakerOn ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5 text-slate-350" />}
              </button>

              {/* Video Camera Toggle */}
              <button
                onClick={() => setIsVideoOn(!isVideoOn)}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all cursor-pointer focus:outline-none ${
                  isVideoOn 
                    ? 'bg-green-500/20 border border-green-500 text-green-400' 
                    : 'bg-white/10 hover:bg-white/20 border border-transparent text-white'
                }`}
                title={isVideoOn ? 'Tắt camera' : 'Bật camera'}
              >
                {isVideoOn ? <VideoIcon className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
              </button>

              {/* End Call */}
              <button
                onClick={handleEndCall}
                className="w-13 h-13 rounded-full bg-red-650 hover:bg-red-750 flex items-center justify-center text-white cursor-pointer transition-all focus:outline-none shadow-lg active:scale-90"
                title="Gác máy"
              >
                <X className="w-6 h-6 stroke-[2.5]" />
              </button>
            </div>

          </div>
        ) : (
          /* Empty state */
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8 text-slate-400">
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-slate-350 shadow-sm border border-slate-150 mb-4 animate-scaleUp">
              <PhoneCall className="w-7 h-7" />
            </div>
            <h4 className="text-[15.5px] font-bold text-slate-700">Chọn cuộc gọi thoại hoặc video</h4>
            <p className="text-[12.8px] text-slate-450 mt-1 max-w-[280px]">
              Nhấp vào biểu tượng điện thoại hoặc video bên cạnh tên bạn bè để thực hiện cuộc gọi.
            </p>
          </div>
        )}

      </div>

    </div>
  )
}
