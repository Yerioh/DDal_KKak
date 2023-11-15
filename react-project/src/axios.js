// 23-11-15 오후 14:30 박지훈 작성
import axios from 'axios';

const instance = axios.create({
    baseURL : "http://localhost:3001"
});


export default instance;