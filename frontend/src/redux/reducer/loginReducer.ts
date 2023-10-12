import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LoggedIn } from "../../types/models";
import { LoginDto } from "../../types/dtos";
import axios from "axios";
import { RootState } from "../store";

export type LoginReducerState = {
    state: "LoggingIn" | "Registering" | "Registered" | "Rejected" | "Fullfilled" | "Idle" | "LoginFailedTryToRegister",
    loggedIn: LoggedIn | null
}

const initialState: LoginReducerState = {
    state: "Idle",
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
        builder.addCase(login.fulfilled, (_, action) => {
            if (!action.payload) {
                return {
                    state: "LoginFailedTryToRegister",
                    loggedIn: null
                }
            }
            return {
                state: "Idle",
                loggedIn: action.payload
            }
        })
        .addCase(login.pending, (state) => {
            return {
                ...state,
                state: "LoggingIn"
            }
        })
        .addCase(register.pending, (state) => {
            return {
                ...state,
                state: "Registering"
            }
        })
        .addCase(register.fulfilled, () => {
            return {
                state: "Registered",
                loggedIn: null
            }
        })
        .addCase(register.rejected, (state) => {
            return {
                ...state,
                state: "Rejected"
            }
        })
        .addCase(login.rejected, (state) => {
            return {
                ...state,
                state: "Rejected"
            }
        })
        .addCase(checkToken.rejected, () => {
            return {
                state: "Idle",
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
        const result = await axios.post<LoggedIn | null>(`${import.meta.env.VITE_BACKEND_URL}/users/login`, request);
        return result.data
    }
)

export const register = createAsyncThunk(
    "register",
    async (request: LoginDto) => {
        const result = await axios.post<boolean>(`${import.meta.env.VITE_BACKEND_URL}/users/signup`, request);
        return result.data;
    } 
)

export const checkToken = createAsyncThunk(
    "checkAuthentication",
    async (_, thunkAPI) => {
        await axios.get(`${import.meta.env.VITE_BACKEND_URL}/users/check`, {headers: {Authorization: `Bearer ${(thunkAPI.getState() as RootState).login.loggedIn?.token}`}})
    }
)
