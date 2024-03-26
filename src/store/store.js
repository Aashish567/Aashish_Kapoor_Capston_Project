import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import favSlice from "./favSlice";

// const rootReducer = {
//     cart: cartSlice.reducer,
//     fav: favSlice.reducer,
//   };


const store = configureStore({

    reducer : {

        cart: cartSlice,
        fav: favSlice,
 
    }

    
});

export default store;