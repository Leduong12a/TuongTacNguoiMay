import React from "react";
import { ChevronDown, BellOff, Timer, Palette } from "lucide-react";
import type { ChatThread } from "./types";

interface ChatOptionsPanelProps {
  thread: ChatThread;
  expandBg: boolean;
  expandAutoDelete: boolean;
  autoDeleteOption: "off" | "24h" | "7d";
  expandMute: boolean;
  muteOption: "1h" | "8h" | "24h" | null;
  muteForever: boolean;
  onToggleExpandBg: () => void;
  onToggleExpandAutoDelete: () => void;
  onSetAutoDeleteOption: (opt: "off" | "24h" | "7d") => void;
  onToggleExpandMute: () => void;
  onSetMuteOption: (opt: "1h" | "8h" | "24h") => void;
  onToggleMuteForever: () => void;
}

export const ChatOptionsPanel: React.FC<ChatOptionsPanelProps> = ({
  thread,
  expandBg,
  expandAutoDelete,
  autoDeleteOption,
  expandMute,
  muteOption,
  muteForever,
  onToggleExpandBg,
  onToggleExpandAutoDelete,
  onSetAutoDeleteOption,
  onToggleExpandMute,
  onSetMuteOption,
  onToggleMuteForever,
}) => {
  return (
    <div className="w-[280px] shrink-0 bg-white border-l border-slate-200 flex flex-col h-full overflow-y-auto transition-all duration-300">
      {/* Avatar & Name */}
      <div className="flex flex-col items-center py-8 px-4 border-b border-slate-100">
        <div
          className={`w-20 h-20 rounded-full ${thread.avatarBg} text-white font-bold text-[26px] flex items-center justify-center shadow-md mb-3`}
        >
          {thread.avatar}
        </div>
        <span className="text-[15px] font-bold text-slate-800">
          {thread.name}
        </span>
        <span className="text-[11.5px] text-slate-400 font-medium mt-1">
          {thread.isGroup
            ? thread.status
            : thread.status === "online"
              ? "Đang hoạt động"
              : "Ngoại tuyến"}
        </span>
      </div>

      {/* Menu Items */}
      <div className="p-3 flex flex-col gap-1.5">
        {/* Đổi hình nền chat */}
        <div className="rounded-xl border border-slate-100 overflow-hidden">
          <button
            type="button"
            onClick={onToggleExpandBg}
            className="w-full flex items-center justify-between px-4 py-3 hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-3 text-slate-700">
              <Palette className="w-4 h-4 text-slate-500" />
              <span className="text-[13px] font-semibold">
                Đổi hình nền chat
              </span>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${expandBg ? "rotate-180" : ""}`}
            />
          </button>
          {expandBg && (
            <div className="px-4 pb-3 pt-1 flex flex-col gap-1 border-t border-slate-100">
              {["Màu xanh dương", "Màu trắng tinh", "Gradient tím", "Gradient xanh lá"].map(
                (bg) => (
                  <button
                    key={bg}
                    type="button"
                    className="text-left text-[12.5px] text-slate-600 hover:text-[#0056C6] py-1.5 px-2 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    {bg}
                  </button>
                ),
              )}
            </div>
          )}
        </div>

        {/* Tin nhắn tự xóa */}
        <div className="rounded-xl border border-slate-100 overflow-hidden">
          <button
            type="button"
            onClick={onToggleExpandAutoDelete}
            className="w-full flex items-center justify-between px-4 py-3 hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-3 text-slate-700">
              <Timer className="w-4 h-4 text-slate-500" />
              <span className="text-[13px] font-semibold">
                Tin nhắn tự xóa
              </span>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${expandAutoDelete ? "rotate-180" : ""}`}
            />
          </button>
          {expandAutoDelete && (
            <div className="px-4 pb-3 pt-2 border-t border-slate-100">
              <div className="flex gap-2">
                {(["off", "24h", "7d"] as const).map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => onSetAutoDeleteOption(opt)}
                    className={`flex-1 py-1.5 rounded-lg text-[12px] font-bold border transition-all ${
                      autoDeleteOption === opt
                        ? "bg-[#E8F1FF] border-[#0056C6] text-[#0056C6]"
                        : "border-slate-200 text-slate-500 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    {opt === "off" ? "Off" : opt}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Tắt thông báo */}
        <div className="rounded-xl border border-slate-100 overflow-hidden">
          <button
            type="button"
            onClick={onToggleExpandMute}
            className="w-full flex items-center justify-between px-4 py-3 hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-3 text-slate-700">
              <BellOff className="w-4 h-4 text-slate-500" />
              <span className="text-[13px] font-semibold">Tắt thông báo</span>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${expandMute ? "rotate-180" : ""}`}
            />
          </button>
          {expandMute && (
            <div className="px-4 pb-3 pt-2 flex flex-col gap-1 border-t border-slate-100">
              {[
                { key: "1h", label: "1 giờ" },
                { key: "8h", label: "8 giờ" },
                { key: "24h", label: "24 giờ" },
              ].map((opt) => (
                <label
                  key={opt.key}
                  className="flex items-center gap-3 py-1.5 cursor-pointer group"
                >
                  <input
                    type="radio"
                    name="muteOption"
                    checked={muteOption === opt.key}
                    onChange={() => onSetMuteOption(opt.key as "1h" | "8h" | "24h")}
                    className="w-4 h-4 accent-[#0056C6] cursor-pointer"
                  />
                  <span className="text-[13px] text-slate-700 group-hover:text-slate-900">
                    {opt.label}
                  </span>
                </label>
              ))}
              <div className="border-t border-slate-100 mt-1 pt-2 flex items-center justify-between">
                <span className="text-[13px] text-slate-700">
                  Đến khi bật lại
                </span>
                <button
                  type="button"
                  onClick={onToggleMuteForever}
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none ${
                    muteForever ? "bg-[#0056C6]" : "bg-slate-200"
                  }`}
                >
                  <span
                    className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${
                      muteForever ? "translate-x-4.5" : "translate-x-0.5"
                    }`}
                  />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
