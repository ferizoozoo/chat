import Message from "../models/message.js";
import Room from "../models/room.js";

export async function getRoomMessages(roomId) {
    return await Message.find({ room: roomId });
}

export async function createRoom(members) {
    const room = new Room({
        members
    });
    await room.save();
}