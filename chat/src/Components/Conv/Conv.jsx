import axios from 'axios';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { io } from "socket.io-client";
import MessageInput from '../Messages/MessageInput';
import Messages from '../Messages/Messages';
import ChatHeader from '../Messages/ChatHeader';

export default function Conv({ own = true }) {
  const [messages, setMessages] = useState([]);
  const [isCalling, setIsCalling] = useState(false);
  const [incomingCall, setIncomingCall] = useState(null); // To handle incoming calls
  const user = useSelector((state) => state.user);
  const [users, setUsers] = useState([]); // Store users here

  const currentChat = useSelector((state) => state.currentChat?.currentchat);
  const currentFriend = useSelector((state) => state.currentChat?.currentfriend);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const socket = useRef();
  const scrollRef = useRef();

  useLayoutEffect(() => {
    if (scrollRef?.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, newMessage]);

  // Connect to socket server and listen for incoming messages and calls
  useEffect(() => {
    socket.current = io("ws://localhost:9000");

    socket.current.on("getMessage", (data) => {
      // Update messages state with incoming message
      setMessages((prev) => [...prev, {
          sender: data.senderId,
          text: data.text,
          image: data.image,
          createdAt: Date.now(),
      }]);
    });

    socket.current.on("callReceived", (data) => {
      setIncomingCall(data); // Handle incoming call
    });

    // Listen for users array from server
    socket.current.on("getUsers", (users) => {
      console.log("Connected users:", users); // Log the users
      setUsers(users); // Store the users in the state if you need to display them
    });

    return () => {
      socket.current.disconnect(); // Cleanup socket connection
    };
  }, []);

  useEffect(() => {
    const getMessages = async () => {
      if (!currentChat?._id) return;
      try {
        const res = await axios.get(`http://localhost:5000/api/msg/${currentChat._id}`);
        setMessages(res.data);
      } catch (err) {
        toast.error("Failed to fetch messages: " + err.message);
      }
      console.log(messages)
    };

    if (currentChat) {
      getMessages();
    } else {
      setMessages([]); // Reset messages if no current chat
    }
  }, [currentChat ,messages]);

  const handleSubmit = async () => {
    const messageData = new FormData();
    messageData.append('sender', user._id);
    messageData.append('conversationId', currentChat._id);
    messageData.append('text', newMessage);
  
    if (selectedImage) {
      messageData.append('image', selectedImage); // Append image file
    }
  
    const receiverId = currentChat?.membres?.find(member => member !== user._id);
  
    // Emit message to socket
    socket.current.emit("SendMessage", {
      senderId: user._id,
      receiverId: receiverId,
      text: newMessage,
      image: selectedImage ? selectedImage.name : null,
    });

    try {
      const res = await axios.post(`http://localhost:5000/api/msg/`, messageData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessages((prevMessages) => [...prevMessages, res.data]);
      setNewMessage("");
      setSelectedImage(null); // Reset selected image after sending
    } catch (err) {
      console.error("Error sending message:", err);
      toast.error("Failed to send message: " + err.message);
    }
  };
  
  const handleCall = () => {
    const receiverId = currentChat?.membres?.find(member => member !== user._id);
    socket.current.emit("callUser", {
      senderId: user._id,
      receiverId: receiverId,
    });
    setIsCalling(true);
  };

  const handleAcceptCall = () => {
    toast.success(`Call accepted from ${incomingCall.senderId}`);
    setIncomingCall(null); // Clear incoming call notification
  };

  const handleDeclineCall = () => {
    socket.current.emit("callDeclined", {
      senderId: incomingCall.senderId,
      receiverId: user._id,
    });
    setIncomingCall(null); // Clear incoming call notification
    toast.info("Call declined");
  };

  useEffect(() => {
    if (user?._id) {
      socket.current.emit('addUser', user._id);
    }
  }, [user]);

  return (
    <div className='col-span-6 h-full flex flex-col text-white'>
      {currentChat ? (
        <div className='flex flex-col h-full'>
          <ChatHeader handleCall={handleCall} currentFriend={currentFriend} users={users} />
          <div className='w-full h-[1px] bg-gray-700'></div>
          <Messages 
            scrollRef={scrollRef} 
            messages={messages} 
            currentFriend={currentFriend} 
            user={user} 
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage} // Pass this prop
          />
          <MessageInput 
            handleSubmit={handleSubmit} 
            newMessage={newMessage} 
            setNewMessage={setNewMessage} 
            selectedImage={selectedImage} 
            setSelectedImage={setSelectedImage} 
          />
        </div>
      ) : (
        <div className='flex-grow flex items-center justify-center text-2xl'>
          Select a chat to start messaging...
        </div>
      )}

      {incomingCall && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
          <div className="bg-gray-800 p-5 rounded-lg text-white">
            <p className="mb-4 text-lg">Incoming call from {incomingCall.senderId}</p>
            <div className="flex space-x-4">
              <button onClick={handleAcceptCall} className="bg-green-500 px-4 py-2 rounded-lg hover:bg-green-600">Accept</button>
              <button onClick={handleDeclineCall} className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600">Decline</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
