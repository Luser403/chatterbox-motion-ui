
# Chatter - Real-Time Chat Application

A web-based real-time chat application built with React and Tailwind CSS, featuring a responsive UI and simulated messaging with local storage.

## Features

- Modern, clean UI with a minimalist design and gradient accents
- Fully responsive layout for mobile, tablet and desktop
- Real-time message simulation with local storage persistence
- 3D animated avatars and interactive message bubbles
- Smooth transitions and animations for an engaging user experience
- User status indicators (online, away, offline)
- Message grouping by date and sender

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS for styling
- CSS animations and 3D transforms
- Local storage for data persistence
- Framer Motion for smooth animations

## Setup Instructions

1. Clone this repository
```bash
git clone <repository-url>
cd chatter
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm start
```

4. Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
src/
├── components/         # React components
│   ├── ChatApp.tsx     # Main application component
│   ├── ChatSidebar.tsx # Sidebar with user list
│   ├── ChatWindow.tsx  # Main chat interface
│   ├── MessageBubble.tsx # Individual message component
│   ├── MessageInput.tsx  # Message input component
│   ├── MessageList.tsx   # Message list component
│   └── UserAvatar.tsx    # User avatar component with 3D effects
├── contexts/
│   └── ChatContext.tsx   # Context for managing chat state
├── utils/
│   └── mockData.ts       # Utilities for mock data generation
├── pages/
│   ├── Index.tsx         # Main page
└── App.tsx               # Root application component
```

## Deployment with Vercel

1. Push your code to GitHub
2. Log in to Vercel and create a new project
3. Import your GitHub repository
4. Deploy with default settings (no environment variables required)

Live Demo: [Insert Vercel URL]

## Performance Optimizations

- Memoization of React components to prevent unnecessary re-renders
- Optimized animations using CSS transforms
- Efficient message grouping algorithm
- Throttled scroll events for smooth scrolling performance

## Future Enhancements

- Theme switcher (light/dark mode)
- Emoji picker and GIF support
- Image and file sharing capabilities
- Voice and video calling features
- Notification system

## License

MIT
