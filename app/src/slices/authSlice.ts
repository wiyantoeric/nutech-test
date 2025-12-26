import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';
import type { User } from '~/src/features/auth/services/userService';

export interface AuthState {
    token: string | null;
    user: User | null;
    isAuthenticated: boolean;
}

const isTokenValid = (token: string | null): boolean => {
    if (!token) return false;

    try {
        const decoded: { exp: number } = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        return decoded.exp > currentTime;
    } catch {
        return false;
    }
};

const getToken = (): string | null => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('token');
    }

    return null;
}

const token = getToken();

const authSlice = createSlice({
    name: 'auth',
    initialState: <AuthState>{
        token: isTokenValid(token) ? token : null,
        isAuthenticated: isTokenValid(token),
    },
    reducers: {
        setCredentials: (state, action: PayloadAction<{ token: string }>) => {
            state.token = action.payload.token;
            state.isAuthenticated = true;
            if (typeof window !== 'undefined') {
                localStorage.setItem('token', action.payload.token);
            }
        },
        logout: (state) => {
            state.token = null;
            state.isAuthenticated = false;
            if (typeof window !== 'undefined') {
                localStorage.removeItem('token');
            }
        },
        setUser: (state, action: PayloadAction<{ user: User }>) => {
            state.user = action.payload.user;
            state.isAuthenticated = true;
        }
    },
});

export const { setCredentials, logout, setUser } = authSlice.actions;
export default authSlice.reducer;