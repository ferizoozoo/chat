import { EventsConsts } from "../../shared/constants.js";

export const messageEvents = (socket, io) => [
    {
        event: EventsConsts.SEND_MESSAGE,
        handler: (data) => {
            socket.emit(EventsConsts.SEND_MESSAGE, data)
        }
    }
]