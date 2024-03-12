import {createSlice} from "@reduxjs/toolkit";

interface InitialState{
    open: boolean
}

const initialState: InitialState = {
    open: false
}

const customBackdropSlice = createSlice({
    name: 'customBackdrop',
    initialState,
    reducers: {
        open: (state) => {
            state.open = true
        },
        close: (state) => {
            state.open = false
        }
    }
})

export const customBackdropSliceActions = customBackdropSlice.actions;

export default customBackdropSlice.reducer;