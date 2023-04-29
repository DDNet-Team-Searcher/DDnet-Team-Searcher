import { JwtService } from '@nestjs/jwt';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { NestGateway } from '@nestjs/websockets/interfaces/nest-gateway.interface';
import { Server, Socket } from 'socket.io';
import { Protected } from 'src/decorators/protected.decorator';
import { WSAuthMiddleware } from 'src/middlewares/ws-auth.middleware';

@WebSocketGateway({
    cors: {
        origin: 'http://localhost:3000',
        credentials: true,
    },
})
@Protected()
export class WebsocketsGateway implements NestGateway {
    @WebSocketServer()
    server: Server;
    users: Map<number, string> = new Map();

    constructor(private readonly jwtService: JwtService) {}

    afterInit(server: Server) {
        const middleware = WSAuthMiddleware(this.jwtService);
        server.use(middleware);
    }

    handleConnection(client: Socket) {
        //@ts-ignore
        this.users.set(client.user.id, client.id);
    }

    handleDisconnect(client: Socket) {
        //@ts-ignore
        this.users.delete(client.user.id);
    }

    sendNotification(userId: number, notification: Object) {
        this.server
            .to(this.users.get(userId))
            .emit('notification', notification);
    }
}
