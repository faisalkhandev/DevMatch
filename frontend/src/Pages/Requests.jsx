import React from 'react';

const Requests = () => {
    const invitations = [
        { id: 1, name: 'Roger Bailey', role: 'Web Developer', img: 'https://via.placeholder.com/50' },
        { id: 2, name: 'Cynthia Roger', role: 'UI-Designer', img: 'https://via.placeholder.com/50' },
        { id: 3, name: 'Alfred Pauli', role: 'UX-Writer', img: 'https://via.placeholder.com/50' },
    ];

    return (
        <div className="min-h-screen ">
            <h2 className="text-lg font-semibold text-gray-400 text-center mt-6">Invitations (3)</h2>
            <div className="flex justify-center mt-4">
                <div className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 px-4">
                    {invitations.map((invitation) => (
                        <div
                            key={invitation.id}
                            className="flex flex-col sm:flex-row items-center justify-between p-4 rounded-lg shadow-md border border-amber-500 mb-4"
                        >
                            <div className="flex items-center space-x-4">
                                <img
                                    src={invitation.img}
                                    alt={invitation.name}
                                    className="w-12 h-12 rounded-full"
                                />
                                <div>
                                    <h3 className="text-lg font-semibold text-white">{invitation.name}</h3>
                                    <p className="text-sm text-gray-300">{invitation.role}</p>
                                </div>
                            </div>

                            <div className="flex space-x-4 mt-4 sm:mt-0 sm:flex-col sm:space-x-0 sm:space-y-2">
                                <button className="btn text-sm text-white bg-red-500 py-1 px-4 rounded-full">
                                    Ignore
                                </button>
                                <button className="btn text-sm text-white bg-teal-500 py-1 px-4 rounded-full">
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
