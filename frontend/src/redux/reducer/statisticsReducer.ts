import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CourseStats, HoleStats, UserStats } from "../../types/models";
import axios from "axios";
import { RootState } from "../store";
import { StatisticsRequest } from "../../types/requests";

const baseUrl = import.meta.env.VITE_BACKEND_URL;

export type StatisticsReducerState = {
    userStats: UserStats | null,
    courseStats: CourseStats | null,
    holeStats: HoleStats | null,
    pending: boolean,
}

const initialState: StatisticsReducerState = {userStats: null, courseStats: null, holeStats: null, pending: false};

const slice = createSlice({
    name: "statisticsReducer",
    initialState,
    reducers: {

    },
    extraReducers: builder => {
        builder.addCase(getUserStats.fulfilled, (state, action) => {
            return {...state, userStats: action.payload, pending: false}
        }).addCase(getCourseStats.fulfilled, (state, action) => {
            return {...state, courseStats: action.payload};
        }).addCase(getHoleStats.fulfilled, (state, action) => {
            return {...state, holeStats: action.payload};
        }).addCase(getUserStats.pending, (state) => {
            return {...state, pending: true}
        }).addCase(getUserStats.rejected, (state) => {
            return {
                ...state,
                pending: false
            }
        })
    }
})

export default slice.reducer;

export const getUserStats = createAsyncThunk(
    "getUserStats",
    async (request:StatisticsRequest, thunkAPI) => {
        const {id, signal} = {...request};
        const token = (thunkAPI.getState() as RootState).login.loggedIn?.token
        const result = await axios.get<UserStats>(`${baseUrl}/Statistics/user/${id}`, {headers: {Authorization: `Bearer ${token}`}, signal})
        return result.data
    }
)

export const getCourseStats = createAsyncThunk(
    "getCourseStats",
    async (request:StatisticsRequest, thunkAPI) => {
        const {id, signal} = {...request};
        const token = (thunkAPI.getState() as RootState).login.loggedIn?.token
        const result = await axios.get<CourseStats>(`${baseUrl}/Statistics/course/${id}`, {headers: {Authorization: `Bearer ${token}`}, signal})
        return result.data
    }
)

export const getHoleStats = createAsyncThunk(
    "getHoleStats",
    async (request:StatisticsRequest, thunkAPI) => {
        const {id, signal} = {...request};
        const token = (thunkAPI.getState() as RootState).login.loggedIn?.token
        const result = await axios.get<HoleStats>(`${baseUrl}/Statistics/hole/${id}`, {headers: {Authorization: `Bearer ${token}`}, signal})
        return result.data
    }
)