import { messageEvents } from "./message.js";

export const getHandlers = (socket, io) => [
    ...messageEvents(socket, io)
]