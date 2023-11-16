// 23-11-15 오후 14:30 박지훈 작성
import axios from 'axios';
import store from './redux/store'
import {ProgressReducerActions} from './redux/reducers/progressSlice'

// axios 인스턴스 생성
const instance = axios.create({
    baseURL : "http://localhost:3001"
});

// 3초 내로 응답이 오지 않는다면 timeout이 발생하지 않는다.
// 만약 내 프로젝트에서 기본적으로 axios 통신이 오래걸린다면 timeout을 늘려주어야 한다.
// instance.defaults.timeout = 3000

// progress 진행율을 저장할 변수
let progress = 0
// timer 함수의 시작과 중단을 제어 하기위한 변수
let timerId = null

// Progress 값을 변경해주는 함수
const setProgress = (value)=>{
    progress = value
    store.dispatch(ProgressReducerActions.startProgress(value))
    // progress가 100이되면 1초 후에 endProgress() aciton 실행
    // 5초 후에 resetProgress() action 실행
    if(value === 100){
        setTimeout(()=>store.dispatch(ProgressReducerActions.endProgress()), 1000)
    }
}

// timer 함수
// Progress 값을 0부터100까지 증가시켜주는 역할
const timer = ()=>{
    if (progress < 100){
        const diff = 100 - progress
        const inc = diff / (10+progress * (1+progress / 100)) // progress 증가 값
        setProgress(progress + inc)
    }
    timerId = setTimeout(timer, 200) // 50ms 단위로 timer 재귀호출
}

// axios 통신 중, 요청을 가로채서 timer가 작동
instance.interceptors.request.use((config)=>{
    setProgress(0)
    setTimeout(timer(), 3000)
    return config
},
(err)=>{
    console.log('요청 에러 발생')
    store.dispatch(ProgressReducerActions.resetProgress())
    return Promise.reject(err)
})

// axios 통신 중, 응답을 가로채서 timer 종료
instance.interceptors.response.use((response)=>{
    if(timerId){
        clearTimeout(timerId)
        timerId = null
    }
    // axios 에러 발생시 응답 interceptors 정지
    if(response.data.createError){
        return response
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