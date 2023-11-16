// 23-11-14 09:00 임휘훈 작성
import { createSlice } from "@reduxjs/toolkit"

export const sessionSlice = createSlice({
    name : "session",
    initialState : {
        name : null,
        isLogin : false,
        loginType : null,
        id : null
    },
    reducers : {
        login : (state) => { // 로그인 함
            state.isLogin = true
        },
        logout : (state) => { // 로그아웃 함
            state.isLogin = false
        },
        sessionName : (state, action) => { // 입력받은 이름
            state.name = action.payload
        },
        sessionLoginType : (state, action) => { // 로그인 타입 M, G, K, N
            state.loginType = action.payload
        },
        sessionID : (state, action) => { // 회원 ID
            state.id = action.payload
        }
    }
})


// 컴포넌트에서 reducer 함수를사용할 수 있게 내보내기
export const SessionReducerActions = sessionSlice.actions

// store.js에서 접근할 수 있도록 내보내기
export default sessionSlice.reducer