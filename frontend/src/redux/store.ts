import { configureStore } from "@reduxjs/toolkit";
import courseReducer from "./reducer/courseReducer";
import roundReducer from "./reducer/roundReducer";
import loginReducer, { LoginReducerState } from "./reducer/loginReducer";
import { LoggedIn } from "../types/models";
import holeResultReducer from "./reducer/holeResultReducer";
import holeReducer from "./reducer/holeReducer";
import statisticsReducer from "./reducer/statisticsReducer";

let preLogin: LoggedIn | null = null
const login = localStorage.getItem("login");

if (preLogin === null) {
    try {
        preLogin = JSON.parse(login as string);
    } catch {
        console.log("No data in local storage")
    }
}

const preLoadedState = {
    login: {state: "Idle", loggedIn: preLogin} as LoginReducerState
};

function saveState(state:RootState) {
    try {
        const login = JSON.stringify(state.login.loggedIn);
        localStorage.setItem("login", login);
    } catch {
        console.log("Things exploded")
    }
}

export const createStore = () => {
    return configureStore({
        reducer: {
            hole: holeReducer,
            course: courseReducer,
            round: roundReducer,
            login: loginReducer,
            holeResult: holeResultReducer,
            statistics: statisticsReducer
        },
        preloadedState: preLoadedState
    })
}

export const store = createStore();

store.subscribe(() => saveState(store.getState()))

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
