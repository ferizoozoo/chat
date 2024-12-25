import { getHandlers } from "./events/socket/index.js";

import { Server } from 'socket.io'

export class SocketServer {
    constructor(server) {
        this.io = new Server(server, {
            cors: {
                origin: "*", 
                methods: ["GET", "POST"],
            },
        })
    }

    start() {
        this.io.on('connection', socket => {
            this.#registerListeners(socket);
        });    
    }

    #registerListeners(socket) {
        const listeners = getHandlers(socket, this.io);
        listeners.forEach(listener => {
            this.io.on(listener.event, listener.handler);
        })
    }
}