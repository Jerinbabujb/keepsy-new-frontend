import React from "react";

const Recieve = () => {
  const [code, setCode] = React.useState("");
  const [item, setItem] = React.useState("");
  const [location, setLocation] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { code };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}api/receive`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();
      setItem(result.item?.item);
      setLocation(result.item?.location);
    } catch (error) {
      alert("Failed to receive code. Please try again.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen p-10 text-center backdrop-blur-md bg-gradient-to-br from-[#0f0f0f] to-[#2c003e] text-white font-sans">
      <h2 className="text-4xl text-[#bb86fc] mb-2">Receive</h2>
      <p className="text-base text-[#e0e0e0] mb-5">
        Welcome to your Receive page!
      </p>
      <p className="text-base text-[#e0e0e0] mb-6">
        Here you can manage your account and settings.
      </p>

      <form
        onSubmit={handleSubmit}
        method="POST"
        className="bg-white/5 p-8 rounded-2xl shadow-[0_8px_20px_rgba(0,0,0,0.4)] max-w-md w-full"
      >
        <div className="mb-5 text-left">
          <label
            htmlFor="code"
            className="block mb-2 font-medium text-[#bb86fc]"
          >
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
          className="w-full py-3 rounded-xl font-bold text-lg text-white bg-gradient-to-r from-[#bb86fc] to-[#7a1fa2] cursor-pointer transition-transform duration-200 shadow-[0_4px_15px_rgba(187,134,252,0.4)] hover:scale-105 hover:shadow-[0_6px_25px_rgba(187,134,252,0.6)]"
        >
          Submit
        </button>

        {/* Display results only if available */}
        {item && (
          <p className="mt-6 text-lg text-[#e0e0e0]">
            <strong>Item:</strong> {item}
          </p>
        )}
        {location && (
          <p className="mt-2 text-lg text-[#e0e0e0]">
            <strong>Location:</strong> {location}
          </p>
        )}
      </form>
    </div>
  );
};

export default Recieve;
