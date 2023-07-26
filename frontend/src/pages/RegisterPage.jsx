import React, { useEffect, useState, useContext } from 'react'
import { Link , useNavigate } from 'react-router-dom'
import axios from 'axios'
import {AuthContext} from '../Context/authContext'

const RegisterPage = () => {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('');
  const navigate = useNavigate();

  const {currentUser} = useContext(AuthContext)

  useEffect(() => {
    if(currentUser){
      navigate('/');
    }
  },[currentUser])


  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      await axios.post('http://localhost:5000/api/user/register',{email,username,password});
      navigate('/login')
    }
    catch(err){
      setErr(err.response.data);
    }
  }
  

  return (
    <div className='w-full h-full flex flex-col items-center justify-center p-2 bg-red-200 lg:bg-white' >
    <img className='w-20 h-20 rounded-full' src="/logo2.png" alt="logo " />
    <h1 className='text-black font-bold text-2xl'>Welcome to AadiBlogs</h1>

    <div className='border border-solid border-black/75 w-[20rem] px-auto bg-black text-white mt-10 rounded-lg 
    h-[25rem] flex flex-col items-start my-10 px-10 py-6 gap-4'>
      <h1 className='text-sm'>username</h1>
      <input className='rounded-md w-full outline-none p-1 border border-white bg-black' type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder='username'/>
      <h1 className='text-sm'>Email</h1>
      <input className='rounded-md w-full outline-none p-1 border border-white bg-black' type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter your email'/>
      <h1 className='text-sm'>password</h1>
      <input className=' w-full rounded-md p-1 outline-none border border-white bg-black' type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='password'/>   
      {err && <p className='text-sm text-red-800 font-semibold'>{err} </p> }
      <button onClick={handleSubmit} className='bg-green-500 w-full rounded-md p-2 hover:bg-green-800 '>Register</button>
    </div>
    <div>
      <span className='font-medium'>Already have an account? </span>&nbsp; <Link to={'/login'}><span className='hover:underline text-blue-600 font-semibold '>Login</span></Link>
    </div>
  </div>
  )
}

export default RegisterPage
