import { createSlice } from '@reduxjs/toolkit';

interface User {
    user: string
}

interface AuthState{
    user: User | null;
    token: string | null;
}

const initialState: AuthState = {
    user : null,
    token: localStorage.getItem('token'),
};

const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers: {
        setCredentials : (state, action) => {
            state.user = action.payload;
        },
        clearCredentials : (state) => {
            state.user = null;
            state.token = null;
        }

    }
});

export const { setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;
