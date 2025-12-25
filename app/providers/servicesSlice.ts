// app/providers/servicesSlice.ts
import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { getServices, type Service } from '~/services/assets/services';

// Define the state to be safe for initial renders
interface ServicesState {
    items: Service[]; // Keep this as an array to avoid .map() errors in UI
    loading: boolean;
}

const initialState: ServicesState = {
    items: [],
    loading: false,
};

// 1. Explicitly type the Thunk return as Service[]
export const fetchServices = createAsyncThunk<Service[]>(
    'services/fetchAll',
    async () => {
        const response = await getServices();
        // 2. Guarantee an array return even if the API returns null
        return response.data.data || [];
    }
);

const servicesSlice = createSlice({
    name: 'services',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchServices.pending, (state) => {
                state.loading = true;
            })
            // 3. Match the PayloadAction type exactly to the Thunk return
            .addCase(fetchServices.fulfilled, (state, action: PayloadAction<Service[]>) => {
                state.items = action.payload;
                state.loading = false;
            });
    },
});

// export const { setBalance, toggleShowBalance } = servicesSlice.actions;
export default servicesSlice.reducer;