import React, { useState } from 'react'
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import assets from '../assets';

const LoginPage = () => {
  const [currentSate,setCurrentState]=useState('Sign Up');
  const [username,setUsername]=useState('');
  const [fullName,setFullName]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [bio,setBio]=useState('');
  const [isDataSubmitted,setisDataSubmitted]=useState(false);

  const {login}=useContext(AuthContext);

const onSubmitHandler=(event)=>{
 event.preventDefault();
 
 if(currentSate==='Sign Up' && !isDataSubmitted){
  setisDataSubmitted(true)
  return;
 }
 login(currentSate=="Sign Up" ? 'signup':'login',{username,fullName,email,password,bio})
}

  return (
    <div className='min-h-screen bg-cover bg-center  flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl'>
      <img src="/assets/keepsy.webp"  alt='' className='w-[min(30vw,250px)]'/>
    <form className='border-2 bg-white/8 text-white border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg' onSubmit={onSubmitHandler}>
    <h2 className='font-medium text-2xl flex justify-between items-center'>{currentSate} 
      {isDataSubmitted &&
      <img src={assets.arrow_icon} onClick={()=>setisDataSubmitted(false)} alt='' className='w-5 cursor-pointer'/>}</h2>
    {currentSate =='Sign Up' && !isDataSubmitted &&(
      <>
                <input type='text' onChange={(e)=>setUsername(e.target.value)} value={username} className='p-2 border border-gray-500 rounded-md focus:outline-none' placeholder='Username' required/>

          <input type='text' onChange={(e)=>setFullName(e.target.value)} value={fullName} className='p-2 border border-gray-500 rounded-md focus:outline-none' placeholder='Full Name' required/>
   </>
    )}
    {!isDataSubmitted && (
      <>
       <input type='email' onChange={(e)=>setEmail(e.target.value)} value={email} placeholder='Email Address' className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' required/>
      <input type='password' onChange={(e)=>setPassword(e.target.value)} placeholder='Password ' value={password} className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'required/>

    </>
    )}
       {currentSate =='Sign Up' && isDataSubmitted &&(
          <textarea onChange={(e)=>setBio(e.target.value)} value={bio} className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' placeholder='provide a short bio...' required></textarea>
)}

      <button type='submit'  className='py-3 bg-gradient-to-r from-purple-400 to-violet-600 text-white rounded-md cursor-pointer'>{currentSate==='Sign Up' ? 'Create Account': 'Login Now'}</button>
<div className='flex items-center gap-2 text-sm text-gray-500'>
  <input type='checkbox' required/>
  <p> Agree to the terms of use & privacy policy.</p>
</div>
<div className='flex flex-col gap-2'>
  {currentSate==='Sign Up'? (
    <>
<p className='text-sm text-gray-600' onClick={()=>{setCurrentState('Sign In'); setisDataSubmitted(false)}}>already have an account? Login here</p> 
</>
  ) :(<p onClick={()=>{setCurrentState('Sign Up'); setisDataSubmitted(false)}} className='text-sm text-gray-600'> create an account</p>)}
</div>
    </form>
    </div>
  )
}

export default LoginPage