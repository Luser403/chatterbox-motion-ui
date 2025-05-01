
import React from "react";
import { Message } from "../contexts/ChatContext";
import MessageBubble from "./MessageBubble";

interface MessageListProps {
  messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  // Group messages by day
  const groupedMessages: { [key: string]: Message[] } = messages.reduce((groups, message) => {
    const date = new Date(message.timestamp);
    const day = date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric' 
    });
    
    if (!groups[day]) {
      groups[day] = [];
    }
    
    groups[day].push(message);
    return groups;
  }, {} as { [key: string]: Message[] });

  // Get unique sender IDs for the current day's messages
  const getUniqueSenderIds = (dayMessages: Message[]) => {
    const uniqueIds = new Set<string>();
    dayMessages.forEach(message => {
      if (message.sender) {
        uniqueIds.add(message.sender.id);
      }
    });
    return uniqueIds;
  };

  // Format the date section
  const formatDateSection = (dateString: string) => {
    const today = new Date().toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric' 
    });

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayString = yesterday.toLocaleDateString('en-US', {
      weekday: 'long', 
      month: 'long', 
      day: 'numeric'
    });

    if (dateString === today) return "Today";
    if (dateString === yesterdayString) return "Yesterday";
    return dateString;
  };

  if (messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8 text-muted-foreground">
        <p className="text-lg">No messages yet</p>
        <p className="text-sm">Start a conversation!</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {Object.entries(groupedMessages).map(([day, dayMessages]) => {
        // Process messages to properly show avatars and group consecutive messages from the same sender
        const processedMessages = dayMessages.map((message, index) => {
          // Check if this is the first message of a group
          const isFirstInGroup = index === 0 || 
            dayMessages[index - 1].sender?.id !== message.sender?.id;
          
          // Check if this is the last message of a group
          const isLastInGroup = index === dayMessages.length - 1 || 
            dayMessages[index + 1].sender?.id !== message.sender?.id;
            
          return {
            ...message,
            showAvatar: isLastInGroup && !message.isOwn,
            isFirstInGroup,
            isLastInGroup,
          };
        });

        return (
          <div key={day} className="space-y-4">
            {/* Date header */}
            <div className="flex items-center justify-center">
              <div className="bg-secondary/70 px-4 py-1 rounded-full text-xs text-foreground/70">
                {formatDateSection(day)}
              </div>
            </div>
            
            {/* Day's messages */}
            <div className="space-y-4">
              {processedMessages.map((message) => (
                <MessageBubble 
                  key={message.id} 
                  message={message} 
                  showAvatar={message.showAvatar}
                  isFirstInGroup={message.isFirstInGroup}
                  isLastInGroup={message.isLastInGroup}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessageList;
