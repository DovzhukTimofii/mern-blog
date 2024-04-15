import { useSelector } from "react-redux"
import { Button, Textarea } from "flowbite-react";
import { useState, useEffect } from "react";
import moment from 'moment';
import io from "socket.io-client";

const socket = io.connect("http://localhost:3002");

export default function MainChat() {
    const { currentUser } = useSelector((state) => state.user);
    const { showChat } = useSelector((state) => state.showChat);
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);
    const room = '654321';
    // const [showChat, setShowChat] = useState(false);

    const joinRoom = () => {
        socket.emit("join_room", room);
    };

    if(showChat) {
        joinRoom()
    }

    const sendMessage = async (e) => {
        e.preventDefault();
        try {
            if (currentMessage !== "") {
                const messageData = {
                room: '654321',
                userId: currentUser._id,
                author: currentUser.username,
                profilePicture: currentUser.profilePicture,
                message: currentMessage,
                time:
                    new Date(Date.now()).getHours() +
                    ":" +
                    new Date(Date.now()).getMinutes(),
                };
    
                await socket.emit("send_message", messageData);
                setMessageList((list) => [...list, messageData]);
                const res = await fetch('/api/messageOfMainChat/create', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        message: currentMessage,
                        room: room,
                        userId: currentUser._id,
                        author: currentUser.username,
                        profilePicture: currentUser.profilePicture,
                    }),
                });
                const data = await res.json();
                if(res.ok) {
                    setCurrentMessage("");
                    return data;
                }
                
                
            }
        } catch (error) {
            console.log(error)
        }
        
    };

    useEffect(() => {
        socket.off("receive_message").on("receive_message", (data) => {
          setMessageList((list) => [...list, data]);
        });
        const fetchMessages = async () => {
            try {
              const res = await fetch(`/api/messageOfMainChat/get?userId=${currentUser._id}`);
              const data = await res.json();
              if(res.ok) {
                setMessageList(data.massages);
              }
            } catch (error) {
              console.log(error);
            }
          }
          fetchMessages();
          if(currentUser) {
            fetchMessages();
        }
    }, []);

    return (
        <div className="overflow-y-hidden  min-h-screen relative">
            {showChat && (
                <div className="chat-window">
                    <div className="w-full pb-60 h-screen overflow-auto">
                        {messageList.map((messageContent) => {
                        return (
                            // eslint-disable-next-line react/jsx-key
                            <div
                            className={`${currentUser.username !== messageContent.author ? "justify-start" : "justify-end"}  flex p-4  dark:border-gray-600 text-sm`}
                            id={currentUser.username === messageContent.author ? "you" : "other"}
                            >
                                <div className="border p-5 rounded-lg">
                                    <div className={`${currentUser.username !== messageContent.author ? null : "flex flex-row-reverse"} flex items-center mb-1`}>
                                        <div className="flex-shrink-0 mr-3">
                                            <img className="w-10 h-10 rounded-full bg-gray-200" src={messageContent.profilePicture} alt={messageContent.username} />
                                        </div>
                                        <div className={`${currentUser.username !== messageContent.author ? null : "flex flex-row-reverse"} gap-3 flex items-center mb-1`}>
                                            <span className='font-bold mr-1 text-xs truncate' id="author">{messageContent.author}</span>
                                            <span className='text-gray-500 text-xs' id="time">{moment(messageContent.createdAt).fromNow()}</span>
                                        </div>
                                        
                                    </div>
                                    <div className={`${currentUser.username !== messageContent.author ? "pl-1" : "flex flex-row-reverse pr-5"} message-content`}>
                                        
                                        <p>{messageContent.message}</p>
                                    
                                    </div>
                                    
                                </div>
                            </div>
                        );
                        })}
                    </div>
                    <form onSubmit={sendMessage} className="border fixed bg-white text-gray-700 dark:text-gray-200 dark:bg-[rgb(16,23,42)]  bottom-0 w-full border-teal-500 rounded-md p-3">
                        <Textarea value={currentMessage} onKeyPress={(event) => {event.key === "Enter" && sendMessage()}} onChange={(event) => {setCurrentMessage(event.target.value)}} placeholder="Додати повідомлення..." rows="3" maxLength="100"/>
                        <div className="flex justify-between items-center mt-5">
                            <p className="text-gray-500 text-xs">Залишилися {100 - currentMessage.length} символів </p>
                            <Button  gradientDuoTone="greenToBlue" type="submit">
                                Відправити
                            </Button>
                        </div>
                    </form>
                </div>
            )}
        </div>
        
    )
}