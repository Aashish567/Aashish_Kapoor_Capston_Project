import { createSlice } from "@reduxjs/toolkit";

const initialState = {

    cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem('cartItems')) : [],

    
};
               
const cartSlice = createSlice({
    name : 'cart',
    initialState,

    reducers : {

        add(state, action){

            const itemIndex = state.cartItems.findIndex((item) => item.id === action.payload.id);

            if (itemIndex >= 0) {
                 state.cartItems[itemIndex].cartQuantity += 1;
                

            } else {
                const tempProduct = {...action.payload, cartQuantity: 1};
                state.cartItems.push(tempProduct);
            }

            // Save the items to Local Storage
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
            
            
        },

        remove(state, action){

                const nextCartItems =  state.cartItems.filter(item => item.id !== action.payload.id);

                state.cartItems = nextCartItems;

                localStorage.setItem('cartItems', JSON.stringify(state.cartItems));

        },

        decrease(state, action){

            const itemIndex = state.cartItems.findIndex((item) => item.id === action.payload.id);

            if (state.cartItems[itemIndex].cartQuantity > 1) {

                state.cartItems[itemIndex].cartQuantity -= 1; 

            } else if (state.cartItems[itemIndex].cartQuantity === 1) {

                const nextCartItems =  state.cartItems.filter(item => item.id !== action.payload.id);

                state.cartItems = nextCartItems;

            }

            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));

        },

        clearCart(state, action) {
            
            state.cartItems = [];
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems)); 

        }

    }
});

export const {add, remove, decrease, clearCart} = cartSlice.actions;
export default cartSlice.reducer;