import React, { useState } from 'react'
import { X, Search, MapPin, Map, RefreshCw, Trash2 } from 'lucide-react'

interface LocationItem {
  id: string
  name: string
  address: string
}

interface LocationSelectorModalProps {
  currentLocation: string | null
  onClose: () => void
  onSelect: (locationName: string | null) => void
}

const mockLocations: LocationItem[] = [
  { id: '1', name: 'Hồ Hoàn Kiếm', address: 'Tràng Tiền, Hoàn Kiếm, Hà Nội' },
  { id: '2', name: 'Cầu Rồng', address: 'Nguyễn Văn Linh, Phước Ninh, Đà Nẵng' },
  { id: '3', name: 'Landmark 81', address: '720A Điện Biên Phủ, Phường 22, Bình Thạnh, TP.HCM' },
  { id: '4', name: 'Bưu điện Thành phố', address: 'Số 2 Công xã Paris, Bến Nghé, Quận 1, TP.HCM' }
]

export const LocationSelectorModal: React.FC<LocationSelectorModalProps> = ({
  currentLocation,
  onClose,
  onSelect
}) => {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredLocations = mockLocations.filter(loc =>
    loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    loc.address.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-[1.5px] transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Card Container */}
      <div className="relative bg-white rounded-2xl shadow-2xl border border-slate-200/80 w-full max-w-[420px] overflow-hidden flex flex-col z-10 animate-scaleUp text-slate-800 font-sans">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between shrink-0">
          <h3 className="text-[16px] font-bold text-slate-850">Tìm kiếm địa điểm</h3>
          <button 
            onClick={onClose}
            className="p-1.5 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-650 transition-colors cursor-pointer focus:outline-none"
            title="Đóng"
          >
            <X className="w-4.5 h-4.5" />
          </button>
        </div>

        {/* Content body */}
        <div className="p-4 flex flex-col gap-4 overflow-hidden flex-1">
          
          {/* Search input field */}
          <div className="relative w-full shrink-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm vị trí..."
              className="w-full h-11 pl-10 pr-4 rounded-xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-[#1877F2] focus:ring-1 focus:ring-[#1877F2] focus:outline-none text-[13.5px] text-slate-700 font-medium transition-all duration-150 placeholder-slate-400"
            />
          </div>

          {/* Section: GỢI Ý GẦN ĐÂY */}
          <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-2 scrollbar-none max-h-[260px]">
            <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase pl-1 shrink-0">
              Gợi ý gần đây
            </span>

            {/* Remove location option if one is active */}
            {currentLocation && (
              <div
                onClick={() => {
                  onSelect(null)
                  onClose()
                }}
                className="flex items-center gap-3 p-2.5 bg-red-50/50 hover:bg-red-50 border border-dashed border-red-200/50 rounded-xl cursor-pointer transition-colors duration-150 select-none"
              >
                <div className="w-9 h-9 rounded-full bg-red-100 text-red-550 flex items-center justify-center shrink-0">
                  <Trash2 className="w-4.5 h-4.5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[13px] font-bold text-red-650 leading-snug">
                    Gỡ vị trí hiện tại
                  </span>
                  <span className="text-[10.5px] font-bold text-red-400 mt-0.5 leading-snug">
                    Xóa "{currentLocation}" khỏi bài viết của bạn
                  </span>
                </div>
              </div>
            )}

            {/* List suggested locations */}
            {filteredLocations.map((loc) => {
              const isSelected = currentLocation === loc.name
              return (
                <div
                  key={loc.id}
                  onClick={() => {
                    onSelect(loc.name)
                    onClose()
                  }}
                  className={`flex items-center gap-3 p-2.5 rounded-xl cursor-pointer transition-colors duration-150 select-none group ${
                    isSelected ? 'bg-blue-50/60 border border-blue-100' : 'hover:bg-slate-50'
                  }`}
                >
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                    isSelected
                      ? 'bg-[#E8F1FF] text-[#1877F2]'
                      : 'bg-slate-100 text-slate-500 group-hover:bg-[#E8F1FF] group-hover:text-[#1877F2]'
                  }`}>
                    <MapPin className="w-4.5 h-4.5" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[13.5px] font-bold text-slate-800 leading-snug truncate">
                      {loc.name}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-400 mt-0.5 leading-snug truncate">
                      {loc.address}
                    </span>
                  </div>
                </div>
              )
            })}

            {filteredLocations.length === 0 && (
              <div className="text-center py-8 text-slate-400 font-semibold text-xs">
                Không tìm thấy địa điểm nào
              </div>
            )}
          </div>

          {/* Simulated Map Widget container */}
          <div className="relative h-[96px] bg-[#E5E5E5] rounded-xl overflow-hidden shrink-0 border border-slate-150/80 flex items-center justify-center">
            {/* Custom map pattern representing roads & grid */}
            <div className="absolute inset-0 opacity-20 pointer-events-none" 
              style={{
                backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
                backgroundSize: '16px 16px'
              }}
            />
            {/* Simulated road line SVGs inside map */}
            <div className="absolute top-1/2 left-0 right-0 h-[8px] bg-slate-300 -translate-y-1/2 rotate-12" />
            <div className="absolute top-0 bottom-0 left-1/3 w-[8px] bg-slate-300 -rotate-45" />
            
            {/* Map pin marker icon */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-[#1877F2]/10 border border-[#1877F2]/30 flex items-center justify-center animate-ping absolute -top-1" />
              <MapPin className="w-6.5 h-6.5 text-[#1877F2] drop-shadow-md z-10 fill-[#1877F2]/20" />
            </div>

            {/* Bubble "Bạn đang ở gần Landmark 81" */}
            <div className="absolute bottom-2.5 bg-white/95 border border-slate-200/80 px-3 py-1 rounded-full text-[10.5px] font-bold text-slate-700 shadow-sm z-10">
              Bạn đang ở gần Landmark 81
            </div>
          </div>

        </div>

        {/* Footer info bars */}
        <div className="border-t border-slate-100 px-5 py-3.5 flex items-center justify-between bg-slate-50/50 shrink-0 text-xs">
          <button
            type="button"
            className="text-[#1877F2] hover:text-[#156BEC] font-bold hover:underline cursor-pointer focus:outline-none"
            onClick={() => alert('Chức năng thêm địa điểm mới đang phát triển')}
          >
            Thêm địa điểm mới
          </button>
          
          <div className="flex items-center gap-1.5 text-slate-400 font-bold">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span>Đang cập nhật vị trí...</span>
          </div>
        </div>

      </div>
    </div>
  )
}
