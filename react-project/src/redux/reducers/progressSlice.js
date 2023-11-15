import { createSlice } from "@reduxjs/toolkit";

export const progressSlice = createSlice({
    name : 'progress',
    initialState : {
        progress : 0,
        isLoading : false
    },
    reducers : {
        startProgress:(state, action)=>{
            state.progress = Math.round(action.payload)
            state.isLoading = true
        },
        endProgress:(state)=>{
            state.progress = 100
            state.isLoading = false
        },
        resetProgress:(state)=>{
            state.progress = 0
            state.isLoading = false
        }

    }
})


export const ProgressReducerActions = progressSlice.actions

export default progressSlice.reducer