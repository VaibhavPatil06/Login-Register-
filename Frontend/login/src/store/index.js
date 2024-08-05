import { configureStore } from "@reduxjs/toolkit";
import * as reducers from "./slice";





const store = configureStore({
    reducer:{
        auth: reducers.authSlice, 
    }
})


export default store;