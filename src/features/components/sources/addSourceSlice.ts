import {createSlice} from "@reduxjs/toolkit";
import {Source} from "../../../dto/sources/source.ts";

interface InitialState {
    open: boolean,
    mode: string,
    source: Source | null
}

const initialState: InitialState = {
    open: false,
    mode: "add",
    source: null
}

const addSourceSlice = createSlice({
    name: 'addSource',
    initialState,
    reducers: {
        open: (state, action) => {
            const {mode, source} = action.payload;
            state.mode = mode;
            state.open = true;
            state.source = source;
        },
        close: (state) => {
            state.open = false;
        }
    }
})

export const addSourceSliceActions =addSourceSlice.actions

export default addSourceSlice.reducer