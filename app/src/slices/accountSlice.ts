import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface AccountState {
    isEditing: boolean;
}

const accountSlice = createSlice({
    name: 'account',
    initialState: <AccountState>{
        isEditing: false,
    },
    reducers: {
        toggleEditMode: (state) => {
            state.isEditing = !state.isEditing;
        },
    },
});

export const { toggleEditMode } = accountSlice.actions;
export default accountSlice.reducer;