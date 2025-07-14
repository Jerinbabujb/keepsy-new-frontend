import React, { useContext, useEffect, useRef, useState } from 'react';
import assets from '../assets';
import { formatMessageTime } from '../lib/utils';
import { ChatContext } from '../../context/ChatContext';
import { AuthContext } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import RightSideBar from './RightSideBar';

const ChatContainer = () => {
  const { messages, selectedUser, setSelectedUser, sendMessage, getMessages } = useContext(ChatContext);
  const { authUser, onlineUsers } = useContext(AuthContext);
  const [showRightSideBar, setShowRightSideBar] = useState(false);
  const [input, setInput] = useState('');
  const scrollEnd = useRef();
  const navigate = useNavigate();

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    await sendMessage({ text: input.trim() });
    setInput('');
  };

  const handleSendImage = async (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith('image/')) {
      toast.error('Please select a valid image');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      await sendMessage({ image: reader.result });
      e.target.value = '';
    };
    reader.readAsDataURL(file);
  };

  const toggleRightSideBar = () => setShowRightSideBar((prev) => !prev);
  const gotoKeepsy = () => navigate('/dashboard');

  useEffect(() => {
    if (selectedUser) getMessages(selectedUser._id);
  }, [selectedUser]);

  useEffect(() => {
    if (scrollEnd.current) {
      scrollEnd.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  if (!selectedUser) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-white/80 bg-white/10 max-md:hidden">
        <img src="/assets/keepsy.webp" alt="Start Chat" className="w-20 mb-4" />
        <p className="text-xl font-semibold">Chat anytime, anywhere</p>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col h-full bg-black/50 backdrop-blur-lg text-white">
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center justify-between p-4 border-b border-white/10 bg-black/30">
        <div className="flex items-center gap-3">
          <img src={selectedUser?.profilePic || assets.avatar_icon} alt="Profile" className="w-10 h-10 rounded-full" />
          <div className="text-lg font-medium flex items-center gap-2">
            {selectedUser?.username}
            {onlineUsers.includes(selectedUser._id) && (
              <span className="w-2 h-2 bg-green-500 rounded-full" />
            )}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <img
            onClick={() => setSelectedUser(null)}
            src={assets.arrow_icon}
            alt="Back"
            className="w-5 md:hidden cursor-pointer"
          />
          <img
            onClick={toggleRightSideBar}
            src={assets.help_icon}
            alt="Help"
            className="w-5 cursor-pointer hidden md:block"
          />
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-5">
        {messages.map((msg, index) => {
          const isSender = msg.senderId === authUser._id;
          return (
            <div key={index} className={`flex ${isSender ? 'justify-end' : 'justify-start'}`}>
              <div className="max-w-[75%]">
                {msg.image ? (
                  <img
                    src={msg.image}
                    alt="sent image"
                    className="rounded-lg border border-gray-700 mb-1 max-w-xs"
                  />
                ) : (
                  <div
                    className={`rounded-lg p-3 text-sm whitespace-pre-wrap ${
                      isSender
                        ? 'bg-violet-500/40 rounded-br-none'
                        : 'bg-white/10 rounded-bl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                )}
                <div className="text-xs text-gray-400 flex items-center gap-2 mt-1">
                  <img
                    src={
                      isSender
                        ? authUser?.profilePic || assets.avatar_icon
                        : selectedUser?.profilePic || assets.avatar_icon
                    }
                    alt="profile"
                    className="w-6 h-6 rounded-full"
                  />
                  <span>{formatMessageTime(msg.createdAt)}</span>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={scrollEnd} />
      </div>

      {/* Input Area */}
      <form
        onSubmit={handleSendMessage}
        className="sticky bottom-0 flex items-center gap-3 p-3 bg-black/30 backdrop-blur border-t border-white/10"
      >
        <div className="flex-1 flex items-center bg-white/10 rounded-full px-4 py-2">
          <input
            type="text"
            className="flex-1 bg-transparent outline-none text-white text-sm placeholder-gray-400"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(e)}
          />
          <input type="file" id="image" onChange={handleSendImage} hidden accept="image/*" />
          <label htmlFor="image" className="cursor-pointer">
            <img src={assets.gallery_icon} alt="Upload" className="w-5 ml-3" />
          </label>
        </div>
        <img
          src={assets.send_button}
          onClick={handleSendMessage}
          alt="Send"
          className="w-6 cursor-pointer"
        />
        <img
          src="/assets/gift-box.png"
          onClick={gotoKeepsy}
          alt="Dashboard"
          className="w-8 h-8 rounded-full cursor-pointer"
        />
      </form>
    </div>
  );
};

export default ChatContainer;
