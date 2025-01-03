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
            console.log('connection made!')
            
            this.#registerListeners(socket, this.io);

            socket.on('disconnect', () => {
                console.log(`user ${socket.id} disconnected`)
            })
        });    
    }

    #registerListeners(socket, io) {
        const listeners = getHandlers(socket, io);
        listeners.forEach(listener => {
            socket.on(listener.event, listener.handler);
        })
    }
}