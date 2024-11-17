import { SERVER_URL } from "./base";

const ROOM_ROUTE = SERVER_URL + 'rooms/'

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

export async function getUserRooms(userId: String) {
    return await fetch(ROOM_ROUTE + userId); 
}

export async function getAvailableRooms() {
    return await fetch(ROOM_ROUTE); 
}