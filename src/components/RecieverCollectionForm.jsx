import React from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ItemContext } from '../../context/ItemContext';


const RecieverCollectionForm = () => {

      const [address,setAddress] = useState('');
      const [phone,setPhone]= useState('');
      const [email,setEmail]= useState('');
      const navigate = useNavigate();
      const{recieverCollection}= useContext(ItemContext);
    
      const handleSubmit= async (e)=>{
        e.preventDefault();
        await recieverCollection({address,phone,email})
        navigate('/dashboard');
      }
  return (
    <main className="flex flex-col items-center justify-center bg-gradient-to-br from-[#1a1a2e] to-[#16213e] p-10 text-white font-sans overflow-auto max-w-lg mx-auto">
  <h2 className="text-4xl mb-4 font-semibold text-[#bb86fc]">Delivery Details</h2>
  <p className="text-base mb-5 text-[#d0d0d0] text-center">
    Please provide your deliver information below.
  </p>

  <form className="bg-white/5 p-8 rounded-3xl shadow-lg shadow-purple-600/40 w-full">
    <div className="mb-6 text-left">
      <label className="block mb-2 font-medium text-[#bb86fc]">Address:</label>
      <input
        type="text"
        onChange={(e)=>setAddress(e.target.value)}
        value={address}
        placeholder="Enter your address"
        required
        className="w-full p-3 rounded-xl bg-white/10 text-white text-base focus:outline-none focus:bg-white/20 transition"
      />
    </div>

    <div className="mb-6 text-left">
      <label className="block mb-2 font-medium text-[#bb86fc]">Phone Number:</label>
      <input
        type="number"
          onChange={(e)=>setPhone(e.target.value)}
        value={phone}
        placeholder="Enter your number"
        required
        className="w-full p-3 rounded-xl bg-white/10 text-white text-base focus:outline-none focus:bg-white/20 transition"
      />
    </div>

    <div className="mb-6 text-left">
      <label className="block mb-2 font-medium text-[#bb86fc]">Email:</label>
      <input
        type="email"
          onChange={(e)=>setEmail(e.target.value)}
        value={email}
        placeholder="Enter your email address"
        required
        className="w-full p-3 rounded-xl bg-white/10 text-white text-base focus:outline-none focus:bg-white/20 transition"
      />
    </div>


    <button
      type="submit"
      onClick={handleSubmit}
      className="w-full py-4 rounded-3xl bg-gradient-to-tr from-purple-600 to-purple-400
        shadow-lg shadow-purple-500/50
        text-white font-semibold text-xl
        transition-transform duration-300 ease-in-out
        hover:scale-105 hover:shadow-purple-700/80
        focus:outline-none focus:ring-4 focus:ring-purple-300"
    >
      Submit
    </button>
  </form>
</main>
  )
}

export default RecieverCollectionForm