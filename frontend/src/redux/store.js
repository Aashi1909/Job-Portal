import {configureStore} from '@reduxjs/toolkit'
import authSlice from './authSlice'
import jobSlice from './jobSlice';
import companySlice from './companySlice';
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Uses localStorage

const persistConfig = {
  key: "auth",
  storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authSlice);

const store = configureStore({
  reducer: {
    auth: persistedAuthReducer, // Use the persisted reducer for auth
    job: jobSlice,
    company: companySlice

  },
});

export const persistor = persistStore(store);
export default store;