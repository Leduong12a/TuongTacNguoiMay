import React, { useEffect, useRef } from "react";
import {
  Phone,
  Video,
  VideoOff,
  ChevronDown,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
} from "lucide-react";
import type { ActiveCall } from "./types";

interface CallModalProps {
  activeCall: ActiveCall;
  isMuted: boolean;
  isSpeakerOn: boolean;
  isVideoOn: boolean;
  onClose: () => void;
  onAccept: () => void;
  onToggleMute: () => void;
  onToggleSpeaker: () => void;
  onToggleVideo: () => void;
  formatTime: (seconds: number) => string;
}

export const CallModal: React.FC<CallModalProps> = ({
  activeCall,
  isMuted,
  isSpeakerOn,
  isVideoOn,
  onClose,
  onAccept,
  onToggleMute,
  onToggleSpeaker,
  onToggleVideo,
  formatTime,
}) => {
  const localVideoRef = useRef<HTMLVideoElement>(null);

  // Start/stop local camera when video call begins/ends
  useEffect(() => {
    let stream: MediaStream | null = null;
    if (activeCall.type === "video" && isVideoOn) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: false })
        .then((s) => {
          stream = s;
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = s;
          }
        })
        .catch(() => {});
    }
    return () => {
      if (stream) stream.getTracks().forEach((t) => t.stop());
      if (localVideoRef.current) localVideoRef.current.srcObject = null;
    };
  }, [activeCall.type, isVideoOn]);

  if (activeCall.type === "video") {
    return (
      /* VIDEO CALL: Full-screen camera view */
      <div className="fixed inset-0 z-50 bg-black flex flex-col">
        {/* Local camera as background */}
        {isVideoOn ? (
          <video
            ref={localVideoRef}
            autoPlay
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-slate-900 flex items-center justify-center">
            <VideoOff className="w-16 h-16 text-white/30" />
          </div>
        )}

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/70 pointer-events-none" />

        {/* Top bar */}
        <div className="relative z-10 flex items-center justify-between px-6 pt-6">
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer transition-colors"
          >
            <ChevronDown className="w-5 h-5" />
          </button>
          <div className="text-center">
            <p className="text-white font-bold text-[16px]">
              {activeCall.contactName}
            </p>
            <p className="text-white/60 text-[12px] font-semibold">
              {activeCall.status === "ringing"
                ? "Đang kết nối..."
                : formatTime(activeCall.seconds)}
            </p>
          </div>
          <div className="w-9" />
        </div>

        {/* Contact avatar (picture-in-picture) */}
        <div className="absolute top-20 right-5 z-10">
          <div
            className={`w-24 h-32 rounded-2xl ${activeCall.avatarBg} flex items-center justify-center text-white text-2xl font-bold shadow-xl border-2 border-white/20 overflow-hidden`}
          >
            {activeCall.avatar}
          </div>
        </div>

        {/* Bottom controls */}
        <div className="relative z-10 mt-auto pb-10 flex flex-col items-center gap-5">
          {activeCall.status === "ringing" && (
            <p className="text-white/60 text-[13px] font-semibold animate-pulse">
              Đang đổ chuông...
            </p>
          )}
          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={onToggleMute}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                isMuted
                  ? "bg-red-500 text-white"
                  : "bg-white/15 hover:bg-white/25 text-white"
              }`}
              title="Tắt mic"
            >
              {isMuted ? (
                <MicOff className="w-5 h-5" />
              ) : (
                <Mic className="w-5 h-5" />
              )}
            </button>
            <button
              type="button"
              onClick={onToggleVideo}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                !isVideoOn
                  ? "bg-red-500 text-white"
                  : "bg-white/15 hover:bg-white/25 text-white"
              }`}
              title="Tắt camera"
            >
              {isVideoOn ? (
                <Video className="w-5 h-5" />
              ) : (
                <VideoOff className="w-5 h-5" />
              )}
            </button>
            {activeCall.status === "ringing" && (
              <button
                type="button"
                onClick={onAccept}
                className="w-12 h-12 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center text-white shadow-lg active:scale-95 transition-all cursor-pointer"
                title="Chấp nhận"
              >
                <Phone className="w-5 h-5 fill-current" />
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="w-14 h-14 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center text-white shadow-lg active:scale-95 transition-all cursor-pointer"
              title="Gác máy"
            >
              <Phone className="w-6 h-6 fill-current transform rotate-[135deg]" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* AUDIO CALL: Card modal */
  return (
    <div className="fixed inset-0 bg-[#0F172A]/70 backdrop-blur-md z-50 flex items-center justify-center animate-fadeIn">
      <div className="w-[360px] bg-[#1a2232] rounded-3xl p-8 text-white shadow-2xl border border-white/5 flex flex-col items-center relative animate-scaleUp">
        {/* Top row */}
        <div className="w-full flex justify-between items-center mb-6">
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer"
          >
            <ChevronDown className="w-4 h-4" />
          </button>
          <button
            type="button"
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer"
          >
            <svg
              className="w-4 h-4 fill-none stroke-current"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <line x1="19" y1="8" x2="19" y2="14" />
              <line x1="22" y1="11" x2="16" y2="11" />
            </svg>
          </button>
        </div>

        {/* Avatar & Ring */}
        <div className="relative mb-6">
          <div className="absolute inset-[-8px] rounded-full bg-blue-500/20 animate-ping" />
          <div
            className={`w-24 h-24 rounded-full ${activeCall.avatarBg} text-white text-3xl font-bold flex items-center justify-center border-4 border-white/10 relative z-10 shadow-lg`}
          >
            {activeCall.avatar}
          </div>
        </div>

        {/* Contact Name & Status */}
        <h3 className="text-[20px] font-bold tracking-wide mb-1.5">
          {activeCall.contactName}
        </h3>
        <p className="text-[12.5px] text-white/50 font-semibold mb-8">
          {activeCall.status === "ringing"
            ? "Đang đổ chuông..."
            : `Đã kết nối • ${formatTime(activeCall.seconds)}`}
        </p>

        {/* Controls row */}
        <div className="flex gap-4 mb-9">
          <button
            type="button"
            onClick={onToggleMute}
            className={`w-11 h-11 rounded-full flex items-center justify-center transition-all cursor-pointer ${
              isMuted
                ? "bg-red-500/25 border border-red-500 text-red-500"
                : "bg-white/5 hover:bg-white/10 text-white"
            }`}
            title="Tắt tiếng"
          >
            {isMuted ? (
              <MicOff className="w-5 h-5" />
            ) : (
              <Mic className="w-5 h-5" />
            )}
          </button>
          <button
            type="button"
            onClick={onToggleSpeaker}
            className={`w-11 h-11 rounded-full flex items-center justify-center transition-all cursor-pointer ${
              isSpeakerOn
                ? "bg-blue-500/25 border border-blue-500 text-blue-400"
                : "bg-white/5 hover:bg-white/10 text-white"
            }`}
            title="Loa ngoài"
          >
            {isSpeakerOn ? (
              <Volume2 className="w-5 h-5" />
            ) : (
              <VolumeX className="w-5 h-5 text-white/70" />
            )}
          </button>
          <button
            type="button"
            onClick={onToggleVideo}
            className={`w-11 h-11 rounded-full flex items-center justify-center transition-all cursor-pointer ${
              isVideoOn
                ? "bg-green-500/25 border border-green-500 text-green-400"
                : "bg-white/5 hover:bg-white/10 text-white"
            }`}
            title="Camera"
          >
            {isVideoOn ? (
              <Video className="w-5 h-5" />
            ) : (
              <VideoOff className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Accept / Decline buttons */}
        <div className="flex gap-8">
          {activeCall.status === "ringing" && (
            <button
              type="button"
              onClick={onAccept}
              className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center text-white shadow-lg shadow-green-950/40 active:scale-95 transition-all cursor-pointer"
              title="Trả lời"
            >
              <Phone className="w-6 h-6 fill-current" />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="w-14 h-14 rounded-full bg-red-500 hover:bg-red-650 flex items-center justify-center text-white shadow-lg shadow-red-950/40 active:scale-95 transition-all cursor-pointer"
            title="Gác máy"
          >
            <Phone className="w-6 h-6 fill-current transform rotate-[135deg]" />
          </button>
        </div>
      </div>
    </div>
  );
};
