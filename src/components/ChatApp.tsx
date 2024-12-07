// Home.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

import { Socket } from "socket.io";
import { jwtDecode, JwtPayload } from "jwt-decode";

const ChatApp = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState<any[]>([]);
    const [selectedUser, setSelectedUser] = useState<any | null>(null);
    const [message, setMessage] = useState("");
    const socketIo = io("http://localhost:5000");
    useEffect(() => {
        const token = localStorage.getItem("token");
        const decodedToken : any  = jwtDecode(token as string); 
        socketIo.emit("user", decodedToken);
        
        if (!token) {
            navigate("/");
        }
        const fetchUsers = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/v1/user/all-user", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUsers(response?.data?.data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();

    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
        socketIo.disconnect();
      
    };

    const handleSelectUser = (user: any) => {
        setSelectedUser(user);
    };

    const handleSendMessage = () => {
        if (socketIo) {
            socketIo.emit("clientMessage", message);
            setMessage(""); 
          }
    };

    return (

        <div className="flex h-screen">

            <div className="w-1/3 bg-gray-100 p-4 border-r">
                <h2 className="text-xl font-bold mb-4">Users</h2>
                <ul className=" flex  flex-col  gap-4 rounded">
                    {users.map((user) => (
                        <li
                            key={user._id}
                            className="cursor-pointer p-2 hover:bg-indigo-100  bg-slate-400 rounded  duration-500 flex  gap-8  items-center"
                            onClick={() => handleSelectUser(user)}
                        >

                            <img className=" w-16 h-16 rounded-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5GOMxZRRvTEzYHX3-XuiZ5PqYRXQJ4APh3-vmINzcX8MkxEHbD8nyR7DOx84Rd-Ff0xU&usqp=CAU" alt="" />
                            <p>        {user.name}</p>
                        </li>
                    ))}
                </ul>
            </div>


            <div className="flex-1 bg-white p-4">
                <div className="flex justify-between mb-4">
                    <h2 className="text-xl font-bold">Chat</h2>
                    <button
                        onClick={handleLogout}
                        className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700"
                    >
                        Logout
                    </button>
                </div>

                {selectedUser ? (
                    <div className="space-y-4">
                        <div className="bg-gray-100 p-4 rounded-lg">
                            <h3 className="text-lg font-semibold">{selectedUser.name}</h3>
                            {/* Display live chat messages here (you can integrate with a socket or API for live updates) */}
                            <div className="h-48 bg-gray-200 p-4 rounded-lg overflow-y-auto">
                                {/* Sample chat messages */}
                                <div>Hi {selectedUser.name}, how are you?</div>
                                <div>I am good, thanks! How about you?</div>
                            </div>
                        </div>

                        <div className="mt-4">
                            <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md"
                                placeholder="Type a message..."
                            />
                            <button
                                onClick={handleSendMessage}
                                className="mt-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                            >
                                Send Message
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="text-center text-gray-500">Select a user to start chatting.</div>
                )}
            </div>
        </div>
    );
};

export default ChatApp;
