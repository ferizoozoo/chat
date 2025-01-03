import { messageEvents } from "./message.js";
import { roomEvents } from "./room.js";

export const getHandlers = (socket, io) => [
    ...messageEvents(socket, io),
    ...roomEvents(socket, io),
]