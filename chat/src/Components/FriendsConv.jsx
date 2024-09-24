import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';
import { io } from 'socket.io-client';

export default function FriendsConv() {
  const user = useSelector((state) => state.user);
  const search = useSelector((state) => state.search.search);
  const [friends, setFriends] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [selectedFriendId, setSelectedFriendId] = useState("");

  const socket = useRef();
  const dispatch = useDispatch();

  // Initialize socket connection and cleanup
  useEffect(() => {
    socket.current = io("ws://localhost:9000");

    return () => {
      socket.current.disconnect();
    };
  }, []);

  // Fetch friends data
  useEffect(() => {
    const getFriends = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/user/${user._id}`);
        setFriends(response.data.friends || []);
      } catch (err) {
        toast.error("Failed to fetch friends: " + err.message);
      }
    };

    if (user?._id) {
      getFriends();
    }
  }, [user]);

  // Fetch last messages for each friend
  const fetchLastMessages = async (friendIds) => {
    try {
      const promises = friendIds.map(friendId =>
        axios.get(`http://localhost:5000/api/msg/last/${user._id}/${friendId}`)
      );
      const results = await Promise.all(promises);
      return results.map((res, index) => ({
        ...friends[index],
        lastMessage: res.data // Attach last message to friend object
      }));
    } catch (err) {
      toast.error("Failed to fetch last messages: " + err.message);
      return [];
    }
  };

  // Get last messages for friends
  useEffect(() => {
    if (friends.length) {
      const friendIds = friends.map(friend => friend._id);
      fetchLastMessages(friendIds).then(setFriends); // Update friends state with messages
    }
  }, [friends]);

  // Filter friends based on search input
  const filteredFriends = useMemo(() => {
    if (!search) return friends;
    return friends.filter(f =>
      f?.username?.toLowerCase().startsWith(search.toLowerCase())
    );
  }, [search, friends]);

  // Handle conversation selection and chat setup
  const handleConv = async (friend) => {
    setSelectedFriendId(friend._id);

    try {
      const res = await axios.post(`http://localhost:5000/api/conv/`, {
        senderId: user._id,
        receiverId: friend._id,
      });
      setCurrentChat(res.data);
      dispatch({
        type: 'SET_CURRENT_CHAT',
        payload: {
          currentchat: res.data,
          currentfriend: friend
        }
      });
    } catch (err) {
      toast.error("Failed to fetch conversations: " + err.message);
    }
  };

  return (
    <div className='pt-2 h-[7vh]'>
      <div className={`flex-grow ${filteredFriends.length > 8 ? "overflow-y-scroll scrollbar-thin h-[72vh] scrollbar-thumb-[#374151] scrollbar-track-gray-300" : ""}`}>
        {filteredFriends.length > 0 ? (
          filteredFriends.map((f) => (
            <div key={f._id} onClick={() => handleConv(f)} className='cursor-pointer'>
              <div className='flex py-3 space-x-3'>
                <div className='flex justify-center items-center'>
                  <div className='w-8 h-8'>
                    <img
                      src={f?.avatar ? `http://localhost:5000/api/${f.avatar}` : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRObNSnagThQVZ9Zk39zmDVLzkvCs0X4NALK1R7rj-W6EnbDBZjorQ03lfi6fhUT2Eg-iw&usqp=CAU'}
                      className='rounded-full h-full w-full object-cover'
                      alt={f.username || "Unknown User"}
                    />
                  </div>
                </div>
                <div className='flex flex-col'>
                  <p>{f.username || "Unknown User"}</p>
                </div>
              </div>
              <div className='h-[1px] bg-slate-500 w-full'></div>
            </div>
          ))
        ) : (
          <div className='text-gray-400 text-center mt-5'>No friends found.</div>
        )}
      </div>
    </div>
  );
}
