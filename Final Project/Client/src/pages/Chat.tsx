import React, { useState, useEffect, useRef } from 'react';
import { User } from 'firebase/auth';
import ChatRoom from '../components/organisms/ChatRoom';
import axios from 'axios';

const WEBSOCKET_URL = import.meta.env.VITE_WEBSOCKET_URL;
const API_URL = import.meta.env.VITE_API_URL;

interface ChatMessage {
  content: string;
  username: string;
  timestamp: Date;
}

interface ApiMessage {
  message: string;
  username?: string;
  timestamp?: string;
}

interface ChatProps {
  user: User;
}

const Chat: React.FC<ChatProps> = ({ user }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    fetchMessageHistory();
    connectSocket();

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);

  const fetchMessageHistory = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get<ApiMessage[]>(`${API_URL}/messages`);
      const loadedMessages = response.data.map((msg) => ({
        content: msg.message,
        username: msg.username || 'Anonymous',
        timestamp: new Date(msg.timestamp || Date.now()) ,
      }));
      // console.log(loadedMessages);
      setMessages(loadedMessages);
    } catch (error) {
      console.error('Error fetching message history:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const connectSocket = () => {
    if (!WEBSOCKET_URL) {
      console.error('WebSocket URL is not defined!');
      return;
    }

    socketRef.current = new WebSocket(WEBSOCKET_URL);

    socketRef.current.onopen = () => {
      console.log('WebSocket connected!');
    };

    socketRef.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.message) {
          const newMessage: ChatMessage = {
            content: data.message,
            username: data.username || 'Anonymous',
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, newMessage]);
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };

    socketRef.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    socketRef.current.onclose = () => {
      console.log('WebSocket disconnected');
    };
  };

  const handleSendMessage = (message: string) => {
    if (!socketRef.current) {
      console.warn('WebSocket is not connected');
      return;
    }

    const messagePayload = {
      action: 'sendMessage',
      message: `${user.displayName}: ${message}`,
      username: user.displayName,
    };

    socketRef.current.send(JSON.stringify(messagePayload));
  };

  return (
    <div className="h-[calc(100vh-8rem)]">
      <ChatRoom
        user={user}
        messages={messages.map(msg => ({
          content: msg.content,
          username: msg.username,
          timestamp: msg.timestamp.toISOString()
        }))}
        onSendMessage={handleSendMessage}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Chat; 