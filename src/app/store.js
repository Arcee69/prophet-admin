import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { thunk } from 'redux-thunk'; 
import loginReducer from "../features/auth/loginSlice";
import getUsersReducer from "../features/users/getUsersSlice";
import getAdminsReducer from "../features/admins/getAdminsSlice";

const persistConfig = {
    key: 'root',
    storage,
};

const rootReducer = combineReducers({ 
    // Add reducers here
    userLogin: loginReducer,
    allUsers: getUsersReducer,
    allAdmins: getAdminsReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        // You can add middleware configuration options here if needed
        serializableCheck: false, // Often needed when using redux-persist
    }),
});

export const persistor = persistStore(store);
