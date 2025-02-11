import { useEffect, useState } from "react";
import { getAvailableRooms } from "../../apis/room";

import "../../assets/styles/chat-ui/available-rooms.css";
import UserSection from "./user-section";
import useLocalStorage from "../../hooks/useLocalStorage";
import { LocalStorageConsts } from "../../shared/constants";

function AvailableRooms({
  handleSelectRoom,
  handleOpenSelectUsers,
}: {
  handleSelectRoom: (selectedRoomId: string) => void;
  handleOpenSelectUsers: (selectedRoomId: string) => void;
}) {
  const [user, _] = useLocalStorage(LocalStorageConsts.USER);
  const [rooms, setRooms] = useState();
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  const handleSelect = (roomId: string, index: number) => {
    handleSelectRoom(roomId);
    setSelectedIndex(index);
  };

  useEffect(() => {
    async function fetchData() {
      const response = await getAvailableRooms();
      const result = await response.json();
      setRooms(result);
    }
    fetchData();

    return () => {
      setSelectedIndex(-1);
    };
  }, []);

  return (
    <div className="available-rooms">
      <ul>
        {rooms &&
          rooms.map((room, index) => (
            <li
              key={index}
              style={{
                background:
                  selectedIndex == index ? "rgba(128, 128, 128, 0.344)" : "",
              }}
              onClick={() => handleSelect(room._id, index)}
            >
              <div className="room">
                <div
                  className="room-name-box"
                  style={{ color: selectedIndex == index ? "#e1cccc" : "" }}
                >
                  <span>{room.title}</span>
                </div>
              </div>
            </li>
          ))}
        <button className="create-room" onClick={handleOpenSelectUsers}>
          +
        </button>
      </ul>
      <UserSection />
    </div>
  );
}

export default AvailableRooms;
