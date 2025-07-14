import React, { useState, useEffect, useContext } from "react";
import { ItemContext } from "../../context/ItemContext";
import { useNavigate } from "react-router-dom";

const CodeGenerator = () => {
  const [code, setCode] = useState('');
  const [item, setItem] = useState('');
  const [location, setLocation] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const navigate=useNavigate();

  const { sendItem } = useContext(ItemContext);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("sendData"));
    if (storedData) {
      setItem(storedData.item);
      setLocation(storedData.location);
    }
  }, []);

  const randomCodeGeneration = () => {
    return Math.random().toString(36).substring(2, 8); // Generate a random code
  };

  const handleSubmit = () => {
    if (!item) {
      alert("Enter the item first");
      return;
    }
    setButtonDisabled(true);
    const randcode = randomCodeGeneration();
    setCode(randcode);

    sendItem({ item, location, code: randcode });
    setButtonDisabled(false);
  };
    const goBack=()=>{
    navigate('/send');
  }


  return (
    <div className="border w-full h-screen sm:px-[15%] sm:py-[5%]">
      <div className="backdrop-blur-xl border-2 border-gray-600 rounded-2xl overflow-hidden h-full grid grid-cols-1 relative">
         <button
        onClick={goBack}
        className="absolute top-4 left-4 px-3 py-1 rounded-md bg-[#bb86fc] text-white font-semibold
                   shadow-md hover:bg-[#9a63d6] transition-colors duration-200 focus:outline-none"
      >
        &larr; Back
      </button>
        <main className="flex flex-col items-center justify-center bg-gradient-to-br from-[#1a1a2e] to-[#16213e] p-10 text-white font-sans overflow-auto max-w-md mx-auto rounded-3xl shadow-lg shadow-purple-600/40">
          <h2 className="text-4xl mb-4 font-semibold text-[#bb86fc]">Code Generator</h2>
          <p className="text-base mb-3 text-[#d0d0d0] text-center">
            Welcome to your Code Generator page!
          </p>
          <p className="text-base mb-6 text-[#d0d0d0] text-center">
            Here you can generate a code to send to your friend.
          </p>

          <div className="bg-white/5 p-6 rounded-2xl shadow-md shadow-purple-500/30 w-full mb-8">
            <p className="text-lg text-[#e0e0e0] mb-2">
              <strong>Item:</strong> {item}
            </p>
            {location && (
              <p className="text-lg text-[#e0e0e0] mb-2">
                <strong>Location:</strong> {location}
              </p>
            )}
            {code && (
              <p className="text-lg text-green-400 mt-4">
                <strong>Generated Code:</strong> {code}
              </p>
            )}
            <p className="text-sm text-[#c0c0c0] mt-4">
              Share this code with your friend to receive the item.
            </p>
          </div>

          <button
            onClick={handleSubmit}
            disabled={buttonDisabled}
            className={`w-full py-4 rounded-3xl bg-gradient-to-tr from-purple-600 to-purple-400
              shadow-lg shadow-purple-500/50
              text-white font-semibold text-xl
              transition-transform duration-300 ease-in-out
              ${
                buttonDisabled
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:scale-105 hover:shadow-purple-700/80"
              }
              focus:outline-none focus:ring-4 focus:ring-purple-300`}
          >
            {buttonDisabled ? "Generating..." : "Generate Code"}
          </button>
        </main>
      </div>
    </div>
  );
};

export default CodeGenerator;
