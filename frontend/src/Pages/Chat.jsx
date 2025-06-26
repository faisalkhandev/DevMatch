import { useEffect } from 'react';
import { useParams } from 'react-router'
import { createSocketConnection } from '../utils/socket';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useRef } from 'react';

const Chat = () => {


    const { targetUserId } = useParams();
    const user = useSelector((user) => user?.user?.data)
    const userId = user?._id;
    const firstName = user?.firstName;
    const lastName = user?.lastName;

    const [newMessage, setNewMessage] = useState("");
    const [messages, setMessages] = useState([]);

    const chatContainerRef = useRef();

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    useEffect(() => {
        if (!userId) return;

        const socket = createSocketConnection();
        socket.emit("joinChat", { firstName, lastName, senderId: userId, receiverId: targetUserId })

        socket.on("receiveMessage", ({ text, time, firstName, senderId, receiverId }) => {
            setMessages((prevMessages) => [...prevMessages, { text, time, firstName, senderId, receiverId }]);
        })

        return () => {
            socket.disconnect();
        }
    }, [userId, targetUserId])


    function handleMessage() {
        const socket = createSocketConnection();
        if (!newMessage.trim()) return;


        const msg = {
            senderId: userId,
            receiverId: targetUserId,
            firstName,
            text: newMessage,
            time: new Date().toLocaleTimeString(),
        };

        // Emit to socket here
        socket.emit("sendMessage", msg);

        setNewMessage("");
    }


    return (
        <div className='flex justify-center items-center mt-10'>

            <div className="flex flex-col h-[500px] w-full max-w-2xl border rounded-xl shadow overflow-hidden">
                <div className="p-4 border-b font-semibold text-gray-300">
                    Chat with {targetUserId}
                </div>

                <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4">

                    {messages.map((msg, index) => {
                        const isSender = msg.senderId === userId;
                        const position = isSender ? "chat-end" : "chat-start";
                        const bubbleColor = isSender ? "bg-blue-500 text-white" : "bg-gray-200 text-black";
                        const nameColor = isSender ? "text-blue-300" : "text-gray-500";

                        return (
                            <div key={index} className={`chat ${position}`}>
                                <div className={`chat-header text-xs ${nameColor}`}>
                                    {msg.firstName}
                                </div>
                                <div className={`chat-bubble ${bubbleColor}`}>
                                    {msg.text}
                                </div>
                                <div className="chat-footer text-xs text-gray-400">
                                    {msg.time}
                                </div>

                            </div>
                        );
                    })}

                </div>

                <div className="p-3 border-t flex items-center">
                    <input
                        type="text"
                        placeholder="Type a message…"
                        className="input input-bordered w-full rounded-md"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <button className="ml-3 btn btn-primary rounded-md px-6" onClick={handleMessage}>Send</button>
                </div>
            </div>
        </div>
    )
}

export default Chat
