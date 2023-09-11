import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BaseModel } from "../../types/base";
import axios from "axios";
import { Base, RequestWithId } from "../../types/requests";


export type SliceState<TModel> = { entities: TModel[], state: "idle" | "pending" | "succeeded" | "rejected"};

export class CrudReducer<TModel extends BaseModel, TDto extends Base> {
    initialState: SliceState<TModel> = {entities: [], state: "idle"};
    reducerName: string;
    name: string;
    url: string
    
    slice: ReturnType<typeof createSlice<SliceState<TModel>, {}, string>>;

    getAll: ReturnType<typeof createAsyncThunk<TModel[], TDto>>;
    get: ReturnType<typeof createAsyncThunk<TModel, RequestWithId >>;
    create: ReturnType<typeof createAsyncThunk<TModel, TDto>>;
    update: ReturnType<typeof createAsyncThunk<TModel, {id:number, request:TDto}>>;
    remove: ReturnType<typeof createAsyncThunk<TModel, RequestWithId>>;

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
            reducers: {},
            extraReducers: builder => {
                builder.addCase(this.getAll.fulfilled, (_, action) => {
                    return { entities: action.payload, state: "succeeded"}
                })
                .addCase(this.get.fulfilled, (_, action) => {
                    return {entities: [action.payload], state: "succeeded"}
                })
                .addCase(this.create.fulfilled, (_, action) => {
                    return {entities: [action.payload], state: "succeeded"}
                })
                .addCase(this.update.fulfilled, (_, action) => {
                    return {entities: [action.payload], state: "succeeded"}
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
            async (request) => {
                let result = await axios.get<TModel[]>(this.url, {params: {...request.params}, signal: request.signal});
                return result.data;
            }
        )

        this.get = createAsyncThunk(
            "get" + this.name,
            async (request) => {
                let result = await axios.get<TModel>(`${this.url}/${request.id}`, {params: {...request.params}, signal: request.signal});
                return result.data;
            }
        )

        this.create = createAsyncThunk(
            "create" + this.name,
            async (request) => {
                let result = await axios.post(this.url, request.params, {signal: request.signal});
                return result.data;
            }
        )

        this.update = createAsyncThunk(
            "update" + this.name,
            async (request) => {
                let result = await axios.put(`${this.url}/${request.id}`, request.request.params, {signal: request.request.signal});
                return result.data;
            }
        )

        this.remove = createAsyncThunk(
            "remove" + this.name,
            async (request) => {
                let result = await axios.delete(`${this.url}/${request.id}`, {signal: request.signal});
                return result.data;
            }
        )
    }
}