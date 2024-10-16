import Message from "../models/message.js";

export async function addMessage(msg) {
    const [ sender, text, room ] = msg;
    const message = new Message({
        sender,
        text,
        room
    });
    await message.save();
}

export async function getMessage(msgId) {
    return await Message.find({ _id: msgId });
}