import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SendCollectionForm from "../components/SendCollectionForm";

const Send = () => {
  const [item, setItem] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [collectionMethod, setCollectionMethod] = React.useState("");
  const [collectFromHome,setCollectFromHome]=useState(false);
 
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!collectionMethod) {
      alert("Please select a collection method.");
      return;
    }
    localStorage.setItem(
      "sendData",
      JSON.stringify({ item, location, collectionMethod })
    );
    navigate("/codeGenerator");
  };

  const goBack=()=>{
    navigate('/dashboard');
  }

  return (
<div className="border w-full min-h-screen sm:px-[15%] sm:py-[5%] overflow-y-auto">
      <div className="backdrop-blur-xl border-2 border-gray-600 rounded-2xl overflow-hidden h-full grid grid-cols-1 relative">
        <button
        onClick={goBack}
        className="absolute top-4 left-4 px-3 py-1 rounded-md bg-[#bb86fc] text-white font-semibold
                   shadow-md hover:bg-[#9a63d6] transition-colors duration-200 focus:outline-none"
      >
        &larr; Back
      </button>
      {collectFromHome==false ?(
        <main className="flex flex-col items-center justify-center bg-gradient-to-br from-[#1a1a2e] to-[#16213e] p-10 text-white font-sans overflow-auto max-w-lg mx-auto">
          <h2 className="text-4xl mb-4 font-semibold text-[#bb86fc]">Send</h2>
          <p className="text-base mb-5 text-[#d0d0d0] text-center">
            Welcome to your Send page! Manage your account and settings here.
          </p>
        <div className="mb-6 text-center">
  <p className="text-lg font-semibold text-[#bb86fc] mb-3">You can send from:</p>
  <div className="flex flex-wrap gap-4 justify-center">
    <button
      type="button"
      className="px-5 py-2 cursor-pointer rounded-full bg-purple-700 text-white font-medium shadow-md
                 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
    >
      azn
    </button>
    <button
      type="button"
      className="px-5 py-2 rounded-full cursor-pointer bg-purple-700 text-white font-medium shadow-md
                 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
    >
      flp
    </button>
    <button
      type="button"
      className="px-5 py-2 rounded-full cursor-pointer bg-purple-700 text-white font-medium shadow-md
                 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
    >
      myn
    </button>
  </div>
</div>

          <form
            onSubmit={handleSubmit}
            className="bg-white/5 p-8 rounded-3xl shadow-lg shadow-purple-600/40 w-full"
          >
            <div className="mb-6 text-left">
              <label
                htmlFor="item"
                className="block mb-2 font-medium text-[#bb86fc]"
              >
                Item:
              </label>
              <input
                type="text"
                id="item"
                name="item"
                value={item}
                onChange={(e) => setItem(e.target.value)}
                required
                className="w-full p-3 rounded-xl bg-white/10 text-white text-base focus:outline-none focus:bg-white/20 transition"
              />
            </div>

            <div className="mb-6 text-left">
              <label
                htmlFor="location"
                className="block mb-2 font-medium text-[#bb86fc]"
              >
                Location (optional):
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-3 rounded-xl bg-white/10 text-white text-base focus:outline-none focus:bg-white/20 transition"
              />
            </div>

            <div className="mb-8 text-left">
              <p className="text-lg font-semibold text-[#bb86fc] mb-3">
                Collection Method
              </p>

              <div className="flex items-center mb-3">
                <input
                  type="radio"
                  id="home"
                  name="collectionMethod"
                  value="home"
                  onClick={()=>setCollectFromHome(true)}
                  checked={collectionMethod === "home"}
                  onChange={() => setCollectionMethod("home")}
                  className="mr-3 accent-[#bb86fc]"
                />
                <label htmlFor="home" className="text-white text-lg">
                  Collect from home
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="radio"
                  id="center"
                  name="collectionMethod"
                  value="center"
                  checked={collectionMethod === "center"}
                  onChange={() => setCollectionMethod("center")}
                  className="mr-3 accent-[#bb86fc]"
                />
                <label htmlFor="center" className="text-white text-lg">
                  Will bring to delivery center
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-3xl bg-gradient-to-tr from-purple-600 to-purple-400
                shadow-lg shadow-purple-500/50
                text-white font-semibold text-xl
                transition-transform duration-300 ease-in-out
                hover:scale-105 hover:shadow-purple-700/80
                focus:outline-none focus:ring-4 focus:ring-purple-300"
            >
              Send
            </button>
          </form>
        </main>):(
      <SendCollectionForm/>

        )}
      </div>
    </div>
  );
};

export default Send;
