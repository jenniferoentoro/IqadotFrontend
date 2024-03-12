import { createSlice } from '@reduxjs/toolkit'

interface InitialState{
    opened: boolean,
    selectedIndex: number
}

const initialState: InitialState = {
    opened: false,
    selectedIndex: 0
}

const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
        toggleOpened: (state) => {
            state.opened = !state.opened;
        },
        setSelectedIndex: (state, action) => {
            const {selectedIndex} = action.payload;
            state.selectedIndex = selectedIndex;
        }
    }
});

export const sidebarActions = sidebarSlice.actions

export default sidebarSlice.reducer