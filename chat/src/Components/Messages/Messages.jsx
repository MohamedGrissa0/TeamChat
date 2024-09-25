import React from 'react';
import { format } from 'timeago.js';

const Messages = ({ currentFriend, scrollRef, messages, user }) => {
  return (
    <div className={` ${messages?.length >= 4 ? "flex-grow overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-300" : "flex-grow"} mb-4 px-2 py-4 space-y-3`} style={{ maxHeight: '70vh' }}>
      {messages.map((m, index) => (
        <div className={`flex ${m.sender === user._id ? 'justify-end' : 'justify-start'}`} key={m._id || index}>
          <div className='flex items-center space-x-3'>
            {m.sender !== user._id && (
              <img
                src={currentFriend?.avatar ? `http://localhost:5000/api/${currentFriend?.avatar}` : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRObNSnagThQVZ9Zk39zmDVLzkvCs0X4NALK1R7rj-W6EnbDBZjorQ03lfi6fhUT2Eg-iw&usqp=CAU'}
                className='rounded-full h-8 w-8 object-cover' alt=''
              />
            )}
            <div className={`flex flex-col ${m.sender === user._id ? 'justify-end items-end' : 'items-start justify-start'}`}>
             {m.text && <p className={`px-3 py-1 rounded-lg ${m.sender === user._id ? 'bg-blue-500 text-white' : 'bg-[#374151] text-gray-300'}`}>
                {m.text}
              </p>}
              {m.image && (
                <img 
                  src={`http://localhost:5000/api/uploads/${m.image}`} 
                  alt="message" 
                  className="mt-2 max-h-[300px] w-auto object-contain rounded-lg shadow-md" 
                  style={{ maxWidth: '100%', height: 'auto' }} // Ensure responsiveness
                />
              )}
              <p className={`text-xs mt-1 ${m.sender === user._id ? 'items-end' : 'items-start justify-start'}`}>
                {format(m.createdAt)}
              </p>
            </div>
          </div>
        </div>
      ))}
      <div ref={scrollRef}></div>
    </div>
  );
};

export default Messages;
