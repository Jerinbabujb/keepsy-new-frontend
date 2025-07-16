import React, { useState, useContext } from "react";
import { ItemContext } from "../../context/ItemContext";
import { useNavigate } from "react-router-dom";
import RecieverCollectionForm from "../components/RecieverCollectionForm";

const Receive = () => {
  const [code, setCode] = useState("");
  const [item, setItem] = useState("");
  const [location, setLocation] = useState("");
  const [collectionMethod, setCollectionMethod] = useState("");
  const [loading, setLoading] = useState(false);
    const [collectFromHome,setCollectFromHome]=useState(false);
  

  const navigate=useNavigate();
  const { recieveItem } = useContext(ItemContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await recieveItem({ code });

    if (result) {
      setItem(result.item);
      setLocation(result.location);
      setCollectionMethod(result.collectionMethod || "");
    } else {
      setItem("");
      setLocation("");
      setCollectionMethod("");
      alert("Invalid code or no data found.");
    }
    setLoading(false);
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
        <main className="flex flex-col items-center justify-center bg-gradient-to-br from-[#1a1a2e] to-[#16213e] p-10 text-white font-sans overflow-auto max-w-md mx-auto rounded-3xl shadow-lg shadow-purple-600/40">
          <h2 className="text-4xl mb-4 font-semibold text-[#bb86fc]">Receive</h2>
          <p className="text-base mb-5 text-[#d0d0d0] text-center">
            Welcome to your Receive page! Manage your account and settings here.
          </p>

          <form
            onSubmit={handleSubmit}
            className="bg-white/5 p-8 rounded-2xl shadow-[0_8px_20px_rgba(0,0,0,0.4)] w-full"
          >
            <div className="mb-5 text-left">
              <label htmlFor="code" className="block mb-2 font-medium text-[#bb86fc]">
                Enter the code:
              </label>
              <input
                type="text"
                id="code"
                placeholder="Enter the code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
                className="w-full p-3 rounded-lg bg-white/10 text-white text-base focus:outline-none focus:bg-white/15"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-xl font-bold text-lg text-white bg-gradient-to-r from-[#bb86fc] to-[#7a1fa2] cursor-pointer transition-transform duration-200 shadow-[0_4px_15px_rgba(187,134,252,0.4)] ${
                loading ? "opacity-50 cursor-not-allowed" : "hover:scale-105 hover:shadow-[0_6px_25px_rgba(187,134,252,0.6)]"
              }`}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>

            {/* Display received details if available */}
            {(item || location) && (
              <div className="mt-8 text-left text-[#e0e0e0]">
                {item && (
                  <p className="text-lg mb-2">
                    <strong>Item:</strong> {item}
                  </p>
                )}
                {location && (
                  <p className="text-lg mb-2">
                    <strong>Location:</strong> {location}
                  </p>
                )}

                <div className="mb-6">
                  <p className="text-lg font-medium text-[#bb86fc] mb-2">Collection Method</p>

                  <div className="flex items-center mb-2">
                    <input
                      type="radio"
                      id="home"
                      name="collectionMethod"
                      value="home"
                      checked={collectionMethod === "home"}
                      onClick={()=>setCollectFromHome(true)}
                      readOnly
                      className="mr-2 accent-[#bb86fc]"
                    />
                    <label htmlFor="home" className="text-white">
                      Deliver to home
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="center"
                      name="collectionMethod"
                      value="center"
                      checked={collectionMethod === "center"}
                      readOnly
                      className="mr-2 accent-[#bb86fc]"
                    />
                    <label htmlFor="center" className="text-white">
                      Will come to delivery center
                    </label>
                  </div>
                </div>
              </div>
            )}
          </form>
        </main>):(
<RecieverCollectionForm/>

        )}
      </div>
    </div>
  );
};

export default Receive;
