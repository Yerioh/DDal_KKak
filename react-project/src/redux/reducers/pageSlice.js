import { createSlice } from "@reduxjs/toolkit";

export const pageSlice = createSlice({
    name : 'page',
    initialState : {
        isChoice : false
    },
    reducers : {
        choice : (state) => {
            state.isChoice = true
        },
        endChoice : (state) => {
            state.isChoice = false
        }
    }
})

export const ChoiceReducerActions = pageSlice.actions

export default pageSlice.reducer