import { CaseReducer, SliceCaseReducers, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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
    
    slice: ReturnType<typeof createSlice<SliceState<TModel>, SliceCaseReducers<SliceState<TModel>>, string>>;

    getAll: ReturnType<typeof createAsyncThunk<TModel[], RequestBase<TDto>>>;
    get: ReturnType<typeof createAsyncThunk<TModel, RequestWithId<TDto> >>;
    create: ReturnType<typeof createAsyncThunk<TModel, RequestBase<TDto>>>;
    update: ReturnType<typeof createAsyncThunk<TModel, RequestWithId<TDto>>>;
    remove: ReturnType<typeof createAsyncThunk<TModel, RequestWithId<TDto>>>;

    setStateToIdle: CaseReducer<SliceState<TModel>>;

    returnAsyncThunks = () => {
        return {getAll: this.getAll, get: this.get, create: this.create, update: this.update, remove: this.remove}
    }

    constructor(endpoint:string, name:string) {
        this.url = `${import.meta.env.VITE_BACKEND_URL}/${endpoint}`;
        this.name = name.charAt(0).toLocaleUpperCase() + name.slice(1);
        this.reducerName = name + "Reducer";
        this.setStateToIdle = (state) => {
            return { 
                ...state, 
                state: "idle"
            }
        }
        
        this.slice = createSlice({
            name: this.reducerName,
            initialState: this.initialState,
            reducers: {
                setStateToIdle: this.setStateToIdle
            },
            extraReducers: builder => {
                builder.addCase(this.getAll.fulfilled, (state, action) => {
                    const oldEntities = [...state.entities as TModel[]]
                    const newEntities = [...action.payload]
                    
                    if ("page" in action.meta.arg.params && action.meta.arg.params.page as number > 1) {
                        console.log(action.meta.arg.params.page)
                        return {entities: [...oldEntities, ...newEntities], state: "succeeded"}
                    }
                    
                    return {entities: [...newEntities], state: "succeeded"}
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
                .addCase(this.create.pending, (state) => {
                    return {
                        ...state,
                        state: "pending"
                    }
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
                const token = (thunkAPI.getState() as RootState).login.loggedIn?.token
                const result = await axios.get<TModel[]>(this.url, {params: {...request.params}, headers: {Authorization: `Bearer ${token}`}, signal: request.signal});
                return result.data;
            }
        )

        this.get = createAsyncThunk(
            "get" + this.name,
            async (request, thunkAPI) => {
                const token = (thunkAPI.getState() as RootState).login.loggedIn?.token
                const result = await axios.get<TModel>(`${this.url}/${request.id}`, {params: {...request.params}, headers: {Authorization: `Bearer ${token}`}, signal: request.signal});
                return result.data;
            }
        )

        this.create = createAsyncThunk(
            "create" + this.name,
            async (request, thunkAPI) => {
                const token = (thunkAPI.getState() as RootState).login.loggedIn?.token
                const result = await axios.post(this.url, request.requestData, {headers: {Authorization: `Bearer ${token}`}, signal: request.signal});
                return result.data;
            }
        )

        this.update = createAsyncThunk(
            "update" + this.name,
            async (request, thunkAPI) => {
                const token = (thunkAPI.getState() as RootState).login.loggedIn?.token
                const result = await axios.put(`${this.url}/${request.id}`, request.requestData, {headers: {Authorization: `Bearer ${token}`}, signal: request.signal});
                return result.data;
            }
        )

        this.remove = createAsyncThunk(
            "remove" + this.name,
            async (request, thunkAPI) => {
                const token = (thunkAPI.getState() as RootState).login.loggedIn?.token
                const result = await axios.delete(`${this.url}/${request.id}`, {headers: {Authorization: `Bearer ${token}`}, signal: request.signal});
                return result.data;
            }
        )
    }
}