import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Dashboard = () => {
  const { authUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const send = () => navigate("/send");
  const receive = () => navigate("/recieve");
  const goBack = () => navigate("/");

  return (
    <div className="border w-full h-screen sm:px-[15%] sm:py-[5%] relative">
      {/* Back button at top-left */}
      

      <div className="backdrop-blur-xl border-2 border-gray-600 rounded-2xl overflow-hidden h-full grid grid-cols-1 relative">
        <button
        onClick={goBack}
        className="absolute top-4 left-4 px-3 py-1 rounded-md bg-[#bb86fc] text-white font-semibold
                   shadow-md hover:bg-[#9a63d6] transition-colors duration-200 focus:outline-none"
      >
        &larr; Back
      </button>
        <main className="w-full h-full bg-gradient-to-br from-[#1a1a2e] to-[#16213e] font-sans text-white flex flex-col items-center justify-center text-center p-10">
          <h2 className="text-4xl mb-2 text-[#bb86fc] font-semibold"></h2>
          <p className="text-lg mb-5 text-[#d0d0d0]">
             <strong>{authUser?.username}</strong>!
          </p>
          <p className="text-lg mb-5 text-[#d0d0d0]">
            
          </p>
          <div className="flex gap-8 mt-6 flex-wrap justify-center">
            <button
              onClick={send}
              className="w-44 h-44 rounded-3xl bg-gradient-to-tr from-purple-600 to-purple-400
                shadow-lg shadow-purple-500/50
                text-white font-semibold text-xl
                transition-transform duration-300 ease-in-out
                hover:scale-105 hover:shadow-purple-700/80
                focus:outline-none focus:ring-4 focus:ring-purple-300"
            >
              Send
            </button>
            <button
              onClick={receive}
              className="w-44 h-44 rounded-3xl bg-gradient-to-tr from-blue-600 to-blue-400
                shadow-lg shadow-blue-500/50
                text-white font-semibold text-xl
                transition-transform duration-300 ease-in-out
                hover:scale-105 hover:shadow-blue-700/80
                focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              Receive
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
