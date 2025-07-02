import io from 'socket.io-client'
import { BASE_URL } from './constant';



export function createSocketConnection() {
    return io(BASE_URL)
}