
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { User } from "../contexts/ChatContext";

interface UserAvatarProps {
  user: User;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ user }) => {
  const [isHovering, setIsHovering] = useState(false);
  
  // Get the initials from the user's name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Avatar 
        className={`h-10 w-10 border-2 ${
          user.status === "online" 
            ? "border-green-500" 
            : user.status === "away" 
              ? "border-amber-500" 
              : "border-gray-300"
        } transition-transform duration-500 transform ${
          isHovering ? "animate-rotate-slow" : ""
        }`}
        style={{ 
          transformStyle: "preserve-3d",
          perspective: "1000px" 
        }}
      >
        <AvatarImage src={user.avatar} alt={user.name} />
        <AvatarFallback className="bg-chat-medium text-white">
          {getInitials(user.name)}
        </AvatarFallback>
      </Avatar>
      <span 
        className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${
          user.status === "online" 
            ? "bg-green-500" 
            : user.status === "away" 
              ? "bg-amber-500" 
              : "bg-gray-400"
        }`} 
      />
    </div>
  );
};

export default UserAvatar;
