import React from 'react';
import { useSelector } from 'react-redux'; // Assuming you're using Redux to fetch user data.

const Friends = () => {
    const friends = useSelector((state) => state.connections.data);

    if (!friends || friends.length === 0) {
        return <h1 className="text-2xl text-center">No Friends Found</h1>;
    }

    return (
        <div>
            <ul className="list bg-base-100 rounded-box shadow-md  ">
                <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
                    You have {friends.length} friend/friends
                </li>

                {friends.map((friend, index) => (
                    <li key={friend._id || index} className="list-row border-2 border-amber-300 mt-3 w-full ">
                        <div className="flex items-center justify-center">
                            <div>
                                <img
                                    className="w-16 h-16 rounded-full object-cover"
                                    src={friend.photoUrl || "https://via.placeholder.com/150"}
                                    alt={friend.firstName}
                                />
                            </div>
                            <div>
                                <div className='mx-3 uppercase'>{friend.firstName + " " + friend.lastName}</div>
                                <div className="mx-3 text-xs font-semibold">
                                    {friend?.gender}
                                </div>
                            </div>

                            <button className="btn btn-square btn-ghost mx-4">
                                <svg width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8 12H8.01M12 12H12.01M16 12H16.01M21.0039 12C21.0039 16.9706 16.9745 21 12.0039 21C9.9675 21 3.00463 21 3.00463 21C3.00463 21 4.56382 17.2561 3.93982 16.0008C3.34076 14.7956 3.00391 13.4372 3.00391 12C3.00391 7.02944 7.03334 3 12.0039 3C16.9745 3 21.0039 7.02944 21.0039 12Z" stroke="#f0f0f0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Friends;
