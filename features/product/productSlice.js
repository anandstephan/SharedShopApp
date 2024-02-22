import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { database } from '../../Config';

const initialState = {
  loading: false,
  products: [],
  error: ''
};

export const fetchProducts = createAsyncThunk('product/fetchProducts', async (_, { rejectWithValue }) => {
  try {
    const snapshot = await database.ref('products').once('value');
    return snapshot.val();
  } catch (error) {
    return rejectWithValue(error.message);
  }
});



export const startRealtimeUpdates = () => (dispatch) => {
  const productsRef = database.ref('products');

  productsRef.on('value', (snapshot) => {
    const products = snapshot.val();
   const newProducts= Object.keys(products).map(item => {
    return {[item]:products[item]} 
  })
  // console.log(newProducts)

    dispatch(setProducts(newProducts));
  });
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
      state.error = '';
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.products = [];
      state.error = action.payload;
    });
  }
});

export const { setProducts } = productSlice.actions;

export default productSlice.reducer;
