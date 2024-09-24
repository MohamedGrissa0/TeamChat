// MessageInput.js
import React from 'react';

const MessageInput = ({ newMessage, setNewMessage, handleSubmit }) => {
  return (
    <div className='flex items-center mx-2 mt-2'>
      <input
        type='text'
        className='flex-grow p-2 bg-gray-700 text-white rounded-lg focus:outline-none'
        placeholder='Type a message...'
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button onClick={handleSubmit} className='ml-2 flex items-center justify-center p-2 bg-blue-500 rounded-lg hover:bg-blue-600'>
        <span className="material-symbols-outlined text-white">send</span>
      </button>
    </div>
  );
};

export default MessageInput;
