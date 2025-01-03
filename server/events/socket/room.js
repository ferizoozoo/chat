import { EventsConsts } from "../../shared/constants.js";

export const roomEvents = (socket, io) => [
    {
        event: EventsConsts.JOIN_ROOM,
        handler: (room) => {
            socket.join(room);
        }
    },
    {
        event: EventsConsts.LEAVE_ROOM,
        handler: (room) => {
            socket.leave(room);
        }
    }
]