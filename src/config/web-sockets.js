import { io } from 'socket.io-client';

// Strapi + Socket.IO server. Set REACT_APP_SERVER_URL for deployed builds.
export const SERVER_URL = (process.env.REACT_APP_SERVER_URL || 'http://localhost:1337').replace(/\/$/, '');

export const socket = io(SERVER_URL, {
    transports: ['websocket', 'polling'],
    reconnectionDelayMax: 10000,
});
