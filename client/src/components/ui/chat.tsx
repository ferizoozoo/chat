import { useState } from "react";
import AvailableRooms from "./available-rooms";
import ChatRoom from "./chat-room";
import "../../assets/styles/chat-ui/chat.css";

function Chat() {
  const [selectedRoomId, setSelectedRoomId] = useState<string>();

  const handleSelectRoom = (id: string) => {
    setSelectedRoomId(id);
  };

  return (
    <div className="layout">
      <AvailableRooms handleSelectRoom={handleSelectRoom} />
      <ChatRoom roomId={selectedRoomId} />
    </div>
  );
}

export default Chat;
