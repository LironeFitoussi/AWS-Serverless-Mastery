import React, { useState, useRef, useEffect } from 'react';
import { User } from 'firebase/auth';
import Message from '../molecules/Message';
import Input from '../atoms/Input';
import Button from '../atoms/Button';

interface ChatRoomProps {
  user: User;
  messages: Array<{
    content: string;
    username: string;
    timestamp: string; // must be full ISO string
  }>;
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
}

const ChatRoom: React.FC<ChatRoomProps> = ({
  user,
  messages,
  onSendMessage,
  isLoading = false,
}) => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  console.log(messages);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Sort messages by ISO timestamp
  const sortedMessages = [...messages].sort((a, b) => {
    const timeA = new Date(a.timestamp).getTime();
    const timeB = new Date(b.timestamp).getTime();
    return timeA - timeB;
  });

  // In the render:
  {sortedMessages.map((msg, idx) => {
    const formattedTime = new Date(msg.timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });

    return (
      <Message
        key={`${msg.username}-${msg.timestamp}-${idx}`}
        content={msg.content}
        username={msg.username}
        timestamp={formattedTime}
        isOwnMessage={msg.username === user.displayName}
      />
    );
  })}

  return (
    <div className="flex flex-col h-full bg-gray-900 rounded-lg shadow-lg">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {sortedMessages.map((msg, idx) => {
          const formattedTime = new Date(msg.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          });
          return (
            <Message
              key={`${msg.username}-${msg.timestamp}-${idx}`} // better key
              content={msg.content}
              username={msg.username}
              timestamp={formattedTime} // only display clean time
              isOwnMessage={msg.username === user.displayName}
            />
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-800">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            disabled={isLoading}
            className="flex-1"
          />
          <Button
            onClick={handleSendMessage}
            isLoading={isLoading}
            disabled={!input.trim() || isLoading}
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
