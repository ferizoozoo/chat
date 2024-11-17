import { useEffect, useState } from "react";
import { getAvailableRooms } from "../../apis/room";

import "../../assets/styles/chat-ui/available-rooms.css";

function AvailableRooms({
  handleSelectRoom,
}: {
  handleSelectRoom: (selectedRoomId: string) => void;
}) {
  const [rooms, setRooms] = useState();

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
            <li key={index} onClick={() => handleSelectRoom(room._id)}>
              <div className="room">
                <div className="room-name-box">
                  <p>{room.title}</p>
                </div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default AvailableRooms;
