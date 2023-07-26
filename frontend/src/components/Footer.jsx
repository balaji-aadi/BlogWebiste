import React from 'react'
import {Link} from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='w-full border-t-2 border-solid border-black font-medium text-lg p-11 xs:text-sm dark:text-white dark:border-white'>
      <div className='flex items-center justify-between px-5 lg:flex-col lg:gap-4 xs:!gap-2'>
        <span>{new Date().getFullYear()} &copy; All Rights Reserved  </span>
        <div className='flex flex-row items-center sm:text-xs '>
        Made with &nbsp;<span className='text-4xl text-red-600  sm:text-2xl '>&#9825;</span>&nbsp; by &nbsp; <Link>balajiaadi2000@gmail.com</Link>
        </div>
        <div className='hover:underline'>
          <Link>bolo Namasta</Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
