// ChatHeader.js
import React from 'react';

const ChatHeader = ({ currentFriend }) => {
  return (
    <div className='flex justify-between px-4 py-2 items-center'>
      <div className='flex items-center space-x-3'>
        <div className='w-10 h-10'>
          <img
            src={currentFriend?.avatar ? `http://localhost:5000/api/${currentFriend?.avatar}` : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRObNSnagThQVZ9Zk39zmDVLzkvCs0X4NALK1R7rj-W6EnbDBZjorQ03lfi6fhUT2Eg-iw&usqp=CAU'}
            className='rounded-full h-full w-full object-cover' alt=''
          />
        </div>
        <div>
          <p className='text-lg font-semibold'>{currentFriend?.username}</p>
          <p className='text-sm text-gray-400'>Web Developer</p>
        </div>
      </div>
      <div className='flex space-x-3'>
        <button className='text-gray-400 hover:text-white'>
          <span className="material-symbols-outlined">call</span>
        </button>
        <button className='text-gray-400 hover:text-white'>
          <span className="material-symbols-outlined">videocam</span>
        </button>
        <button className='text-gray-400 hover:text-white'>
          <span className="material-symbols-outlined">info</span>
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
