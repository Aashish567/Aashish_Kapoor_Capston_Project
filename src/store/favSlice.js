import { createSlice } from "@reduxjs/toolkit";

const initialState = {

    favItems: localStorage.getItem("favItems")
    ? JSON.parse(localStorage.getItem('favItems')) : [],

};
               
const favSlice = createSlice({

    name : 'fav',
    initialState,

    reducers : {

        addFav(state, action){

            const itemIndex = state.favItems.findIndex((item) => item.id === action.payload.id);

            if (itemIndex >= 0) {
                 state.favItems[itemIndex].favQuantity += 1;
            
            
            } else {
                const tempProduct = {...action.payload, favQuantity: 1};
                state.favItems.push(tempProduct);
            }

            

            // Save the items to Local Storage
            localStorage.setItem('favItems', JSON.stringify(state.favItems));
            
            
        },

        remove(state, action){

                const nextfavItems =  state.favItems.filter((item) => item.id !== action.payload.id);

                state.favItems = nextfavItems;

                localStorage.setItem('favItems', JSON.stringify(state.favItems));

        },

        decrease(state, action){

            const itemIndex = state.favItems.findIndex((item) => item.id === action.payload.id);

            if (state.favItems[itemIndex].favQuantity > 1) {

                state.favItems[itemIndex].favQuantity -= 1; 

            } else if (state.favItems[itemIndex].favQuantity === 1) {

                const nextfavItems =  state.favItems.filter(item => item.id !== action.payload.id);

                state.favItems = nextfavItems;

            }

            localStorage.setItem('favItems', JSON.stringify(state.favItems));

        },

        clearFav(state, action) {
            
            state.favItems = [];
            localStorage.setItem('favItems', JSON.stringify(state.favItems)); 

        }

    }
});

export const {addFav, remove, decrease, clearFav} = favSlice.actions;
export default favSlice.reducer;

