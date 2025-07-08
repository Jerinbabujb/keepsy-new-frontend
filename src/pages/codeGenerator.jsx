import React, { useState, useEffect } from "react";

const CodeGenerator = () => {
  const [code, setCode] = useState('');
  const [item, setItem] = useState('');
  const [location, setLocation] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(false);

  // Load item & location from localStorage
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("sendData"));
    if (storedData) {
      setItem(storedData.item);
      setLocation(storedData.location);
    }
  }, []);

  const handleSubmit = async () => {
    if (!item) return alert("Item data not found!");

    setButtonDisabled(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}api/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ item, location })
      });

      const result = await response.json();
      if (result?.code) {
        setCode(result.code);
      } else {
        alert("Failed to generate code.");
      }
    } catch (error) {
      console.error("Error generating code:", error);
      alert("Something went wrong.");
    } finally {
      setButtonDisabled(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen p-10 text-center backdrop-blur-md bg-gradient-to-br from-[#0f0f0f] to-[#2c003e] text-white font-sans">
      <h2 className="text-4xl text-[#bb86fc] mb-2">Code Generator</h2>
      <p className="text-base text-[#e0e0e0] mb-3">
        Welcome to your Code Generator page!
      </p>
      <p className="text-base text-[#e0e0e0] mb-3">
        Here you can generate a code to send to your friend.
      </p>

      <div className="bg-white/5 p-8 rounded-2xl shadow-[0_8px_20px_rgba(0,0,0,0.4)] max-w-md w-full mb-6">
        <p className="text-lg text-[#e0e0e0] mb-2"><strong>Item:</strong> {item}</p>
        {location && (
          <p className="text-lg text-[#e0e0e0] mb-2"><strong>Location:</strong> {location}</p>
        )}
        {code && (
          <p className="text-lg text-green-400 mt-4"><strong>Generated Code:</strong> {code}</p>
        )}
        <p className="text-sm text-[#e0e0e0] mt-4">
          Share this code with your friend to receive the item.
        </p>
      </div>

      <button
        onClick={handleSubmit}
        disabled={buttonDisabled}
        className={`w-full max-w-xs py-3 rounded-xl font-bold text-lg text-white bg-gradient-to-r from-[#bb86fc] to-[#7a1fa2] cursor-pointer transition-transform duration-200 shadow-[0_4px_15px_rgba(187,134,252,0.4)] ${
          buttonDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 hover:shadow-[0_6px_25px_rgba(187,134,252,0.6)]'
        }`}
      >
        {buttonDisabled ? "Generating..." : "Generate Code"}
      </button>
    </div>
  );
};

export default CodeGenerator;
