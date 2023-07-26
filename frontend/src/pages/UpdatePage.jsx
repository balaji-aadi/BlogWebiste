import { useState, useEffect } from 'react';
import React from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import CategoryPage from './CategoryPage';
import axios from 'axios'
import { useNavigate, useParams} from 'react-router-dom'


const UpdatePage = () => {

  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [cat, setCat] = useState('');
  const [file, setFile] = useState(null)
  const navigate = useNavigate();
  const {id} = useParams();

  const upload = async ()=> {
    try{
      const formData = new FormData();
      formData.append('file',file)
      const res = await axios.post('http://localhost:5000/api/upload',formData)
      return res.data;
    }
    catch(err){
      console.log(err);
    }
  }
  

  useEffect(() => {
    fetch(`http://localhost:5000/api/posts/${id}`).then(response => {
      response.json().then(postInfo => {
        setTitle(postInfo.title);
        setValue(postInfo.desc);
        setCat(postInfo.cat);
        setFile(postInfo.img);
      })
    })
  },[id]);

  const handleSubmitPost = async (e) => {
    e.preventDefault();
    const imgUrl = await upload();

    try{
      await axios.put(`http://localhost:5000/api/posts/${id}`, {
        title,
        desc : value,
        cat,
        img : imgUrl
      },{withCredentials:true});
      navigate('/');
    }
    catch(err){
      console.log(err.response.data);
    }
  }

  return (
    <div className='w-full h-full mt-8 mb-20 flex lg:flex-col lg:items-center lg:mt-10 dark:text-white'>
      <div className='w-full flex flex-col mx-10 lg:mx-0 lg:!w-[70%] '>
        <input type="text" placeholder='Write Your title' className='w-full outline-none border border-solid border-black/75 mb-8 rounded-md 
        p-2 dark:text-black' value={title || ""} onChange={(e) => setTitle(e.target.value)}/>
        <ReactQuill theme="snow" value={value || ""} onChange={setValue} className='w-full h-[20rem] text-2xl rounded-2xl' />;
      </div>
      <div className='flex flex-col w-1/2 mx-10 lg:w-[70%] lg:mt-10'>

        <div className='w-full'>
          <div className='w-full border border-solid border-black p-5 mb-6 sm:mt-24 sm:flex sm:flex-col gap-5 rounded-2xl dark:border-white'>
            <h1 className='text-4xl font-bold mx-2 mb-5'>Update</h1>
            <input type="file" className='cursor-pointer sm:w-[90%] ' onChange={(e) => setFile(e.target.files[0])} />
            <label htmlFor="file" className='lg:hidden'>Upload Image</label>
            <button className='bg-black p-2 text-white rounded-md mx-20 lg:mx-0 dark:bg-white dark:text-black' onClick={handleSubmitPost}>Update</button>
          </div>
          <div className='border border-solid border-black rounded-2xl dark:border-white'>
            <h2 className='text-4xl font-bold mx-2 mb-5 '>Category</h2>
            <CategoryPage setCat = {setCat} cat = {cat} />
          </div>
        </div>

      </div>
    </div>
  )
}

export default UpdatePage
