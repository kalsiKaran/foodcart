import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import cartReducer from "./cartSlice";
import authReducer from "./authSlice";
import favouritesReducer from "./favouriteSlice";

const authPersistConfig = {
    key: "auth",
    storage,
    keyPrefix: "redux-",
    whitelist: ['isLoggedIn']
}
const cartPersistConfig = {
    key: "cart",
    storage,
    keyPrefix: "redux-",
    whitelist: ['products', 'price', 'quantity', 'total']
}
const favouritesPersistConfig = {
    key: "favourites",
    storage,
    keyPrefix: "redux-",
    whitelist: ['favouriteList']
}

const rootReducer = combineReducers({
    cart: persistReducer(cartPersistConfig, cartReducer),
    auth: persistReducer(authPersistConfig, authReducer),
    favourites: persistReducer(favouritesPersistConfig, favouritesReducer)
})

export { rootReducer };