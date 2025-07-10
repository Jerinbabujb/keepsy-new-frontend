import React from "react";
import { useNavigate } from "react-router-dom";

const Send = () => {
  const [item, setItem] = React.useState("");
  const [location, setLocation] = React.useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    localStorage.setItem("sendData", JSON.stringify({ item, location }));
    navigate("/codeGenerator");
  };

  return (
    <div className="flex flex-col items-center justify-center p-10 h-screen text-center backdrop-blur-md bg-gradient-to-br from-[#0f0f0f] to-[#2c003e] text-white font-sans">
      <h2 className="text-4xl text-[#bb86fc] mb-2">Send</h2>
      <p className="text-base text-[#e0e0e0] mb-5">
        Welcome to your Send page!
      </p>
      <p className="text-base text-[#e0e0e0] mb-6">
        Here you can manage your account and settings.
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white/5 p-8 rounded-2xl shadow-[0_8px_20px_rgba(0,0,0,0.4)] max-w-md w-full"
      >
        <div className="mb-5 text-left">
          <label htmlFor="item" className="block mb-2 font-medium text-[#bb86fc]">
            Item:
          </label>
          <input
            type="text"
            id="item"
            name="item"
            value={item}
            onChange={(e) => setItem(e.target.value)}
            required
            className="w-full p-3 rounded-lg bg-white/10 text-white text-base focus:outline-none focus:bg-white/15"
          />
        </div>

        <div className="mb-5 text-left">
          <label htmlFor="location" className="block mb-2 font-medium text-[#bb86fc]">
            Location (optional):
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-3 rounded-lg bg-white/10 text-white text-base focus:outline-none focus:bg-white/15"
          />
        </div>

   <div className="mb-6 text-left">
  <p className="text-lg font-medium text-[#bb86fc] mb-2">Collection Method</p>
  
  <div className="flex items-center mb-2">
    <input
      type="radio"
      id="home"
      name="collectionMethod"
      value="home"
      className="mr-2 accent-[#bb86fc]"
    />
    <label htmlFor="home" className="text-white">Collect from home</label>
  </div>

  <div className="flex items-center">
    <input
      type="radio"
      id="center"
      name="collectionMethod"
      value="center"
      className="mr-2 accent-[#bb86fc]"
    />
    <label htmlFor="center" className="text-white">Will bring to delivery center</label>
  </div>
</div>

        <button
          type="submit"
          className="w-full py-3 rounded-xl font-bold text-lg text-white bg-gradient-to-r from-[#bb86fc] to-[#7a1fa2] cursor-pointer transition-transform duration-200 shadow-[0_4px_15px_rgba(187,134,252,0.4)] hover:scale-105 hover:shadow-[0_6px_25px_rgba(187,134,252,0.6)]"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Send;
