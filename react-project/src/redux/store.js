// 23-11-14 09:05 임휘훈 작성
import { configureStore } from "@reduxjs/toolkit";
import sessionSlice from "./reducers/sessionSlice";
import progressSlice from "./reducers/progressSlice";

export default configureStore({
    reducer : {
        session : sessionSlice,
        progress : progressSlice
    }
})