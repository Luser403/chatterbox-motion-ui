
// Mock data generator utilities

// Generate a random greeting message
export function generateMockMessage(): string {
  const messages = [
    "Hey there! How's your day going?",
    "I've been working on that project we discussed.",
    "Did you see the latest design updates?",
    "Just finished the code review. Looking good!",
    "When are we meeting for coffee?",
    "The client loved our presentation!",
    "I'm still working on those UI animations.",
    "Have you tried the new React hooks API?",
    "Just pushed my changes to the repo.",
    "Need your feedback on the latest mockups!",
    "Can we discuss the project timeline?",
    "I'm thinking we should refactor that component.",
    "Tailwind CSS is such a time-saver!",
    "Just discovered a great React performance trick.",
    "Let's catch up on the project status.",
    "The new design system is coming along nicely.",
    "I've implemented the chat functionality you requested.",
    "What do you think about the new color scheme?",
    "Found a bug in the production build.",
    "Just deployed the latest version to staging.",
  ];
  
  return messages[Math.floor(Math.random() * messages.length)];
}

// Format timestamp to human readable format
export function formatTimestamp(timestamp: string): string {
  const date = new Date(timestamp);
  const now = new Date();
  
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) {
    return 'Just now';
  }
  
  if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  }
  
  if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  }
  
  // For messages from yesterday or older, show the date
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
