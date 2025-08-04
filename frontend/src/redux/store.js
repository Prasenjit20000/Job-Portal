import {combineReducers, configureStore} from "@reduxjs/toolkit";
import authSlice from "./authSlice.js"
import jobSlice from "./jobSlice.js"
import {persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { version } from "react";


const persistConfig = {
    key : 'root',
    version : 1,
    storage
}

const rootReducer = combineReducers({
    auth : authSlice,
    job : jobSlice
})

const persistedReducer = persistReducer(persistConfig,rootReducer);

const store = configureStore({
    reducer : persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoreActions : [FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER],
            },
        }),
});

export default store;