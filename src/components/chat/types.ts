export interface Message {
  id: string;
  senderId: "me" | "other";
  senderName: string;
  text: string;
  time: string;
  status?: "sent" | "delivered" | "read";
  attachment?: {
    name: string;
    size: string;
    type: string;
  };
}

export interface ChatThread {
  id: string;
  name: string;
  avatar: string;
  avatarBg: string;
  isGroup: boolean;
  lastMessage: string;
  time: string;
  unreadCount: number;
  status: "online" | "offline" | string;
  messages: Message[];
}

export interface ActiveCall {
  type: "audio" | "video";
  contactName: string;
  avatar: string;
  avatarBg: string;
  status: "ringing" | "connected";
  seconds: number;
}

export interface Contact {
  id: string;
  name: string;
  avatar: string;
  avatarBg: string;
  status: string;
  statusColor: string;
}
