// 23-11-15 오후 14:30 박지훈 작성
import axios from 'axios';
import store from './redux/store'
import {ProgressReducerActions} from './redux/reducers/progressSlice'

const instance = axios.create({
    baseURL : "http://localhost:3001"
});

// instance.defaults.timeout = 3000

// Progress, timer
let progress = 0
let timerId = null

const setProgress = (value)=>{
    progress = value
    store.dispatch(ProgressReducerActions.startProgress(value))
    if(value === 100){
        setTimeout(()=>store.dispatch(ProgressReducerActions.endProgress()), 1000)
        setTimeout(()=>store.dispatch(ProgressReducerActions.resetProgress()), 5000)
    }
}

const timer = ()=>{
    if (progress < 100){
        const diff = 100 - progress
        const inc = diff / (10+progress * (1+progress / 100)) // progress 증가 값
        setProgress(progress + inc)
    }
    timerId = setTimeout(timer, 200) // 50ms 단위로 timer 재귀호출
}




instance.interceptors.request.use((config)=>{
    setProgress(0)
    timer()
    return config
},
(err)=>{
    console.log('요청 에러 발생')
    store.dispatch(ProgressReducerActions.resetProgress())
    return Promise.reject(err)
})

instance.interceptors.response.use((response)=>{
    if(timerId){
        clearTimeout(timerId)
        timerId = null
    }
    setProgress(100)
    return response
},
(err)=>{
    console.log('응답 에러 발생',err)
    store.dispatch(ProgressReducerActions.resetProgress())
    return Promise.reject(err)
})




export default instance;