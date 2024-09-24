    // Messages.js
import React from 'react';
import { format } from 'timeago.js';

const Messages = ({ messages, user }) => {
  return (
    <div className={`flex-grow overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-300 px-2 py-4 space-y-3`} style={{ maxHeight: '70vh' }}>
      {messages.map((m) => (
        <div className={`flex ${m.sender === user._id ? 'justify-end' : 'justify-start'}`} key={m._id}>
          <div className='flex items-center space-x-3'>
            {m.sender !== user._id && (
              <img
                src={m.senderAvatar} // Assuming you have the sender's avatar URL
                className='rounded-full h-8 w-8 object-cover' alt=''
              />
            )}
            <div className={`flex flex-col ${m.sender === user._id ? 'justify-end items-end' : 'items-start justify-start'}`}>
              <p className={`px-3 py-1 rounded-lg ${m.sender === user._id ? 'bg-blue-500 text-white' : 'bg-[#1D2D45] text-gray-300'}`}>
                {m.text}
              </p>
              <p className={`text-xs ${m.sender === user._id ? 'items-end' : 'items-start justify-start'}`}>
                {format(m.createdAt)}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Messages;
