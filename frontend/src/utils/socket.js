import io from 'socket.io-client';
import { BASE_URL } from './constant';

export function createSocketConnection() {
    if (location.hostname === "localhost") {
        return io(BASE_URL, {
            transports: ["websocket"],
        });
    } else {
        return io("/", {
            path: "/socket.io",
            transports: ["websocket"],
        });
    }
}
