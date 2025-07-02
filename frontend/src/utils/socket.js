import io from 'socket.io-client'
import { BASE_URL } from './constant';



export function createSocketConnection() {
    if (location.hostname === "localhost") {
        return io(BASE_URL)
    }
    else {
        return io("https://devmatching.faisalkhandev.com", {
            path: "/socket.io",
            transports: ["websocket"]
        });
    }
}