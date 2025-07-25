import React, { useState } from 'react'
import assets from '../assets'
import {useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const ProfilePage = () => {
  const {authUser, updateProfile}= useContext(AuthContext);
  const [selectedImg,setSelectedImg]=useState('');
  const navigate=useNavigate();
  const [name,setName]=useState(authUser.username);
  const [bio,setBio]= useState(authUser.bio);
  
  const handleSubmit=async(e)=>{
    e.preventDefault();
    if(!selectedImg){
      await updateProfile({username:name,bio});
        navigate("/");
        return;
    }
    const reader= new FileReader();
    reader.readAsDataURL(selectedImg);
    reader.onload= async()=>{
      const bas64Image=reader.result;
      await updateProfile({profilePic:bas64Image,username:name,bio});
      navigate("/");
    }
  
  
  }
  return (
    <div className='min-h-screen bg-cover bg-no-repeat flex items-center justify-center'>
      <div className='w-5/6 max-w-2xl backdrop-blur-2xl text-gray-300 border-2 border-gray-600 flex items-center justify-between max-sm:flex-col-reverse rounded-lg'>
        <form className='flex flex-col gap-5 p-10 flex-1'> 
          <h3 className='text-lg '>Profile details</h3>
          <label htmlFor='avatar' className='flex items-center gap-3 cursor-pointer'>
          <input onChange={(e)=>setSelectedImg(e.target.files[0])} type='file' id='avatar' accept='.png, .jpeg, .jpg' hidden/>
          <img src={selectedImg ? URL.createObjectURL(selectedImg):   assets.avatar_icon} className={`w-12 h-12 ${selectedImg && 'rounded-full'}`}/>
          upload profile image
          </label>
          <input type='text'onChange={(e)=>setName(e.target.value)} value={name} placeholder='Your name' className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500' requied/>
          <textarea placeholder='write profile bio' onChange={(e)=>setBio(e.target.value)} value={bio} className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500' rows={4} required/>
          <button onClick={handleSubmit} type='submit' className='bg-gradient-to-r from-purple-400 to-violet-600 text-white p-2 rounded-full text-lg cursor-pointer'> save</button>
           </form>
          <img src={authUser?.profilePic ||'/assets/keepsy'} alt='' className={`max-w-44 aspect-square rounded-full mx-10 max-sm:mt-10 ${selectedImg && 'rounded-full'}`}/>
       
      </div>
    </div>
  )
}

export default ProfilePage