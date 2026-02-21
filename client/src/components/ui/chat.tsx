import { useState } from "react";
import AvailableRooms from "./available-rooms";
import ChatRoom from "./chat-room";
import "../../assets/styles/chat-ui/chat.css";
import Modal from "../../components/common/modal";
import useSocket from "../../hooks/useSocket";
import { SocketConsts } from "../../shared/constants";
import { createRoom } from "../../apis/room";
import { HamburgerIcon } from "../../components/common/hamburger";
import Hamburger from "../../components/common/hamburger";

function Chat() {
  const [onlineUserIds, setOnlineUserIds] = useState<string[]>([]);
  const [members, setMembers] = useState<string[]>([]);
  const [selectedRoomId, setSelectedRoomId] = useState<string | undefined>();
  const [isRoomCreated, setIsRoomCreated] = useState<boolean>(false);
  const [isSelectUsersForRoomModalOpen, setIsSelectUsersForRoomModalOpen] =
    useState<boolean>(false);
  // desktop visibility (true = visible). Mobile uses Hamburger for overlay.
  const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>(true);

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

  const handleCreateRoom = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget as HTMLFormElement);
    const title = String(form.get("title") || "");

    setIsSelectUsersForRoomModalOpen(false);
    createRoom(title, members);
    setIsRoomCreated(true);
  };

  const addMembers = (member: string) => {
    setMembers([...members, member]);
  };

  return (
    <>
      {/* Mobile: Hamburger menu with sidebar */}
      <Hamburger
        onClose={() => {
          /* menu closes automatically */
        }}
      >
        <AvailableRooms
          visible={true}
          onToggleVisibility={() => {
            /* close hamburger by clicking button inside menu */
          }}
          handleSelectRoom={(id) => {
            handleSelectRoom(id);
          }}
          handleOpenSelectUsers={handleOpenSelectUsers}
          isRoomCreated={isRoomCreated}
          onCloseSidebar={() => {
            /* handled by Hamburger overlay click */
          }}
        />
      </Hamburger>

      {/* Desktop: Sidebar with HamburgerIcon toggle */}
      <div className="layout">
        {/* global toggle shown when sidebar is hidden (desktop) */}
        {!isSidebarVisible && (
          <HamburgerIcon
            onClick={() => setIsSidebarVisible(true)}
            ariaLabel="Show sidebar"
            className="sidebar-toggle-button"
          />
        )}
        <div
          className={`available-rooms-wrapper ${
            !isSidebarVisible ? "hidden" : ""
          }`}
        >
          <AvailableRooms
            visible={isSidebarVisible}
            onToggleVisibility={() => setIsSidebarVisible((s) => !s)}
            handleSelectRoom={(id) => {
              handleSelectRoom(id);
            }}
            handleOpenSelectUsers={handleOpenSelectUsers}
            isRoomCreated={isRoomCreated}
            onCloseSidebar={() => {
              /* handled by sidebar visibility toggle */
            }}
          />
        </div>

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
            <label className="modal-label">
              Select people to create a room
            </label>
            <select
              multiple
              name="room"
              className="modal-form-selector"
              value={members}
              onChange={(e) =>
                addMembers((e.target as HTMLSelectElement).value)
              }
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

        <ChatRoom roomId={selectedRoomId} />
      </div>
    </>
  );
}

export default Chat;
