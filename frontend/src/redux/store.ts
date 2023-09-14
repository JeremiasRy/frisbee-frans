import { configureStore } from "@reduxjs/toolkit";
import courseReducer from "./reducer/courseReducer";
import roundReducer from "./reducer/roundReducer";
import loginReducer, { LoginReducerState } from "./reducer/loginReducer";
import { LoggedIn } from "../types/models";

let preLogin: LoggedIn | null = null
const login = localStorage.getItem("login");

if (preLogin) {
    try {
        preLogin = JSON.parse(login as string);
    } catch {
        console.log("No data in local storage")
    }
}

const preLoadedState = {
    login: {state: "idle", loggedIn: preLogin} as LoginReducerState
};

function saveState(state:RootState) {
    try {
        let login = JSON.stringify(state.login.loggedIn);
        localStorage.setItem("login", login);
    } catch(e:any) {
        console.log(e)
    }
}

export const createStore = () => {
    return configureStore({
        reducer: {
            course: courseReducer,
            round: roundReducer,
            login: loginReducer
        },
        preloadedState: preLoadedState
    })
}

export const store = createStore();

store.subscribe(() => saveState(store.getState()))

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
