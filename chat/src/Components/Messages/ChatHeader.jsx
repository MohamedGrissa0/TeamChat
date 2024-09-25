// ChatHeader.js
import React, { useEffect, useState } from 'react';

const ChatHeader = ({ currentFriend , handleCall , users }) => {
  const [isactive , setactive] = useState(false)

  useEffect(() => {
    if (currentFriend && users.length > 0) {
      const foundUser = users.find((user) => user.userId === currentFriend._id);
  
      if (foundUser) {
     setactive(true)        // Add any additional logic you want to execute when the user is found
      } else {
        setactive(false)
      }
    }
  }, [currentFriend, users]);
  
  
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
        <div className='flex items-center flex-row w-full space-x-2'>
        <p className='text-lg font-semibold'>{currentFriend?.username}{" "}</p>
        {isactive ? <div className='bg-green-500 w-2 h-2 rounded-full'></div> :<div className='bg-red-500 w-2 h-2 rounded-full'></div>}

        </div>
        <p className='text-sm text-gray-400'>{isactive ? "connected" :"disconnected"}</p>
      </div>
    </div>
    <div className='flex space-x-3'>
      <button onClick={handleCall} className='text-gray-400 hover:text-white'>
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
