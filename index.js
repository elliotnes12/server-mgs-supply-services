import {server} from './app.js';
import { createSocket } from './utils/Socket.js';
import { PORT } from './utils/constants.js';
import { connectDB, io } from './utils/index.js';

server.listen(PORT,() =>{
    
    connectDB(createSocket(io));
});