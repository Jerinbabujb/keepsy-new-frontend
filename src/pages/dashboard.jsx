import React from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Dashboard = () => {
    const { authUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const send = () => {
        navigate('/send');
    };

    const receive = () => {
        navigate('/recieve');
    };

    return (
        <div className='w-full h-screen bg-gradient-to-br from-[#0f0f0f] to-[#2c003e] font-sans text-black'>
            <div className='flex flex-col items-center justify-center h-full text-center backdrop-blur-xl'>
                <h2 className="text-4xl mb-2 text-[#bb86fc]">Dashboard</h2>
                <p className="text-lg mb-5 text-[#e0e0e0]">
                    Welcome to your dashboard! {authUser?.username}
                </p>
                <p className="text-lg mb-5 text-[#e0e0e0]">
                    Here you can manage your account and settings.
                </p>
                <button
                    onClick={send}
                    className="w-40 h-40 my-5 rounded-full border-none text-white font-bold text-lg cursor-pointer
                    bg-[radial-gradient(circle_at_30%_30%,rgba(187,134,252,0.6),rgba(106,13,173,0.3))]
                    shadow-[inset_-5px_-5px_10px_rgba(255,255,255,0.1),inset_5px_5px_15px_rgba(0,0,0,0.3),0_8px_20px_rgba(0,0,0,0.5)]
                    backdrop-blur-md transition-transform duration-300 ease-in-out hover:scale-110
                    hover:shadow-[inset_-4px_-4px_10px_rgba(255,255,255,0.2),inset_6px_6px_15px_rgba(0,0,0,0.4),0_10px_30px_rgba(0,0,0,0.6)]
                    hover:bg-[radial-gradient(circle_at_25%_25%,rgba(187,134,252,0.7),rgba(106,13,173,0.4))]"
                >
                    Send
                </button>
                <button
                    onClick={receive}
                    className="w-40 h-40 my-5 rounded-full border-none text-white font-bold text-lg cursor-pointer
                    bg-[radial-gradient(circle_at_30%_30%,rgba(187,134,252,0.6),rgba(106,13,173,0.3))]
                    shadow-[inset_-5px_-5px_10px_rgba(255,255,255,0.1),inset_5px_5px_15px_rgba(0,0,0,0.3),0_8px_20px_rgba(0,0,0,0.5)]
                    backdrop-blur-md transition-transform duration-300 ease-in-out hover:scale-110
                    hover:shadow-[inset_-4px_-4px_10px_rgba(255,255,255,0.2),inset_6px_6px_15px_rgba(0,0,0,0.4),0_10px_30px_rgba(0,0,0,0.6)]
                    hover:bg-[radial-gradient(circle_at_25%_25%,rgba(187,134,252,0.7),rgba(106,13,173,0.4))]"
                >
                    Receive
                </button>
            </div>
        </div>
    );
};

export default Dashboard;
