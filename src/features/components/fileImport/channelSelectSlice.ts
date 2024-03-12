import {createSlice} from "@reduxjs/toolkit";

interface InitialState{
    channel: string
}

const initialState: InitialState = {
    channel: "label"
}

const channelSelectSlice = createSlice({
    name: 'channelSelect',
    initialState,
    reducers: {
        setSelected: (state, action) => {
            const {channel} = action.payload;
            state.channel = channel
        },
        reset: (state) => {
            state.channel = "label"
        }
    }
})

export const channelSelectSliceActions = channelSelectSlice.actions

export default channelSelectSlice.reducer