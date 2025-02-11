import { useEffect, useState } from "react";
import AvailableRooms from "./available-rooms";
import ChatRoom from "./chat-room";
import "../../assets/styles/chat-ui/chat.css";
import Modal from "../../components/common/modal";
import useSocket from "../../hooks/useSocket";
import { SocketConsts } from "../../shared/constants";
import { createRoom } from "../../apis/room";

function Chat() {
  const [onlineUserIds, setOnlineUserIds] = useState([]);
  const [members, setMembers] = useState([]);
  const [selectedRoomId, setSelectedRoomId] = useState<string>();
  const [isSelectUsersForRoomModalOpen, setIsSelectUsersForRoomModalOpen] =
    useState<boolean>(false);

  const { emit } = useSocket(SocketConsts.SET_ONLINE_USERS, (data) => {
    setOnlineUserIds(data);
  });

  const handleSelectRoom = (id: string) => {
    setSelectedRoomId(id);
  };

  const handleOpenSelectUsers = () => {
    emit(SocketConsts.GET_ONLINE_USERS, {});
    setIsSelectUsersForRoomModalOpen(true);
  };

  const handleCreateRoom = () => {
    setIsSelectUsersForRoomModalOpen(false);
    createRoom(members);
  };

  const addMembers = (member) => {
    setMembers([...members, member]);
  };

  return (
    <div className="layout">
      <Modal
        onClose={() => setIsSelectUsersForRoomModalOpen(false)}
        isOpen={isSelectUsersForRoomModalOpen}
        hasCloseButton={false}
      >
        <form className="modal-form" onSubmit={handleCreateRoom}>
          <label className="modal-label">Select a room</label>
          <select
            name="room"
            className="modal-form-selector"
            onChange={(e) => addMembers(e.target.value)}
          >
            {onlineUserIds?.map((onlineUserId, index) => (
              <option value={onlineUserId} key={index}>
                {onlineUserId}
              </option>
            ))}
          </select>
          <input className="modal-form-button" type="submit" />
        </form>
      </Modal>

      <AvailableRooms
        handleSelectRoom={handleSelectRoom}
        handleOpenSelectUsers={handleOpenSelectUsers}
      />
      <ChatRoom roomId={selectedRoomId} />
    </div>
  );
}

export default Chat;
