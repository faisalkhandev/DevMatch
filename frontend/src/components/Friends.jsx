import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router';
import { createSocketConnection } from '../utils/socket';
import { useState } from 'react';
import { useEffect } from 'react';

const socket = createSocketConnection();

const Friends = () => {

    const [onlineUsers, setOnlineUsers] = useState([]);

    const friends = useSelector((state) => state.connections.data);
    const userId = useSelector((state) => state.user.data?._id);

    useEffect(() => {
        if (userId) {
            socket.emit("joinChat", { senderId: userId });
        }

        socket.on("updateUserStatus", (onlineList) => {
            setOnlineUsers(onlineList);
        });

        return () => {
            socket.off("updateUserStatus");
        };
    }, [userId]);


    return (

        <div className="p-4">
            <h2 className="text-lg font-semibold text-gray-400 text-center mt-6">
                Friends ({friends?.length || 0})
            </h2>
            {!friends || friends.length === 0 ? (
                <h1 className="text-2xl text-center">No Friends Found</h1>
            ) : (
                <ul>
                    {friends.map((friend, index) => {

                        const isOnline = onlineUsers.includes(friend._id);
                        return (

                            <li
                                key={friend._id || index}
                                className="list-row border-2 border-amber-300 mt-3 w-full rounded-md"
                            >
                                <div className="flex items-center justify-center p-3">
                                    <div className="relative">
                                        <img
                                            className="w-16 h-16 rounded-full object-cover"
                                            src={friend.photoUrl || 'https://via.placeholder.com/150'}
                                            alt={friend.firstName}
                                        />
                                        <span
                                            className={`absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-white ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}
                                            title={isOnline ? 'Online' : 'Offline'}
                                        ></span>
                                    </div>
                                    <div className="ml-4 text-left">
                                        <div className="uppercase font-bold">{friend.firstName + ' ' + friend.lastName}</div>
                                        <div className="text-xs font-semibold text-gray-400">{friend.gender}</div>
                                    </div>



                                    <Link to={`/chat/${friend?._id}`}>
                                        <button className="btn btn-square btn-ghost ml-auto">
                                            <svg
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                                stroke="#ffffff"
                                            >
                                                <path
                                                    d="M8 12H8.01M12 12H12.01M16 12H16.01M21.0039 12C21.0039 16.9706 16.9745 21 12.0039 21C9.9675 21 3.00463 21 3.00463 21C3.00463 21 4.56382 17.2561 3.93982 16.0008C3.34076 14.7956 3.00391 13.4372 3.00391 12C3.00391 7.02944 7.03334 3 12.0039 3C16.9745 3 21.0039 7.02944 21.0039 12Z"
                                                    stroke="#f0f0f0"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </button>
                                    </Link>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            )}
        </div>
    );
};

export default Friends;
