import React from 'react'
import Friends from '../Components/Friends/Friends'
import Conv from '../Components/Conv/Conv'
import Details from '../Components/Details/Details'

export default function Chat() {

  
  return (
    <div className="container mx-auto w-full h-screen rounded-md flex justify-center items-center relative ">
    <div className="absolute inset-0 rounded-md bg-[#354A5F] my-[50.5px]"></div> {/* Blurred background */}
    <div className="relative z-10 rounded-md w-full    py-10 h-full text-white text-4xl "> 
        <div className='grid grid-cols-12 px-3 w-full h-full'>

        <Friends/>
        <Conv/>
        <Details/>   
    </div>    </div>        </div>


  )
}
