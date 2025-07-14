import React, { useContext, useEffect, useState } from 'react';
import assets from '../assets';
import { ChatContext } from '../../context/ChatContext';
import { AuthContext } from '../../context/AuthContext';

const RightSideBar = () => {
  const { selectedUser, messages } = useContext(ChatContext);
  const { logout, onlineUsers } = useContext(AuthContext);
  const [msgImages, setMsgImages] = useState([]);

  useEffect(() => {
    const imgs = messages.filter((msg) => msg.image).map((msg) => msg.image);
    setMsgImages(imgs);
  }, [messages]);

  if (!selectedUser) return null;

  return (
    <div className="bg-black/30 text-white w-full max-w-sm h-full overflow-y-auto shadow-inner backdrop-blur-md max-md:hidden">
      {/* User Info */}
      <div className="flex flex-col items-center py-6 space-y-2">
        <img
          src={selectedUser?.profilePic || assets.avatar_icon}
          alt="User"
          className="w-20 h-20 rounded-full object-cover border border-gray-400"
        />
        <h1 className="text-xl font-semibold flex items-center gap-2">
          {onlineUsers.includes(selectedUser._id) && (
            <span className="w-2 h-2 bg-green-500 rounded-full" />
          )}
          {selectedUser.username}
        </h1>
        <p className="text-sm text-gray-400 px-6 text-center">{selectedUser.bio}</p>
      </div>

      <hr className="border-white/10 mx-6 my-4" />

      {/* Media Section */}
      <div className="px-6">
        <h2 className="text-sm font-semibold text-white mb-2">Media</h2>
        <div className="grid grid-cols-3 gap-2 max-h-52 overflow-y-auto">
          {msgImages.length > 0 ? (
            msgImages.map((url, index) => (
              <div
                key={index}
                onClick={() => window.open(url, '_blank')}
                className="cursor-pointer transition-transform duration-200 hover:scale-105"
              >
                <img
                  src={url}
                  alt={`media-${index}`}
                  className="w-full h-20 object-cover rounded-md border border-gray-600"
                />
              </div>
            ))
          ) : (
            <p className="col-span-3 text-xs text-gray-500">No media shared yet.</p>
          )}
        </div>
      </div>

      {/* Logout */}
      <div className="flex justify-center mt-8 mb-5">
        <button
          onClick={logout}
          className="bg-gradient-to-r from-purple-500 to-violet-600 text-white text-sm px-8 py-2 rounded-full shadow-md hover:shadow-lg transition duration-200"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default RightSideBar;
