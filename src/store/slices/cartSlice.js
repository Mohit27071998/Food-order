import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
     name:'cart',
     initialState:{
        items: [],
        totalAmount: 0,
        changed: false,
     },
     reducers:{
      addItem: (state, action) => {
         const newItem = action.payload;
         const existingItem = state.items.find((item) => item.id === newItem.id);
         
        
         state.totalQuantity++;
         state.changed = true;
   
         if (!existingItem) {
          
           const newItemData = {
             id: newItem.id,
             price: newItem.price,
             quantity: 1,
             totalPrice: newItem.price,
             name: newItem.name,
           };
           state.items.push(newItemData);
         } else {
         
           existingItem.quantity++;
           existingItem.totalPrice = existingItem.totalPrice + newItem.price;
         }
                 
         state.totalAmount = state.items.reduce((total, item) => total + item.totalPrice, 0);
       },
    
       
        removeItem: (state,action) => {
         const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      state.changed = true;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
      state.totalAmount = state.items.reduce((total, item) => total + item.totalPrice, 0);
    },
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
    },
        clearCart: (state) => {
         state.items = []
         state.totalAmount = 0;
        }
     }
})

export default cartSlice.reducer;
export const {addItem,removeItem,clearCart,replaceCart} = cartSlice.actions;