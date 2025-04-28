import React from 'react';
import { twMerge } from 'tailwind-merge';

interface MessageProps {
  content: string;
  username: string;
  timestamp: string;
  isOwnMessage?: boolean;
}

const Message: React.FC<MessageProps> = ({
  content,
  username,
  timestamp,
  isOwnMessage = false,
}) => {
  return (
    <div
      className={twMerge(
        'flex flex-col max-w-[80%] mb-4',
        isOwnMessage ? 'ml-auto' : 'mr-auto'
      )}
    >
      <div
        className={twMerge(
          'rounded-lg p-3',
          isOwnMessage
            ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white'
            : 'bg-gray-800 text-gray-200'
        )}
      >
        <div className="flex items-center gap-2 mb-1">
          <span className="font-medium text-sm">{username}</span>
          <span className="text-xs opacity-70">{timestamp}</span>
        </div>
        <p className="text-sm">{content}</p>
      </div>
    </div>
  );
};

export default Message; 