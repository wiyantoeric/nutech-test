import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { getServices, type Service } from '~/src/features/app/services/serviceService';

interface ServicesState {
    items: Service[];
    loading: boolean;
}

const initialState: ServicesState = {
    items: [],
    loading: false,
};

export const fetchServices = createAsyncThunk<Service[]>(
    'services/fetchAll',
    async () => {
        const response = await getServices();
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
            .addCase(fetchServices.fulfilled, (state, action: PayloadAction<Service[]>) => {
                state.items = action.payload;
                state.loading = false;
            });
    },
});

export default servicesSlice.reducer;
