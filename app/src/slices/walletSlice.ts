import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface WalletState {
    balance: number | null;
    showBalance: boolean;
}

const getShowBalance = (): boolean => {
    if (typeof window !== 'undefined') {
        const show = localStorage.getItem('show-balance');
        return show === 'true';
    }
    return false;
}

const walletSlice = createSlice({
    name: 'wallet',
    initialState: <WalletState>{
        balance: null,
        showBalance: getShowBalance()
    },
    reducers: {
        setBalance: (state, action: PayloadAction<number>) => {
            state.balance = action.payload;
        },
        toggleShowBalance: (state) => {
            state.showBalance = !state.showBalance;
            if (typeof window !== 'undefined') {
                localStorage.setItem('show-balance', state.showBalance.toString());
            }
        },
    },
});

export const { setBalance, toggleShowBalance } = walletSlice.actions;
export default walletSlice.reducer;
