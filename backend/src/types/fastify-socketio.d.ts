import 'fastify'
import {Server as SocketIoServer} from 'socket.io'

declare module 'fastify'{
    interface FastifyInstance{
        io: SocketIoServer
    }
}