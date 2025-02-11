import { EventsConsts } from "../../shared/constants.js";

export const userEvents = (socket, io) => [
    {
        event: EventsConsts.GET_ONLINE_USERS,
        handler: (data) => {
            const connectedSockets = Array.from(io.sockets.sockets.keys());
            io.emit(EventsConsts.SET_ONLINE_USERS, connectedSockets);
        }
    },
]