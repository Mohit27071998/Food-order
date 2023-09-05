import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import thunk from "redux-thunk";
import cartReducer from './slices/cartSlice'
import productReducer from './slices/productSlice'

const store = configureStore({
    reducer:{
        cart : cartReducer,
      product: productReducer
    },
    middleware : [thunk,logger]
})
export default store;