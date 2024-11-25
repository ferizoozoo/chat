import { useEffect, useRef, useState } from "react";
import "../../assets/styles/chat-ui/chat-room.css";
import ChatMessages from "./chat-messages";
import ChatForm from "./chat-form";
import { getRoomMessages } from "../../apis/room";
import { addMessageToRoom } from "../../apis/message";
import useLocalStorage from "../../hooks/useLocalStorage";
import { LocalStorageConsts } from "../../shared/constants";

function ChatRoom({ roomId }) {
  const [user, _] = useLocalStorage(LocalStorageConsts.USER);
  const [messages, setMessages] = useState<object[]>();

  const userId = JSON.parse(user)?.id;

  const messagesEndRef = useRef(null);

  const handleSubmit = async (message: String) => {
    if (message.trim() !== "") {
      setMessages((messages) => [
        ...messages,
        { text: message, sender: userId },
      ]);
      await addMessageToRoom(roomId, userId, message);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    async function fetchData(roomId: String) {
      if (roomId) {
        const response = await getRoomMessages(roomId);
        const result = await response.json();
        setMessages(result);
      }
    }
    fetchData(roomId);
  }, [roomId]);

  return (
    <div className="chatbox">
      <div className="chat-show">
        <ChatMessages messages={messages} userId={userId} />
        <div ref={messagesEndRef} />
      </div>
      <div className="chat-write">
        <ChatForm handleSubmit={handleSubmit} />
      </div>
    </div>
  );
}

export default ChatRoom;
