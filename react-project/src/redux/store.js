// 23-11-14 09:05 임휘훈 작성
import { configureStore } from "@reduxjs/toolkit";
import sessionSlice from "./reducers/sessionSlice";

export default configureStore({
    reducer : {
        session : sessionSlice
    }
})