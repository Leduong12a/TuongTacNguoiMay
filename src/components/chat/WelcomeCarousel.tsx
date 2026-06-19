import React from "react";

interface WelcomeSlide {
  title: string;
  description: string;
  image: string;
  badge: string;
  detail: string;
  actionText?: string;
}

interface WelcomeCarouselProps {
  slides: WelcomeSlide[];
  currentSlide: number;
  onPrev: () => void;
  onNext: () => void;
  onDotClick: (index: number) => void;
}

export const WelcomeCarousel: React.FC<WelcomeCarouselProps> = ({
  slides,
  currentSlide,
  onPrev,
  onNext,
  onDotClick,
}) => {
  const slide = slides[currentSlide];

  return (
    <div className="flex-1 flex flex-col h-full bg-gradient-to-br from-white to-slate-50/80 text-slate-800 relative items-center justify-center overflow-hidden p-12">
      {/* Left slide arrow */}
      <button
        type="button"
        onClick={onPrev}
        className="absolute left-10 top-1/2 transform -translate-y-1/2 w-11 h-11 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 cursor-pointer transition-all z-20 border border-slate-200/50 active:scale-90 shadow-sm"
        title="Slide trước"
      >
        <svg
          className="w-6 h-6 stroke-current fill-none stroke-[2.5]"
          viewBox="0 0 24 24"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      {/* Right slide arrow */}
      <button
        type="button"
        onClick={onNext}
        className="absolute right-10 top-1/2 transform -translate-y-1/2 w-11 h-11 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 cursor-pointer transition-all z-20 border border-slate-200/50 active:scale-90 shadow-sm"
        title="Slide sau"
      >
        <svg
          className="w-6 h-6 stroke-current fill-none stroke-[2.5]"
          viewBox="0 0 24 24"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      {/* Active Slide content wrapper */}
      <div className="max-w-md w-full flex flex-col items-center text-center px-4 transition-all duration-300">
        <h2 className="text-[21px] font-bold text-slate-800 tracking-tight mb-2.5">
          {slide.title}
        </h2>

        <p className="text-[12.8px] text-slate-500 leading-relaxed max-w-sm mb-9">
          {slide.description}
        </p>

        {/* Slider Image Illustration box */}
        <div className="relative w-80 h-48 rounded-xl overflow-hidden shadow-md border border-slate-200 mb-8 bg-slate-100 flex items-center justify-center select-none group">
          <img
            src={slide.image}
            alt="Slide illustration"
            className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
          />

          {/* Visual accent for dark mode slide */}
          {currentSlide === 1 && (
            <div className="absolute inset-0 bg-slate-950/20 flex items-center justify-center">
              <span className="w-14 h-14 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-yellow-500 border border-slate-250 text-2xl shadow-md animate-pulse">
                🌙
              </span>
            </div>
          )}
        </div>

        {/* Tag / Badge */}
        <span className="text-[13px] font-bold text-[#0056C6] tracking-wide block mb-1.5">
          {slide.badge}
        </span>

        {/* Detail sub-bullet */}
        <p className="text-[11.8px] text-slate-450 leading-relaxed mb-8 max-w-[280px]">
          {slide.detail}
        </p>

        {/* Optional Call to Action Button */}
        {slide.actionText && (
          <button
            type="button"
            onClick={() => alert("Đã áp dụng cài đặt giao diện tối!")}
            className="bg-[#0056C6] hover:bg-[#0047A5] text-white font-bold text-xs px-6 py-2.5 rounded-lg transition-colors cursor-pointer shadow-sm active:scale-95 focus:outline-none"
          >
            {slide.actionText}
          </button>
        )}
      </div>

      {/* Dots navigation indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex items-center gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => onDotClick(idx)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              idx === currentSlide
                ? "bg-[#0056C6] w-5"
                : "bg-slate-200 hover:bg-slate-350 w-1.5"
            }`}
            title={`Tới slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
