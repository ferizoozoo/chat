import { SERVER_URL } from "./base";

const ROOM_ROUTE = SERVER_URL + "rooms/";

export async function createRoom(title: string, members: string[]) {
  return await fetch(ROOM_ROUTE, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      members,
    }),
  });
}

export async function getRoomMessages(roomId: string) {
  return await fetch(ROOM_ROUTE + roomId);
}

export async function getUserRooms(userId: string) {
  return await fetch(ROOM_ROUTE + "user/" + userId);
}

export async function getAvailableRooms() {
  return await fetch(ROOM_ROUTE);
}
