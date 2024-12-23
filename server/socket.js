const { Server } = require("socket.io");

export class SocketServer {
    #listeners = [];

    constructor(server) {
        this.io = new Server(server)
    }

    start() {
        this.io.on('connection', socket => {
            this.#listeners.forEach(({ event, handler }) => {
                socket.on(event, handler)
            })
        });    
    }

    registerListener({ event, handler }) {
        this.#listeners.push({ event, handler })
    }
}