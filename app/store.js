import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/product/productSlice";
import orderReducer from '../features/order/orderSlice'
import userReducer  from '../features/user/userSlice'
export const store = configureStore({
   reducer:{
    products:productReducer,
    orders:orderReducer,
    user:userReducer
   }
})