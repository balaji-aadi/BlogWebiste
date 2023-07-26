import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaBars, FaTimes } from 'react-icons/fa'
import { AuthContext } from '../Context/authContext'
import { MdSunny } from 'react-icons/md'
import { BsFillMoonStarsFill } from 'react-icons/bs'
import useThemeSwitcher from '../Hooks/useThemeSwitcher'

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const location = useLocation();
  const path = location.pathname;
  const query = location.search;

  const { currentUser, logout } = useContext(AuthContext)

  const [mode, setMode] = useThemeSwitcher();


  useEffect(() => {
    setNav(false);
  }, [path])

  useEffect(() => {
    setNav(false);
  }, [query])

  return (
    <div className='w-full h-auto px-8'>
      <div className='flex justify-between lg:!flex-row-reverse '>


        {/* dark mode enable */}
        <button onClick={() => setMode(mode === "light" ? "dark" : "light")} className='2xl:hidden lg:!inline-block mt-5 w-12 h-12 bg-black/75 rounded-full pl-2 '>
          {
            mode === 'dark' ?
              <MdSunny className={'fill-white'} size={30} />
              :
              <BsFillMoonStarsFill className={'fill-white'} size={30} />
          }
        </button>

        <Link to={'/'}><img src="logo2.png" alt="logo" className='w-20 h-20 rounded-full mb-2 mt-3 dark:border border-white' /></Link>

        <div onClick={() => setNav(!nav)} className='cursor-pointer z-10 text-black 2xl:hidden lg:!inline-block pt-8'>
          {nav ? <FaTimes size={30} className={'dark:fill-white'} /> : <FaBars size={30} className={'dark:fill-white'} />}
        </div>

        <ul className='flex gap-4 font-semibold text-black/75 py-10 lg:hidden dark:text-white'>
          <Link to={'/?cat=art'}><li>Art</li></Link>
          <Link to={'/?cat=design'}><li>Design</li></Link>
          <Link to={'/?cat=technology'}><li>Technology</li></Link>
          <Link to={'/?cat=travel'}><li>Travel</li></Link>
          <Link to={'/?cat=food'}><li>Food</li></Link>
        </ul>

        <ul className='flex gap-3 items-center lg:hidden'>

          {/* dark mode enable */}

          <button onClick={() => setMode(mode === "light" ? "dark" : "light")} className='w-12 h-12 bg-black/75 rounded-full pl-2 '>
            {
              mode === 'dark' ?
                <MdSunny className={'fill-white'} size={30} />
                :
                <BsFillMoonStarsFill className={'fill-white'} size={30} />
            }
          </button>


          <Link to={"mailto:balajiaadi2000@gmail.com"} target={'_blank'}><button className='w-20 h-10 bg-black text-white rounded-md dark:bg-white dark:text-black'>Hire Me</button></Link>
          <Link to={'/'}><li className='dark:text-white'>{currentUser?.username} </li></Link>
          {currentUser ? (<span onClick={logout} className='cursor-pointer dark:text-white'> Logout</span>) : (<Link className='cursor-pointer dark:text-white' to={'/login'}>Login/Register</Link>)}
          <Link to={'/write'}><li className='bg-blue-400 rounded-full w-16 p-5 px-3'>Write</li></Link>
        </ul>

        {
          nav && (
            <div className='min-w-[70vw] h-[70%] flex flex-col justify-between items-center z-30 fixed top-1/2 left-1/2 
       -translate-x-1/2 -translate-y-1/2 bg-black/90 rounded-lg backdrop-blur-md py-24 gap-4 flex-wrap 2xl:hidden lg:!inline-block'>
              <div className='flex gap-20 items-center justify-center xs:flex-col'>
                <ul className='flex gap-4 font-semibold text-white flex-col text-center '>
                  <Link to={'/?cat=art'}><li>Art</li></Link>
                  <Link to={'/?cat=design'}><li>Design</li></Link>
                  <Link to={'/?cat=technology'}><li>Technology</li></Link>
                  <Link to={'/?cat=dsa'}><li>DSA</li></Link>
                  <Link to={'/?cat=webdevelopment'}><li>Web Development</li></Link>
                </ul>
                <ul className='flex gap-3 items-center text-white flex-col-reverse xs:flex-row'>
                  <Link to={"mailto:balajiaadi2000@gmail.com"} target={'_blank'}><button className='w-20 h-10 text-white bg-blue-800 rounded-md'>Hire Me</button></Link>
                  <Link to={'/'}><li>aadi</li></Link>
                  {currentUser ? (<span onClick={logout} className='cursor-pointer'> Logout</span>) : (<Link className='cursor-pointer' to={'/login'}>Login/Register</Link>)}
                  <Link to={'/write'}><li className='bg-blue-400 rounded-full w-16 p-5 px-3'>Write</li></Link>
                </ul>
              </div>
            </div>
          )
        }


      </div>
    </div>
  )
}

export default Navbar
