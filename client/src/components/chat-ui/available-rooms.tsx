import { useEffect, useState } from "react";
import { getAvailableRooms } from "../../apis/room";

import "../../assets/styles/chat-ui/available-rooms.css";

function AvailableRooms({
  handleSelectRoom,
}: {
  handleSelectRoom: (selectedRoomId: string) => void;
}) {
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
      </ul>
    </div>
  );
}

export default AvailableRooms;
