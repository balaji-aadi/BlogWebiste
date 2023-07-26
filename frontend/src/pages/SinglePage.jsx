import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import moment from 'moment'
import {AiFillDelete} from 'react-icons/ai'
import {MdEditSquare} from 'react-icons/md'
import { Link } from 'react-router-dom'
import {AuthContext} from '../Context/authContext'

const SinglePage = () => {

  const [post, setPost] = useState([]);
  
  const path = useLocation().pathname;
  
  const postId = path.split('/')[2]
  const navigate = useNavigate()

  const {currentUser} = useContext(AuthContext);
  
  
  useEffect(() => {
    const fetchData = async() => {
      try{
        const res = await axios.get(`http://localhost:5000/api/posts/${postId}`)
        setPost(res.data);
      }
      catch(err){
        console.log(err)
      }
    }

    fetchData();
  },[postId])

  
  const handleDelete = async () => {
    try{
      await axios.delete(`http://localhost:5000/api/posts/${postId}`, {withCredentials:true})
      navigate('/')
    }
    catch(err){
      console.log(err);
    }
  }


  return (
    <div className='w-full h-full mt-20 mb-20'>
      <div className='w-full flex items-center flex-col gap-10 sm:gap-6 '>
        <h1 className='w-full text-2xl text-black/75 font-bold px-40 lg:px-24 md:!px-4 dark:text-white'>{moment(post.date).fromNow()}</h1>
        <h1 className='w-full text-6xl text-black/75 font-bold px-40 lg:px-24 md:!px-4 sm:text-4xl dark:text-white'>{post.title}</h1>
        <h2 className='w-full text-xl text-black/75 font-bold px-40 lg:px-24 md:!px-4 dark:text-white'><span className='text-blue-800'>&#9825; &nbsp;</span>{post.cat}</h2>
        <img className='w-[90%] h-[40rem] rounded-2xl md:!w-[96%]  xl:w-[80%] xs:w-full xs:h-auto overflow-hidden object-cover' src={`../upload/${post.img}`} alt="" />
        {currentUser?.username === post?.username && <div className='flex items-center gap-5'>
          
        <Link to={`/update/${postId}`}><div className='cursor-pointer'><MdEditSquare size={40} className= {'dark:fill-white'} /> </div></Link>
        <div className='cursor-pointer' onClick={handleDelete}><AiFillDelete size={40} className={'dark:fill-white'} /> </div>

        </div>}
        <span className='w-full text-black font-semibold text-lg px-36 lg:px-24 md:!px-4 dark:text-white' dangerouslySetInnerHTML={{__html : post.desc}}></span>
      </div>
      
    </div>
  )
}

export default SinglePage
