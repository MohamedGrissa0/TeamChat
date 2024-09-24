import React, { useEffect, useState } from 'react';
import search2 from "../../assets/search.png";
import { useDispatch } from 'react-redux';

export default function Search() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Dispatching the action when the search term changes
    dispatch({
      type: 'SET_SEARCH',
      payload: {
        search: search,
      },
    });
  }, [search, dispatch]); // Adding 'dispatch' to dependency array for best practices

  return (
    <div className='flex items-center mt-4 justify-between px-4 w-full'>
      {/* Search Input Container */}
      <div className='bg-[#1D2D45] flex items-center rounded-lg px-3 w-full '>
        <div className='w-6 h-6 mr-2'>
          <img src={search2} className='w-full h-full object-cover rounded-full' alt='Search Icon' />
        </div>
        <input
          type='text'
          value={search}
          placeholder='Search'
          className='outline-none bg-transparent text-white placeholder-gray-400 px-2 w-full'
          onChange={e => setSearch(e.target.value)} // Updating state when input changes
        />
      </div>
    </div>
  );
}
