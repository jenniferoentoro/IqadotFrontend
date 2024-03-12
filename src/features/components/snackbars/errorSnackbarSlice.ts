import { createSlice } from "@reduxjs/toolkit";

interface InitialState{
    open: boolean,
    text: string
}

const initialState: InitialState = {
    open: false,
    text: ""
}

const errorSnackbarSlice = createSlice({
    name: 'errorSnackbar',
    initialState,
    reducers: {
        setOpen: (state, action) => {
            const {text} = action.payload;
            state.open = true;
            state.text = text;
        },
        setClose: (state) => {
            state.open = false;
        }
    }
});

export const errorSnackbarSliceActions = errorSnackbarSlice.actions;

export default errorSnackbarSlice.reducer;