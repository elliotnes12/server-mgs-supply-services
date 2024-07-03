
export function createSocket(io) {
    return () => {
        io.sockets.on("connection", (socket) => {
            console.log("Usuario conectado");

            socket.on("disconnect", () => {
                console.log("Usuario desconectado");
            });

            socket.on("subscribe", (room) => {
                console.log(`Suscrito a la sala: ${room}`);
                socket.join(room);
            });

            socket.on("unsubscribe", (room) => {
                console.log(`No suscrito a la sala: ${room}`);
                socket.leave(room);
            });
        });
    };
}
