import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { default as axios } from 'axios';
import { RootState } from '../store';

type FetchPizzasRgs = Record<string, string>;

type Pizza = {
	id: number;
	title: string;
	price: number;
	imageUrl: string;
	sizes: number[];
	types: number[];
};
export const fetchPizzas = createAsyncThunk(
	'pizza/fetchPizzasStatus',
	async (params: FetchPizzasRgs) => {
		const { sorBy, order, category, search, currentPage } = params;
		const { data } = await axios.get<Pizza[]>(
			`https://63be7d1df5cfc0949b58980f.mockapi.io/item?page=${currentPage}&limit=4&${category}&sortBy=${sorBy}&order=${order}${search}`
		);
		return data as Pizza[];
	}
);

interface PizzaSliceState {
	items: Pizza[];
	status: Status;
}

export enum Status {
	LOADING = 'loading',
	SUCCESS = 'success',
	ERROR = 'error'
}

const initialState: PizzaSliceState = {
	items: [],
	status: Status.LOADING //loading | success | error
};
const pizzaSlice = createSlice({
	name: 'pizza',
	initialState,
	reducers: {
		setItems(state, action: PayloadAction<Pizza[]>) {
			state.items = action.payload;
		}
	},
	extraReducers: builder => {
		builder.addCase(fetchPizzas.pending, (state, action) => {
			state.status = Status.LOADING;
			state.items = [];
		});
		builder.addCase(fetchPizzas.fulfilled, (state, action) => {
			state.items = action.payload;
			state.status = Status.SUCCESS;
		});
		builder.addCase(fetchPizzas.rejected, (state, action) => {
			state.status = Status.ERROR;
			state.items = [];
		});
	}
});
export const selectPizzaData = (state: RootState) => state.pizza;

export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;
