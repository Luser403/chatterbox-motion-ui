
import React, { useEffect, useRef } from "react";
import { useChatContext } from "../contexts/ChatContext";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import UserAvatar from "./UserAvatar";
import { Menu } from "lucide-react";

const ChatWindow: React.FC = () => {
  const { activeUser, messages } = useChatContext();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-full rounded-tl-3xl bg-white bg-opacity-90 shadow-lg overflow-hidden">
      {/* Chat header */}
      {activeUser ? (
        <div className="flex items-center p-4 border-b shadow-sm bg-white z-10">
          <UserAvatar user={activeUser} />
          <div className="ml-4">
            <h2 className="font-medium">{activeUser.name}</h2>
            <p className="text-xs text-muted-foreground">
              {activeUser.status === "online" ? "Active now" : `Last seen ${activeUser.lastSeen}`}
            </p>
          </div>
        </div>
      ) : (
        <div className="p-4 border-b shadow-sm">
          <p>Select a contact to start chatting</p>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <MessageList messages={messages} />
        <div ref={messagesEndRef} />
      </div>

      {/* Message input */}
      <div className="p-4 bg-white border-t">
        <MessageInput />
      </div>
    </div>
  );
};

export default ChatWindow;
