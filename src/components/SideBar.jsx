import { useEffect, useState, useContext, useRef } from 'react';
import assets from '../assets';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';

const SideBar = () => {
  const {
    getUsers,
    users,
    selectedUser,
    setSelectedUser,
    unseenMessages,
    setUnseenMessages
  } = useContext(ChatContext);

  const { logout, onlineUsers } = useContext(AuthContext);
  const [input, setInput] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const menuRef = useRef(null);

  const filteredUsers = input
    ? users.filter((user) =>
        user.username.toLowerCase().includes(input.toLowerCase())
      )
    : users;

  useEffect(() => {
    getUsers();
  }, [onlineUsers]);

  // Close menu if clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`bg-black/30 h-full p-5 text-white overflow-y-auto backdrop-blur-md w-full max-w-sm rounded-r-xl ${
        selectedUser ? 'max-md:hidden' : ''
      }`}
    >
      {/* Logo & Menu */}
      <div className="pb-5">
        <div className="flex justify-between items-center">
          <img
            src="/assets/keepsy.webp"
            alt="Keepsy"
            className="max-w-[120px]"
          />
          <div className="relative" ref={menuRef}>
            <img
              src={assets.menu_icon}
              alt="menu"
              className="w-5 cursor-pointer"
              onClick={() => setMenuOpen((prev) => !prev)}
            />
            {menuOpen && (
              <div className="absolute top-full right-0 mt-2 w-36 bg-[#282142] border border-gray-600 rounded-md shadow-lg p-3 z-30">
                <p
                  onClick={() => {
                    navigate('/profile');
                    setMenuOpen(false);
                  }}
                  className="cursor-pointer text-sm hover:underline"
                >
                  Edit Profile
                </p>
                <hr className="my-2 border-t border-gray-500" />
                <p
                  onClick={() => {
                    logout();
                    setMenuOpen(false);
                  }}
                  className="cursor-pointer text-sm hover:underline"
                >
                  Logout
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Search */}
        <div className="bg-[#282142] rounded-full flex items-center gap-2 py-2 px-4 mt-6">
          <img src={assets.search_icon} alt="Search" className="w-4" />
          <input
            type="text"
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search"
            className="bg-transparent text-sm text-white placeholder-gray-400 flex-1 outline-none"
          />
        </div>
      </div>

      {/* User List */}
      <div className="mt-4 space-y-2">
        {filteredUsers.map((user, index) => (
          <div
            key={index}
            onClick={() => {
              setSelectedUser(user);
              setUnseenMessages((prev) => ({ ...prev, [user._id]: 0 }));
            }}
            className={`relative flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 cursor-pointer transition ${
              selectedUser?._id === user._id ? 'bg-[#282142]/50' : ''
            }`}
          >
            <img
              src={user?.profilePic || assets.avatar_icon}
              alt="profile"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex flex-col flex-1">
              <p className="text-sm font-medium">{user.username}</p>
              <span
                className={`text-xs ${
                  onlineUsers.includes(user._id)
                    ? 'text-green-400'
                    : 'text-gray-400'
                }`}
              >
                {onlineUsers.includes(user._id) ? 'Online' : 'Offline'}
              </span>
            </div>

            {unseenMessages[user._id] > 0 && (
              <div className="absolute top-2 right-4 bg-violet-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {unseenMessages[user._id]}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
