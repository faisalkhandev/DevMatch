import React from 'react';

const Requests = () => {
    const invitations = [
        { id: 1, name: 'Roger Bailey', role: 'Web Developer', img: 'https://via.placeholder.com/50' },
        { id: 2, name: 'Cynthia Roger', role: 'UI-Designer', img: 'https://via.placeholder.com/50' },
        { id: 3, name: 'Alfred Pauli', role: 'UX-Writer', img: 'https://via.placeholder.com/50' },
    ];

    return (

        <div className="min-h-screen ">
            <h2 className="text-lg font-semibold text-gray-400 flex justify-center">Invitations (3)</h2>
            <div className='flex justify-center items-center'>


                <div className="mt-6 space-y-4 w-1/4">
                    {invitations.map((invitation) => (
                        <div
                            key={invitation.id}
                            className="flex items-center justify-between bg-gray-600 p-4 rounded-lg shadow-md"
                        >
                            <div className="flex items-center space-x-4">
                                <img src={invitation.img} alt={invitation.name} className="w-12 h-12 rounded-full" />
                                <div>
                                    <h3 className="text-lg font-semibold text-white">{invitation.name}</h3>
                                    <p className="text-sm text-gray-200">{invitation.role}</p>
                                </div>
                            </div>

                            <div className="flex space-x-4">
                                <button className="text-sm text-white bg-red-500 py-1 px-4 rounded-full">Ignore</button>
                                <button className="text-sm text-white bg-teal-500 py-1 px-4 rounded-full">
                                    Accept
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Requests;
