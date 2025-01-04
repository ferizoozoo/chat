import { EventsConsts } from "../../shared/constants.js";

export const messageEvents = (socket, io) => [
    {
        event: EventsConsts.SEND_MESSAGE,
        handler: (data) => {
            io.emit(EventsConsts.GET_MESSAGE, data)
        },
    },
    {
        event: EventsConsts.GET_MESSAGE,
        handler: (data) => {
            // socket.emit(EventsConsts.GET_MESSAGE, data)
        }
    }
]