import { messageEvents } from "./message.js";
import { roomEvents } from "./room.js";
import { userEvents } from "./user.js";

export const getHandlers = (socket, io) => [
    ...messageEvents(socket, io),
    ...roomEvents(socket, io),
    ...userEvents(socket, io),
]