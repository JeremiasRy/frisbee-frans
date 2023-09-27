import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HoleResultDto } from "../../types/dtos";
import { HoleResult } from "../../types/models";
import { RequestBase } from "../../types/requests";
import { CrudReducer } from "./crudReducer";
import { RootState } from "../store";
import axios from "axios";

class HoleResultReducer extends CrudReducer<HoleResult, RequestBase<HoleResultDto>> {

    createMany: ReturnType<typeof createAsyncThunk<HoleResult[], RequestBase<HoleResultDto[]>>>;
    returnAsyncThunks = () => {
        return {getAll: this.getAll, get: this.get, create: this.create, createMany: this.createMany, update: this.update, remove: this.remove}
    }

    
    constructor(endpoint:string, name:string) {
        super(endpoint, name)

        this.slice = createSlice({
            name: this.reducerName,
            initialState: this.initialState,
            reducers: {
                setStateToIdle: this.setStateToIdle
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
                .addCase(this.create.pending, (state) => {
                    return {
                        ...state,
                        state: "pending"
                    }
                })
                .addCase(this.createMany.fulfilled, (_, action) => {
                    return {
                        entities: action.payload,
                        state: "created"
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
        this.createMany = createAsyncThunk(
            "createMany",
            async (request, thunkAPI) => {
                let token = (thunkAPI.getState() as RootState).login.loggedIn?.token
                let result = await axios.post(`${this.url}/many`, request.requestData, {headers: {Authorization: `Bearer ${token}`}, signal: request.signal});
                return result.data;
            }
        )
    }
}

const holeResultReducer = new HoleResultReducer("holeResults", "holeResult");

export default holeResultReducer.slice.reducer;
export const {getAll: getAllHoleResults, get: getHoleResultById, create: createHoleResult, createMany: createManyHoleResults, update: updateHoleResult, remove: removeHoleResult} = {...holeResultReducer.returnAsyncThunks()}
export const {setStateToIdle: setHoleResultReducerStateToIdle} = holeResultReducer.slice.actions;