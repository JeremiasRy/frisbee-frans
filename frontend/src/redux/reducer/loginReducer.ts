import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LoggedIn } from "../../types/models";
import { LoginDto } from "../../types/dtos";
import axios from "axios";
import { RootState } from "../store";

export type LoginReducerState = {
    state: "LoggingIn" | "Registering" | "Rejected" | "Fullfilled" | "Idle" | "LoginFailedTyingToRegister",
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
        builder.addCase(login.fulfilled, (state, action) => {
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
                state: "Fullfilled",
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
        let result = await axios.post<boolean>(`${import.meta.env.VITE_BACKEND_URL}/users/signup`, request);
        console.log(result.data)
        if (result.data) {
            thunkAPI.dispatch(login(request))
        } else {
            thunkAPI.rejectWithValue("")
        }

    } 
)

export const checkToken = createAsyncThunk(
    "checkAuthentication",
    async (_, thunkAPI) => {
        await axios.get(`${import.meta.env.VITE_BACKEND_URL}/users/check`, {headers: {Authorization: `Bearer ${(thunkAPI.getState() as RootState).login.loggedIn?.token}`}})
    }
)
