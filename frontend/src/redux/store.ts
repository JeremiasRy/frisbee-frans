import { configureStore } from "@reduxjs/toolkit";
import courseReducer from "./reducer/courseReducer";
import roundReducer from "./reducer/roundReducer";

export const store = configureStore({
    reducer: {
        course: courseReducer,
        round: roundReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
