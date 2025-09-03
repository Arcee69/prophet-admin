import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { thunk } from 'redux-thunk'; 
import loginReducer from "../features/auth/loginSlice";
import getUsersReducer from "../features/users/getUsersSlice";
import getAdminsReducer from "../features/admins/getAdminsSlice";
import getBrandsReducer from "../features/brands/getBrandsSlice";
import getBlogsReducer from "../features/blogs/getBlogsSlice";
import getFaqsReducer from "../features/faqs/getFaqsSlice";
import getSubSettingsReducer from "../features/subSettings/getSubSettingsSlice";
import getTransactionReducer from "../features/transactions/getTransactionSlice";
import getSubscriptionReducer from "../features/subscriptions/getSubscriptionSlice";

const persistConfig = {
    key: 'root',
    storage,
};

const rootReducer = combineReducers({ 
    // Add reducers here
    userLogin: loginReducer,
    allUsers: getUsersReducer,
    allAdmins: getAdminsReducer,
    allBrands: getBrandsReducer,
    allBlogs: getBlogsReducer,
    allFaqs: getFaqsReducer,
    allSubSettings: getSubSettingsReducer,
    allTransactions: getTransactionReducer,
    allSubscriptions: getSubscriptionReducer
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
