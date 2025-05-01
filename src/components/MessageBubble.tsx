
import React, { useEffect, useState } from "react";
import { Message } from "../contexts/ChatContext";
import { formatTimestamp } from "../utils/mockData";
import UserAvatar from "./UserAvatar";

interface MessageBubbleProps {
  message: Message;
  showAvatar?: boolean;
  isFirstInGroup?: boolean;
  isLastInGroup?: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ 
  message, 
  showAvatar = false,
  isFirstInGroup = true,
  isLastInGroup = true
}) => {
  const [isNew, setIsNew] = useState(message.isNew);

  // Remove the "new" status after animation completes
  useEffect(() => {
    if (isNew) {
      const timer = setTimeout(() => {
        setIsNew(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isNew]);

  // For system messages
  if (!message.sender) {
    return (
      <div className="flex justify-center my-4">
        <div className="bg-secondary/70 px-4 py-2 rounded-full text-sm text-foreground/70 max-w-[80%]">
          {message.text}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex ${message.isOwn ? "justify-end" : "justify-start"} ${
        isFirstInGroup ? "mt-4" : "mt-1"
      }`}
    >
      {!message.isOwn && showAvatar ? (
        <div className="mr-2 flex-shrink-0 self-end">
          <UserAvatar user={message.sender} />
        </div>
      ) : (
        <div className={message.isOwn ? "hidden" : "mr-2 w-10"} /> 
      )}

      <div
        className={`message-bubble max-w-[75%] ${
          isNew ? "animate-pop" : ""
        } ${
          message.isOwn
            ? "bg-chat-gradient text-white rounded-tl-xl rounded-tr-xl rounded-bl-xl"
            : "bg-white border border-gray-200 text-foreground rounded-tl-xl rounded-tr-xl rounded-br-xl shadow-sm"
        } ${
          isFirstInGroup
            ? message.isOwn
              ? "rounded-tr-xl"
              : "rounded-tl-xl"
            : message.isOwn
            ? "rounded-tr-sm"
            : "rounded-tl-sm"
        } ${
          isLastInGroup
            ? message.isOwn
              ? "rounded-br-sm"
              : "rounded-bl-sm"
            : ""
        } px-4 py-2`}
      >
        <p className="whitespace-pre-line">{message.text}</p>
        <div
          className={`text-xs mt-1 ${
            message.isOwn ? "text-white/80" : "text-muted-foreground"
          } text-right`}
        >
          {formatTimestamp(message.timestamp)}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
