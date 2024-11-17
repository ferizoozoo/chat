import { SERVER_URL } from "./base";

const ROOM_ROUTE = SERVER_URL + 'messages/'

export async function addMessageToRoom(roomId: String, userId: String, message: String) {
    return await fetch(ROOM_ROUTE + roomId, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId,
            text: message,
        }) 
    })
}

export async function getMessage(messageId: String) {
    return await fetch(ROOM_ROUTE + messageId); 
}