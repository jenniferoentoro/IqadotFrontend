import {createSlice} from "@reduxjs/toolkit";

interface InitialState {
    open: boolean
}

const initialState: InitialState = {
    open: false
}

const csvHelperSlice = createSlice({
    name: 'csvHelper',
    initialState,
    reducers: {
        open: (state) => {
            state.open = true;
        },
        close: (state) => {
            state.open = false;
        }
    }
})

export const csvHelperSliceActions = csvHelperSlice.actions;

export default csvHelperSlice.reducer