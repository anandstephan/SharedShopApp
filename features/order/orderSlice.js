import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { database } from '../../Config';

const initialState = {
  loading: false,
  orders: [],
  error: ''
};

export const fetchOrders = createAsyncThunk('product/fetchOrders', async (_, { rejectWithValue }) => {
  try {
    const snapshot = await database.ref('orders').once('value');
    return snapshot.val();
  } catch (error) {
    return rejectWithValue(error.message);
  }
});



export const startRealtimeUpdates = () => (dispatch) => {
  const ordersRef = database.ref('orders');

  ordersRef.on('value', (snapshot) => {
    const orders = snapshot.val();
   const newOrders= Object.keys(orders).map(item => {
    return {[item]:orders[item]} 
  })
    dispatch(setOrders(newOrders));
  });
};

const orderslice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setOrders(state, action) {
      state.orders = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOrders.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.loading = false;
      state.orders = action.payload;
      state.error = '';
    });
    builder.addCase(fetchOrders.rejected, (state, action) => {
      state.loading = false;
      state.orders = [];
      state.error = action.payload;
    });
  }
});

export const { setOrders } = orderslice.actions;

export default orderslice.reducer;
