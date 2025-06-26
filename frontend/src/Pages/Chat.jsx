import { useEffect } from 'react';
import { useParams } from 'react-router'
import { createSocketConnection } from '../utils/socket';
import { useSelector } from 'react-redux';

const Chat = () => {

    const { targetUserId } = useParams();
    const user = useSelector((user) => user?.user?.data)
    const userId = user?._id;
    const firstName = user?.firstName;
    const lastName = user?.lastName;


    useEffect(() => {
        if (!userId) return;

        const socket = createSocketConnection();
        socket.emit("joinChat", { firstName, lastName, userId, targetUserId })


        return () => {
            socket.disconnect();
        }
    }, [userId, targetUserId])


    const messages = [
        {
            id: 1,
            name: "Obi-Wan Kenobi",
            time: "12:45",
            avatar: "https://img.daisyui.com/images/profile/demo/kenobee@192.webp",
            text: "You were the Chosen One!",
            position: "start",
            footer: "Delivered",
        },
        {
            id: 2,
            name: "Anakin",
            time: "12:46",
            avatar: "https://img.daisyui.com/images/profile/demo/anakeen@192.webp",
            text: "I hate you!",
            position: "end",
            footer: "Seen at 12:46",
        },

    ];

    return (
        <div className='flex justify-center items-center mt-10'>

            <div className="flex flex-col h-[500px] w-full max-w-2xl border rounded-xl shadow overflow-hidden">
                <div className="p-4 border-b font-semibold text-gray-300">
                    Chat with {targetUserId}
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`chat chat-${msg.position}`}>

                            <div className="chat-header">
                                {msg.name}
                            </div>
                            <div className="chat-bubble">{msg.text}</div>
                            <div className="chat-footer opacity-50">{msg.footer}</div>
                        </div>
                    ))}
                </div>

                <div className="p-3 border-t flex items-center">
                    <input
                        type="text"
                        placeholder="Type a message…"
                        className="input input-bordered w-full rounded-md"
                    />
                    <button className="ml-3 btn btn-primary rounded-md px-6">Send</button>
                </div>
            </div>
        </div>
    )
}

export default Chat
