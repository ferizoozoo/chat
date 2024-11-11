import { SERVER_URL } from "./base";

const ROOM_ROUTE = SERVER_URL + 'room/'

export async function addMessageToRoom(roomId: String, userId: String, message: String) {
    return await fetch(ROOM_ROUTE + roomId, {
        method: 'POST',
        body: {
            userId,
            text: message
        } 
    })
}

export async function getMessage(messageId: String) {
    return await fetch(ROOM_ROUTE + messageId); 
}