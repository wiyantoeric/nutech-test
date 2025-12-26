import { configureStore } from '@reduxjs/toolkit'
import accountReducer from './src/slices/accountSlice';
import authReducer from './src/slices/authSlice';
import servicesReducer from './src/slices/servicesSlice';
import walletReducer from './src/slices/walletSlice';

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