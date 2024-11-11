import { SERVER_URL } from "./base";

const ROOM_ROUTE = SERVER_URL + 'room/'

export async function createRoom(memberIds: String[]) {
    return await fetch(ROOM_ROUTE, {
        method: 'POST',
        body: {
            memberIds,
        } 
    })
}

export async function getRoomMessages(roomId: String) {
    return await fetch(ROOM_ROUTE + roomId); 
}