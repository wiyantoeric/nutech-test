import { configureStore } from '@reduxjs/toolkit'
import accountReducer from './providers/accountSlice';
import authReducer from './providers/authSlice';
import servicesReducer from './providers/servicesSlice';
import walletReducer from './providers/walletSlice';

export const store = configureStore({
    reducer: {
        account: accountReducer,
        auth: authReducer,
        services: servicesReducer,
        wallet: walletReducer,
    }
})

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;