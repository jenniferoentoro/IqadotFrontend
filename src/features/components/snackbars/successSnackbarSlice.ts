import { createSlice } from "@reduxjs/toolkit";

interface InitialState{
    open: boolean,
    text: string
}

const initialState: InitialState = {
    open: false,
    text: ""
}

const successSnackbarSlice = createSlice({
    name: 'successSnackbar',
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

export const successSnackbarSliceActions = successSnackbarSlice.actions;

export default successSnackbarSlice.reducer;