import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import {persistStore} from "redux-persist"
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import themeReducer from "./theme/themeSlice"
const rootReducer = combineReducers({
  user: userReducer,
  theme: themeReducer
});

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

const persistReduce = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistReduce,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store)


