import { configureStore, createSlice, combineReducers } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import user from './userSlice';

//굳이 루트리듀서로 작성하지않아도 자동으로 생성된다고 한다.
const rooteReducer = combineReducers({
  user,
});

export const store = configureStore({
  reducer: rooteReducer,
});

//타입을 미리 추상화하여 번거로움을 덜어낸다.
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
