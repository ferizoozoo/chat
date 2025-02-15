import Cache from "../../shared/cache.js";
import { EventsConsts } from "../../shared/constants.js";

export const userEvents = (socket, io) => [
    {
        event: EventsConsts.GET_ONLINE_USERS,
        handler: (data) => {
            const connectedSockets = Array.from(io.sockets.sockets.keys());
            io.emit(EventsConsts.SET_ONLINE_USERS, connectedSockets);
        },
    },
    {
        event: EventsConsts.ADD_USER,
        handler: (data) => {
            const { userId } = data;
            Cache.getOrCreateInstance().set(userId, socket.id);
            socket.emit(EventsConsts.ADD_USER, {
                message: `User ${userId} connected to the socket server`
            });
            console.log(Cache.getOrCreateInstance().get(userId))
        }
    }
]