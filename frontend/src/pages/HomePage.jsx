import React, {useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios'

const HomePage = () => {

  const [posts, setPosts] = useState([])
  const cat = useLocation().search;


  useEffect(() => {
    const fetchData = async() => {
      try{
        const res = await axios.get(`http://localhost:5000/api/posts${cat}`);
        setPosts(res.data);
      }
      catch(err){
        console.log(err);
      }
    }
    fetchData();
  },[cat])

  

  return (
    <div className='w-full h-full mb-24 items-center justify-center dark:bg-black  dark:text-white'>
      <div className='w-full mt-8 flex p-10 items-center text-black/75 rounded-md md:flex-col sm:p-0 dark:text-white'>
        <h1 className='w-full text-8xl font-bold  lg:!text-7xl lg:mx-14 sm:hidden'>Write Your Own Blog with Passion</h1>
      </div>
      {
        posts.map(post => (
          <div className='mt-20 flex w-full p-8 md:flex-col sm:mt-6 xs:p-1'key={post.id} >
            <div className='w-full'>
            <Link to={`/posts/${post.id} `}><img className='w-full h-[30rem] rounded-2xl overflow-hidden object-cover' src={`../upload/${post.img}`} alt="" /></Link>
            </div>

            <div className='flex flex-col py-7 gap-7 w-full p-16 sm:p-2 lg:py-0 lg:p-12 xs:gap-3'>
            <Link to={`/posts/${post.id}`}><img className='w-[5rem] h-[5rem] rounded-full lg:hidden overflow-hidden object-cover' src={`../upload/${post.img}`} alt="postlogo" /></Link>
            <Link to={`/posts/${post.id} `}><h1 className='text-4xl font-bold hover:underline xs:text-2xl'>{post.title}</h1></Link>
            {/* <h1 className='text-2xl font-bold hover:underline capitalize text-violet-900 dark:text-red-500'></h1> */}
            </div>
          </div>
        ))
      }

    </div>
  )
}

export default HomePage
