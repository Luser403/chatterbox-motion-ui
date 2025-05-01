
import React, { useState } from "react";
import { useChatContext } from "../contexts/ChatContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Bell, Search, Settings } from "lucide-react";
import UserAvatar from "./UserAvatar";

interface ChatSidebarProps {
  onCloseSidebar?: () => void;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({ onCloseSidebar }) => {
  const { users, activeUser, setActiveUser } = useChatContext();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUserClick = (userId: string) => {
    setActiveUser(userId);
    if (onCloseSidebar) {
      onCloseSidebar();
    }
  };

  return (
    <div className="flex flex-col h-full p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-chat-medium to-chat-dark bg-clip-text text-transparent">
          Chatter
        </h1>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon">
            <Bell size={20} />
          </Button>
          <Button variant="ghost" size="icon">
            <Settings size={20} />
          </Button>
          {onCloseSidebar && (
            <Button variant="ghost" size="icon" onClick={onCloseSidebar} className="md:hidden">
              <ArrowLeft size={20} />
            </Button>
          )}
        </div>
      </div>
      
      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search contacts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9 bg-white bg-opacity-50"
        />
      </div>
      
      {/* User list */}
      <div className="flex-1 overflow-y-auto space-y-1 pr-1">
        {filteredUsers.length === 0 ? (
          <p className="text-sm text-center text-muted-foreground py-4">No contacts found</p>
        ) : (
          filteredUsers.map((user) => (
            <div
              key={user.id}
              className={`flex items-center gap-3 rounded-lg p-3 cursor-pointer transition-all duration-200 
                ${activeUser?.id === user.id 
                  ? "bg-chat-medium bg-opacity-20 shadow-sm" 
                  : "hover:bg-chat-medium hover:bg-opacity-10"}`}
              onClick={() => handleUserClick(user.id)}
            >
              <UserAvatar user={user} />
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{user.name}</p>
                <div className="flex items-center text-xs text-muted-foreground">
                  <span className={`h-2 w-2 rounded-full mr-1 
                    ${user.status === "online" ? "bg-green-500" : 
                      user.status === "away" ? "bg-amber-500" : "bg-gray-400"}`} 
                  />
                  <span>
                    {user.status === "online" ? "Online" : user.lastSeen}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      
      {/* Current user info */}
      <div className="pt-4 mt-2 border-t">
        <div className="flex items-center gap-3 rounded-lg p-2">
          <UserAvatar
            user={{
              id: "current-user",
              name: "You",
              avatar: "https://i.pravatar.cc/150?img=11",
              status: "online",
            }}
          />
          <div className="flex-1">
            <p className="font-medium">You</p>
            <p className="text-xs text-muted-foreground">Online</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatSidebar;
