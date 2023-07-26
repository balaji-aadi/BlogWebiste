import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {AuthContext} from '../Context/authContext'

const LoginPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('')

  const navigate = useNavigate();
  const {login,currentUser} = useContext(AuthContext)

  useEffect(() => {
    if(currentUser){
      navigate('/');
    }
  },[currentUser])


  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      await login(username,password);
      navigate('/');
    }
    catch(err){
      setErr(err.response.data);
    }
  }


  return (
    <div className='w-full h-full flex flex-col items-center justify-center p-12 bg-red-200 lg:bg-white xs:p-0 xs:mt-10' >
      <img className='w-20 h-20 rounded-full' src="/logo2.png" alt="logo " />
      <h1 className=' text-black font-bold text-2xl xs:!text-xl'>Sign in to AadiBlogs</h1>

      <div className='border border-solid border-black/75 w-[20rem] px-auto bg-black text-white mt-10 rounded-lg 
      h-[20rem] flex flex-col items-start my-10 px-10 py-6 gap-4 xs:w-[18rem]'>
        <h1 className='text-sm'>username</h1>
        <input className='rounded-md w-full outline-none p-1 border border-white bg-black' type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder='username'/>
        <h1 className='text-sm'>password</h1>
        <input className=' w-full rounded-md p-1 outline-none border border-white bg-black' type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='password'/>
        {err && <p className='text-sm text-red-800 font-bold'> {err} </p>}
        <button className='bg-green-500 w-full rounded-md p-2 hover:bg-green-800 ' onClick={handleSubmit}>Sign in</button>
      </div>

      <div>
        <span className='font-medium'>New to AadiBlogs? </span>&nbsp; <Link to={'/register'}><span className='hover:underline text-blue-600 font-semibold '>Create an account</span></Link>
      </div>
    </div>
  )
}

export default LoginPage
