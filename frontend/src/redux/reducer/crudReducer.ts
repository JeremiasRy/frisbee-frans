import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BaseModel } from "../../types/base";
import axios from "axios";
import { RequestBase, RequestWithId } from "../../types/requests";
import { RootState } from "../store";

export type SliceState<TModel> = { entities: TModel[], state: "idle" | "pending" | "succeeded" | "rejected" | "created" | "updated"};

export class CrudReducer<TModel extends BaseModel, TDto> {
    initialState: SliceState<TModel> = {entities: [], state: "idle"};
    reducerName: string;
    name: string;
    url: string
    
    slice: ReturnType<typeof createSlice<SliceState<TModel>, {}, string>>;

    getAll: ReturnType<typeof createAsyncThunk<TModel[], RequestBase<TDto>>>;
    get: ReturnType<typeof createAsyncThunk<TModel, RequestWithId<TDto> >>;
    create: ReturnType<typeof createAsyncThunk<TModel, RequestBase<TDto>>>;
    update: ReturnType<typeof createAsyncThunk<TModel, RequestWithId<TDto>>>;
    remove: ReturnType<typeof createAsyncThunk<TModel, RequestWithId<TDto>>>;

    returnAsyncThunks = () => {
        return {getAll: this.getAll, get: this.get, create: this.create, update: this.update, remove: this.remove}
    }

    constructor(endpoint:string, name:string) {
        this.url = `${import.meta.env.VITE_BACKEND_URL}/${endpoint}`;
        this.name = name.charAt(0).toLocaleUpperCase() + name.slice(1);
        this.reducerName = name + "Reducer";
        
        this.slice = createSlice({
            name: this.reducerName,
            initialState: this.initialState,
            reducers: {
            },
            extraReducers: builder => {
                builder.addCase(this.getAll.fulfilled, (_, action) => {
                    return {entities: action.payload, state: "succeeded"}
                })
                .addCase(this.get.fulfilled, (_, action) => {
                    return {entities: [action.payload], state: "succeeded"}
                })
                .addCase(this.get.pending, (state) => {
                    return {
                        ...state,
                        state: "pending"
                    }
                })
                .addCase(this.create.fulfilled, (_, action) => {
                    return {entities: [action.payload], state: "created"}
                })
                .addCase(this.update.fulfilled, (_, action) => {
                    return {entities: [action.payload], state: "updated"}
                })
                .addCase(this.remove.fulfilled, (_, action) => {
                    return {entities: [action.payload], state: "succeeded"}
                })
                .addCase(this.getAll.pending, (state) => {
                    return {...state, state: "pending"}
                })
                .addCase(this.getAll.rejected, (state, action) => {
                    if (action.error.code === "ERR_CANCELLED") {
                        return;
                    }
                    return {...state, state: "rejected"}
                })
            }
        })

        this.getAll = createAsyncThunk(
            "getAll" + this.name,
            async (request, thunkAPI) => {
                let token = (thunkAPI.getState() as RootState).login.loggedIn?.token
                let result = await axios.get<TModel[]>(this.url, {params: {...request.params}, headers: {Authorization: `Bearer ${token}`}, signal: request.signal});
                return result.data;
            }
        )

        this.get = createAsyncThunk(
            "get" + this.name,
            async (request, thunkAPI) => {
                let token = (thunkAPI.getState() as RootState).login.loggedIn?.token
                let result = await axios.get<TModel>(`${this.url}/${request.id}`, {params: {...request.params}, headers: {Authorization: `Bearer ${token}`}, signal: request.signal});
                return result.data;
            }
        )

        this.create = createAsyncThunk(
            "create" + this.name,
            async (request, thunkAPI) => {
                let token = (thunkAPI.getState() as RootState).login.loggedIn?.token
                let result = await axios.post(this.url, request.requestData, {headers: {Authorization: `Bearer ${token}`}, signal: request.signal});
                return result.data;
            }
        )

        this.update = createAsyncThunk(
            "update" + this.name,
            async (request, thunkAPI) => {
                let token = (thunkAPI.getState() as RootState).login.loggedIn?.token
                let result = await axios.put(`${this.url}/${request.id}`, request.requestData, {headers: {Authorization: `Bearer ${token}`}, signal: request.signal});
                return result.data;
            }
        )

        this.remove = createAsyncThunk(
            "remove" + this.name,
            async (request, thunkAPI) => {
                let token = (thunkAPI.getState() as RootState).login.loggedIn?.token
                let result = await axios.delete(`${this.url}/${request.id}`, {headers: {Authorization: `Bearer ${token}`}, signal: request.signal});
                return result.data;
            }
        )
    }
}