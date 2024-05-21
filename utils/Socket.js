
export function createSocket(io){
  
    return () =>{
        io.sockets.on("connection",(socket) =>{
       
            console.log("Usuario conectado");

            socket.on("disconnect",() =>{
               console.log("usuario desconectado");
            })
     
            socket.on("suscribe",(room) =>{
               socket.join(room);
            });
     
            socket.on("unsubscribe",(room) => {
               socket.leave(room);
            });
        });
    }
}