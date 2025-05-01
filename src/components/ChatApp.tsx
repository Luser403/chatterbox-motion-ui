
import React, { useState, useEffect } from "react";
import { ChatProvider } from "../contexts/ChatContext";
import ChatSidebar from "./ChatSidebar";
import ChatWindow from "./ChatWindow";
import { Button } from "@/components/ui/button";
import { Menu, ArrowLeft } from "lucide-react";

const ChatApp: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're on mobile and set sidebar state accordingly
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    // Check on initial load
    checkIfMobile();
    
    // Add event listener for window resize
    window.addEventListener("resize", checkIfMobile);
    
    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <ChatProvider>
      <div className="flex h-screen w-full overflow-hidden bg-app-gradient">
        {/* Sidebar */}
        <div 
          className={`${
            isSidebarOpen ? "block" : "hidden"
          } md:block glass-effect w-full md:w-80 shrink-0 transition-all duration-300 z-10 ${
            isMobile ? "fixed md:relative" : ""
          }`}
        >
          <ChatSidebar onCloseSidebar={isMobile ? toggleSidebar : undefined} />
        </div>

        {/* Main chat window */}
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden absolute top-4 left-4 z-20 bg-white bg-opacity-80 rounded-full shadow-md"
            onClick={toggleSidebar}
          >
            {isSidebarOpen ? <ArrowLeft size={20} /> : <Menu size={20} />}
          </Button>
          
          <ChatWindow />
        </div>
      </div>
    </ChatProvider>
  );
};

export default ChatApp;
