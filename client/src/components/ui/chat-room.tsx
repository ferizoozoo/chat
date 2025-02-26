import { useEffect, useRef, useState } from "react";
import "../../assets/styles/chat-ui/chat-room.css";
import ChatMessages from "./chat-messages";
import ChatForm from "./chat-form";
import { addMessageToRoom } from "../../apis/message";
import useLocalStorage from "../../hooks/useLocalStorage";
import { LocalStorageConsts, SocketConsts } from "../../shared/constants";
import useSocket from "../../hooks/useSocket";
import { safeJsonParse } from "../../shared/safeJsonParse";
import { getRoomMessages } from "../../apis/room";

function ChatRoom({ roomId }) {
  const [user, _] = useLocalStorage(LocalStorageConsts.USER);
  const { emit } = useSocket(SocketConsts.GET_MESSAGE, (data) => {
    setNewMessage(data);
  });
  const [messages, setMessages] = useState<(object | undefined)[]>();
  const [newMessage, setNewMessage] = useState<object>();

  const userId = safeJsonParse(user)?.id;

  const messagesEndRef = useRef(null);

  const handleSubmit = async (message: string, userId: string) => {
    if (message.trim() !== "") {
      const messageObj = { text: message, sender: userId, room: roomId };
      emit(SocketConsts.SEND_MESSAGE, messageObj);
      await addMessageToRoom(roomId, userId, message);
    }
  };

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    async function fetchData(roomId: string) {
      if (roomId && typeof roomId !== "undefined") {
        const response = await getRoomMessages(roomId);
        const result = await response.json();
        setMessages(result);
      }
    }
    fetchData(roomId);
  }, [roomId]);

  useEffect(() => {
    if (newMessage === undefined) return;

    if (messages?.length > 0)
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    else setMessages([newMessage]);
  }, [newMessage]);

  return (
    <div className="chatbox">
      <div className="chat-show">
        <ChatMessages messages={messages} userId={userId} />
        <div ref={messagesEndRef} />
      </div>
      <div className="chat-write">
        <ChatForm handleSubmit={handleSubmit} userId={userId} />
      </div>
    </div>
  );
}

export default ChatRoom;
