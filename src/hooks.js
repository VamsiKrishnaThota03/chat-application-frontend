import { useEffect, useState } from 'react';
import { socket } from './config/web-sockets';

/** Tracks whether the Socket.IO connection is up. */
export function useSocketConnected() {
    const [connected, setConnected] = useState(socket.connected);
    useEffect(() => {
        const up = () => setConnected(true);
        const down = () => setConnected(false);
        socket.on('connect', up);
        socket.on('disconnect', down);
        socket.on('connect_error', down);
        return () => {
            socket.off('connect', up);
            socket.off('disconnect', down);
            socket.off('connect_error', down);
        };
    }, []);
    return connected;
}
