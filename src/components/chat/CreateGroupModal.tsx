import React from "react";
import { X, Search, Plus } from "lucide-react";
import type { ChatThread, Contact } from "./types";

interface CreateGroupModalProps {
  contacts: Contact[];
  onClose: () => void;
  onCreateGroup: (thread: Omit<ChatThread, "id">) => void;
}

export const CreateGroupModal: React.FC<CreateGroupModalProps> = ({
  contacts,
  onClose,
  onCreateGroup,
}) => {
  const [newGroupName, setNewGroupName] = React.useState("");
  const [selectedMembers, setSelectedMembers] = React.useState<string[]>([]);
  const [memberSearch, setMemberSearch] = React.useState("");

  const filteredContacts = contacts.filter((c) =>
    c.name.toLowerCase().includes(memberSearch.toLowerCase()),
  );

  const handleToggleMember = (id: string) => {
    setSelectedMembers((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id],
    );
  };

  const handleCreate = () => {
    if (!newGroupName.trim() || selectedMembers.length < 2) return;
    const memberNames = contacts
      .filter((c) => selectedMembers.includes(c.id))
      .map((c) => c.name);
    onCreateGroup({
      name: newGroupName.trim(),
      avatar: newGroupName.trim().slice(0, 2).toUpperCase(),
      avatarBg: "bg-gradient-to-tr from-violet-500 to-blue-600",
      isGroup: true,
      lastMessage: "Nhóm được tạo",
      time: "Vừa xong",
      unreadCount: 0,
      status: `${selectedMembers.length + 1} thành viên`,
      messages: [
        {
          id: `msg_init_${Date.now()}`,
          senderId: "me",
          senderName: "Phùng Văn Duy",
          text: `Đã tạo nhóm "${newGroupName.trim()}" với ${memberNames.join(", ")}`,
          time: "Vừa xong",
        },
      ],
    });
  };

  const handleClose = () => {
    setNewGroupName("");
    setSelectedMembers([]);
    setMemberSearch("");
    onClose();
  };

  const showError =
    (!newGroupName.trim() || selectedMembers.length < 2) &&
    (newGroupName !== "" || selectedMembers.length > 0);

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[460px] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <h3 className="text-[15px] font-bold text-slate-800">
            Tạo nhóm chat mới
          </h3>
          <button
            type="button"
            onClick={handleClose}
            className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-500 cursor-pointer transition-colors"
          >
            <X className="w-4.5 h-4.5" />
          </button>
        </div>

        {/* Avatar + Name input */}
        <div className="flex items-center gap-4 px-5 pt-5 pb-4">
          <div className="relative shrink-0">
            <div className="w-14 h-14 rounded-full bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center cursor-pointer hover:bg-slate-150 transition-colors">
              <svg
                className="w-6 h-6 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full bg-[#0056C6] flex items-center justify-center shadow">
              <Plus className="w-3 h-3 text-white" />
            </div>
          </div>
          <input
            type="text"
            value={newGroupName}
            onChange={(e) => setNewGroupName(e.target.value)}
            placeholder="Nhập tên nhóm"
            className="flex-1 h-10 px-4 bg-slate-50 border border-slate-200 rounded-xl text-[13.5px] text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0056C6] focus:ring-1 focus:ring-[#0056C6] transition-all"
          />
        </div>

        {/* Member selection */}
        <div className="px-5 pb-2">
          <p className="text-[12px] font-bold text-slate-500 uppercase tracking-wide mb-2">
            Chọn thành viên
          </p>
          {/* Search */}
          <div className="flex items-center gap-2 bg-slate-100 rounded-xl px-3 py-2 mb-3">
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              type="text"
              value={memberSearch}
              onChange={(e) => setMemberSearch(e.target.value)}
              placeholder="Tìm kiếm bạn bè"
              className="flex-1 bg-transparent text-[13px] text-slate-700 placeholder-slate-400 outline-none"
            />
          </div>

          {/* Contact list */}
          <div className="flex flex-col max-h-[240px] overflow-y-auto -mx-1 px-1">
            {filteredContacts.map((contact) => {
              const isSelected = selectedMembers.includes(contact.id);
              return (
                <label
                  key={contact.id}
                  className="flex items-center gap-3 py-2.5 px-2 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors group"
                >
                  <div
                    className={`w-10 h-10 rounded-full ${contact.avatarBg} text-white font-bold text-[13px] flex items-center justify-center shrink-0 shadow-sm`}
                  >
                    {contact.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13.5px] font-semibold text-slate-800 truncate">
                      {contact.name}
                    </p>
                    <p className={`text-[11.5px] ${contact.statusColor} font-medium`}>
                      {contact.status}
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => handleToggleMember(contact.id)}
                    className="w-4 h-4 accent-[#0056C6] rounded cursor-pointer"
                  />
                </label>
              );
            })}
          </div>
        </div>

        {/* Validation error */}
        {showError && (
          <div className="mx-5 mb-2 flex items-center gap-2 text-red-500 text-[12px]">
            <svg
              className="w-4 h-4 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10" strokeWidth="2" />
              <line x1="12" y1="8" x2="12" y2="12" strokeWidth="2" />
              <line x1="12" y1="16" x2="12.01" y2="16" strokeWidth="2" />
            </svg>
            <span>
              Vui lòng nhập tên nhóm và chọn ít nhất 2 thành viên
            </span>
          </div>
        )}

        {/* Footer buttons */}
        <div className="flex items-center justify-end gap-3 px-5 py-4 border-t border-slate-100">
          <button
            type="button"
            onClick={handleClose}
            className="px-5 py-2 rounded-xl text-[13.5px] font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer transition-colors"
          >
            Hủy
          </button>
          <button
            type="button"
            onClick={handleCreate}
            disabled={!newGroupName.trim() || selectedMembers.length < 2}
            className={`px-5 py-2 rounded-xl text-[13.5px] font-bold transition-all ${
              newGroupName.trim() && selectedMembers.length >= 2
                ? "bg-[#0056C6] hover:bg-[#0047A5] text-white cursor-pointer shadow-sm active:scale-95"
                : "bg-slate-100 text-slate-400 cursor-not-allowed"
            }`}
          >
            Tạo nhóm
          </button>
        </div>
      </div>
    </div>
  );
};
