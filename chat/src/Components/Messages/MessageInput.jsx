import React from 'react';

const MessageInput = ({ newMessage, setNewMessage, handleSubmit, selectedImage, setSelectedImage }) => {

  // Function to handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file); 
      console.log("File selected:", file);
    }
  };

  return (
    <div className='flex items-center mx-2'>
      <button
        type="button" // Specify button type for better accessibility
        className='space-x-2 flex items-center justify-center p-2 bg-blue-500 rounded-lg hover:bg-blue-600'
        onClick={() => document.getElementById('fileInput').click()} 
      >
        <span className="material-symbols-outlined text-white">image</span>
      </button>

      <input
        type="file"
        id="fileInput"
        style={{ display: 'none' }}
        accept="image/*" 
        onChange={handleFileChange}
      />

      {selectedImage && (
        <p className="text-sm text-white ml-2">{selectedImage.name.substr(0,20)}</p>
      )}

      <input
        type='text'
        className='flex-grow p-2 bg-gray-700 ml-2 text-white rounded-lg focus:outline-none'
        placeholder='Type a message...'
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />

      <button 
        type="button" // Specify button type for better accessibility
        onClick={(e) => {
          e.preventDefault(); // Prevent default if used inside a form
          handleSubmit();
          setSelectedImage(null); // Clear selected image on submit
        }} 
        className='ml-2 flex items-center justify-center p-2 bg-blue-500 rounded-lg hover:bg-blue-600'
      >
        <span className="material-symbols-outlined text-white">send</span>
      </button>
    </div>
  );
};

export default MessageInput;
