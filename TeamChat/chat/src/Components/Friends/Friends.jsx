import React, { useEffect } from 'react'
import Navbar from '../Navbar/Navbar'
import Search from '../Search/Search'
import FriendsConv from '../FriendsConv'
import { useDispatch } from 'react-redux'


export default function Friends() {
    const dispatch = useDispatch()

        return (
        <div className='col-span-3  py-5 h-full border-r-[1px] border-zinc-500 px-1'  >
            <Navbar/>
            <Search/>
            <FriendsConv/>
            

        </div>
    )
}
