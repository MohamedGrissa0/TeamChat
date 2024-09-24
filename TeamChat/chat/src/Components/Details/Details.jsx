import React from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Details() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    // Optionally, clear any user-related data from local storage
    localStorage.removeItem("user");
  };

  return (
    <div className='col-span-3 flex flex-col items-center h-full border-l-[1px]   border-zinc-500  w-full'>
      <div className='w-full flex flex-col py-4 px-4 items-center'>
        <div className='flex flex-col w-full items-center justify-center'>
          <div className='w-14 h-14 items-center justify-center  '>

            <img
              src={user?.avatar ? `http://localhost:5000/api/${user?.avatar}` : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRObNSnagThQVZ9Zk39zmDVLzkvCs0X4NALK1R7rj-W6EnbDBZjorQ03lfi6fhUT2Eg-iw&usqp=CAU'}
              className='rounded-full h-full w-full object-cover' alt='' />
          </div>
          <div className='flex items-center -space-y-2  flex-col'>
            <p className='text-lg'>{user.username}</p>
            <p className='text-lg'> Web Developer</p>
          </div>
        </div>
      </div>
      <div className='bg-zinc-500 h-[1px] w-full'></div>

      <div className='flex flex-col py-2 px-4 items-center w-full'>
        <div className='flex items-center  w-full justify-between'>
          <p>Shared photos</p>
          <div className=' flex items-center justify-center '>
            <span className="material-symbols-outlined  bg-[#1D2D45] p-1 rounded-lg">
              arrow_downward
            </span>
          </div>
        </div>
        <div className='flex items-center  w-full justify-between'>
          <div className='flex items-center space-x-2'>
            <div className='w-8 h-8  items-center justify-center  '>

              <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRObNSnagThQVZ9Zk39zmDVLzkvCs0X4NALK1R7rj-W6EnbDBZjorQ03lfi6fhUT2Eg-iw&usqp=CAU' className='rounded-full h-full w-full object-cover' alt='' />
            </div>
            <p>Photo.png
            </p>
          </div>
          <div className=' flex items-center justify-center '>
            <span className="material-symbols-outlined  bg-[#1D2D45] p-1 rounded-lg">
              download
            </span>
          </div>
        </div>


      </div>
      <div className='flex flex-end justify-end mb-4 h-full  items-center flex-col space-y-2'>
       <Link to="/Setting"> <button className='px-8 py-1 w-36 bg-[#9e4768] rounded-lg'>Setting</button></Link>
        {/* <button className='px-8 py-1 w-36 bg-[#9e4768] rounded-lg'>Block User</button> */}
        <button className='px-8 py-1 w-36 bg-[#1454A9] rounded-lg' onClick={() => handleLogout()}>Logout</button>

      </div>
    </div>
  )
}
