import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
// 개발용
// const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:3001/';
// 배포용
const URL = process.env.NODE_ENV === 'production' ? undefined : process.env.REACT_APP_BASE_URL;

export const socket = io(URL,{
    autoConnect: false
});