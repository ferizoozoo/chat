import { useState } from "react";
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
  const [isRoomCreated, setIsRoomCreated] = useState<boolean>(false);
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

  const handleCreateRoom = (e) => {
    e.preventDefault();

    const form = new FormData(e.target);
    const title = form.get("title") as string;

    setIsSelectUsersForRoomModalOpen(false);
    createRoom(title, members);
    setIsRoomCreated(true);
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
          <label htmlFor="room-title">Room title</label>
          <input
            name="title"
            id="room-title"
            className="modal-form-input"
            type="text"
          />
          <label className="modal-label">Select people to create a room</label>
          <select
            multiple
            name="room"
            className="modal-form-selector"
            value={members}
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
        <div>
          {members?.map((member, index) => (
            <div key={index}>{member}</div>
          ))}
        </div>
      </Modal>

      <AvailableRooms
        handleSelectRoom={handleSelectRoom}
        handleOpenSelectUsers={handleOpenSelectUsers}
        isRoomCreated={isRoomCreated}
      />
      <ChatRoom roomId={selectedRoomId} />
    </div>
  );
}

export default Chat;
