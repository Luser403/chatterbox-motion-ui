
import React, { useState } from "react";
import { useChatContext } from "../contexts/ChatContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

const MessageInput: React.FC = () => {
  const { sendMessage, activeUser } = useChatContext();
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && activeUser) {
      sendMessage(message);
      setMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        disabled={!activeUser}
        className="flex-1 bg-secondary/50 border-0 focus-visible:ring-1 focus-visible:ring-chat-medium"
      />
      <Button 
        type="submit" 
        disabled={!message.trim() || !activeUser}
        className="bg-chat-medium hover:bg-chat-dark"
      >
        <Send size={18} />
        <span className="sr-only">Send message</span>
      </Button>
    </form>
  );
};

export default MessageInput;
