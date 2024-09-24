import React, { useContext, useEffect, useState } from 'react';
import more from "../../assets/more.png";
import edit from "../../assets/edit.png";
import video from "../../assets/video.png";
import { useSelector } from 'react-redux';


export default function Navbar() {
    const user = useSelector((state) => state.user);
 

    return (
        <div className='flex flex-row space-x-2 items-center justify-between'>
            <div className='flex items-center space-x-3'>
                <div className='w-8 h-8'>
                    <img
                        src={user?.avatar ? `http://localhost:5000/api/${user?.avatar}` : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRObNSnagThQVZ9Zk39zmDVLzkvCs0X4NALK1R7rj-W6EnbDBZjorQ03lfi6fhUT2Eg-iw&usqp=CAU'}
                        className='rounded-full h-8 w-8 object-cover'
                        alt=''
                    />

                </div>
                <p className='text-wrap'>{user.username.length>20 ? user.username.substring(0,18) +"..." :user.username}</p>
            </div>
            <div className='flex space-x-2'>
                <div className='w-8 h-8'>
                    <span className="material-symbols-outlined h-full w-full">
                        more_horiz
                    </span>
                </div>
                <div className='w-8 h-8'>
                    <span className="material-symbols-outlined h-full w-full">
                        videocam
                    </span>
                </div>
                <div className='w-8 h-8'>
                    <span className="material-symbols-outlined h-full w-full">
                        edit
                    </span>
                </div>
            </div>

        </div>
    );
}
