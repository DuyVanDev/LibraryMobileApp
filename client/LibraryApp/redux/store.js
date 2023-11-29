import {configureStore} from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
// import storage from 'redux-persist/lib/storage'; // Lưu trữ trạng thái vào local storage
// import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';

import bookReducer from './slice/bookSlice';
import userReducer from './slice/userSlice'

const persistConfigUser = {
  key: 'user',
  storage: AsyncStorage,
};

const persistConfigBook = {
  key: 'book',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfigBook, bookReducer);
const persistedUserReducer = persistReducer(persistConfigUser, userReducer);

export const store = configureStore({
  reducer: {
    book: persistedReducer,
    user : persistedUserReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      }
    }),
});

export const persistor = persistStore(store);
