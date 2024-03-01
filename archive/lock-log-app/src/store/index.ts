import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";

const store = configureStore({
  reducer: { auth: authSlice.reducer },
});

export default store;
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;
