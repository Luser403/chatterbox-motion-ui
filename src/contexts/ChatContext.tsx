
import React, { createContext, useContext, useEffect, useState } from "react";
import { generateMockMessage } from "../utils/mockData";

// Define types for our context
export interface User {
  id: string;
  name: string;
  avatar: string;
  status: "online" | "offline" | "away";
  lastSeen?: string;
}

export interface Message {
  id: string;
  text: string;
  sender: User | null; // null means system message
  timestamp: string;
  isOwn: boolean;
  isNew?: boolean;
}

export interface ChatContextType {
  users: User[];
  activeUser: User | null;
  messages: Message[];
  sendMessage: (text: string) => void;
  setActiveUser: (userId: string) => void;
}

// Create the context with a default value
export const ChatContext = createContext<ChatContextType | null>(null);

// Custom hook to use the chat context
export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChatContext must be used within a ChatProvider");
  }
  return context;
};

// Mock users data
const mockUsers: User[] = [
  {
    id: "user-1",
    name: "John Smith",
    avatar: "https://i.pravatar.cc/150?img=3",
    status: "online",
  },
  {
    id: "user-2",
    name: "Emma Watson",
    avatar: "https://i.pravatar.cc/150?img=5",
    status: "online",
    lastSeen: "Just now",
  },
  {
    id: "user-3",
    name: "Michael Johnson",
    avatar: "https://i.pravatar.cc/150?img=8",
    status: "away",
    lastSeen: "5 min ago",
  },
  {
    id: "user-4",
    name: "Sophia Williams",
    avatar: "https://i.pravatar.cc/150?img=9",
    status: "offline",
    lastSeen: "2 hours ago",
  },
  {
    id: "user-5",
    name: "Robert Brown",
    avatar: "https://i.pravatar.cc/150?img=12",
    status: "offline",
    lastSeen: "Yesterday",
  },
];

// The current user 
const currentUser: User = {
  id: "current-user",
  name: "You",
  avatar: "https://i.pravatar.cc/150?img=11",
  status: "online",
};

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [activeUser, setActiveUser] = useState<User | null>(mockUsers[0]);
  const [messages, setMessages] = useState<Message[]>([]);

  // Load messages from local storage on component mount
  useEffect(() => {
    const storedMessages = localStorage.getItem("chatMessages");
    if (storedMessages) {
      try {
        setMessages(JSON.parse(storedMessages));
      } catch (error) {
        console.error("Failed to parse stored messages", error);
        // Initialize with mock data if parsing fails
        initializeWithMockData();
      }
    } else {
      // Initialize with mock data if no stored messages
      initializeWithMockData();
    }
  }, []);

  // Update local storage whenever messages change
  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  // Initialize with some mock messages
  const initializeWithMockData = () => {
    // Generate 10 mock messages between the current user and the active user
    const initialMessages: Message[] = [];
    
    // Add a welcome message
    initialMessages.push({
      id: `msg-welcome`,
      text: "Welcome to the chat! 👋 Send a message to get started.",
      sender: null, // System message
      timestamp: new Date().toISOString(),
      isOwn: false,
    });
    
    // Generate some mock conversation
    for (let i = 1; i <= 5; i++) {
      // Message from the active user
      initialMessages.push({
        id: `msg-${Date.now()}-${i}-a`,
        text: generateMockMessage(),
        sender: mockUsers[0],
        timestamp: new Date(Date.now() - (10 - i) * 60000).toISOString(),
        isOwn: false,
      });
      
      // Response from the current user
      initialMessages.push({
        id: `msg-${Date.now()}-${i}-b`,
        text: generateMockMessage(),
        sender: currentUser,
        timestamp: new Date(Date.now() - (10 - i) * 55000).toISOString(),
        isOwn: true,
      });
    }
    
    setMessages(initialMessages);
  };

  // Send a new message
  const sendMessage = (text: string) => {
    if (!text.trim() || !activeUser) return;
    
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      text,
      sender: currentUser,
      timestamp: new Date().toISOString(),
      isOwn: true,
      isNew: true,
    };
    
    setMessages(prev => [...prev, newMessage]);
    
    // Simulate a response from the active user
    setTimeout(() => {
      const response: Message = {
        id: `msg-${Date.now() + 1}`,
        text: generateMockMessage(),
        sender: activeUser,
        timestamp: new Date().toISOString(),
        isOwn: false,
        isNew: true,
      };
      
      setMessages(prev => [...prev, response]);
    }, 1000 + Math.random() * 2000); // Random delay between 1-3 seconds
  };

  // Change the active user
  const handleSetActiveUser = (userId: string) => {
    const user = users.find(u => u.id === userId) || null;
    setActiveUser(user);
  };

  return (
    <ChatContext.Provider 
      value={{
        users,
        activeUser,
        messages,
        sendMessage,
        setActiveUser: handleSetActiveUser,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
