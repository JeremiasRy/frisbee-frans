import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LoggedIn } from "../../types/models";
import { LoginDto } from "../../types/dtos";
import axios from "axios";
import { RootState } from "../store";

export type LoginReducerState = {
    state: "fullfilled" | "pending" | "rejected" | "idle",
    loggedIn: LoggedIn | null
}

const initialState: LoginReducerState = {
    state: "idle",
    loggedIn: null
};

const loginReducer = createSlice({
    name: "loginReducer",
    initialState,
    reducers: {
        logout: () => {
            return initialState;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (_,action) => {
            action.payload
            return {
                state: "idle",
                loggedIn: action.payload
            }
        })
        .addCase(register.fulfilled, () => {
            return {
                state: "fullfilled",
                loggedIn: null
            }
        })
        .addCase(checkToken.rejected, () => {
            return {
                state: "idle",
                loggedIn: null
            }
        })
    }
})

export default loginReducer.reducer;
export const { logout } = loginReducer.actions;

export const login = createAsyncThunk(
    "login",
    async (request: LoginDto, thunkAPI) => {
        let result = await axios.post<LoggedIn>(`${import.meta.env.VITE_BACKEND_URL}/users/login`, request);
        if (!result.data) {
            thunkAPI.dispatch(register(request));
        }
        return result.data
    }
)

export const register = createAsyncThunk(
    "register",
    async (request: LoginDto, thunkAPI) => {
        await axios.post<LoggedIn>(`${import.meta.env.VITE_BACKEND_URL}/users/signup`, request);
        thunkAPI.dispatch(login(request))
    } 
)

export const checkToken = createAsyncThunk(
    "checkAuthentication",
    async (_, thunkAPI) => {
        await axios.get(`${import.meta.env.VITE_BACKEND_URL}/users/check`, {headers: {Authorization: `Bearer ${(thunkAPI.getState() as RootState).login.loggedIn?.token}`}})
    }
)
