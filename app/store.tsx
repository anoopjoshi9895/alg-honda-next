import { configureStore } from "@reduxjs/toolkit";
import slideReducer from "../feature/slideSlice";
import newsReducer from "../feature/newsSlice";
import footerReducer from "../feature/footerSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  PersistConfig,
} from "redux-persist";
import { rootReducer } from "./rootReducer";
import storage from "redux-persist/lib/storage";
import initialize from "./initializeStore";

const persistConfig: PersistConfig<any> = {
  key: "root",
  storage,
  whitelist: [
    "authState",
    "appSettingsState",
    "productDetailsState",
    "cartState",
  ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store, null, () => {
  initialize(store);
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
