import { HoleResultDto } from "../../types/dtos";
import { HoleResult } from "../../types/models";
import { RequestBase } from "../../types/requests";
import { CrudReducer } from "./crudReducer";

const holeResultReducer = new CrudReducer<HoleResult, RequestBase<HoleResultDto>>("holeResults", "holeResult");

export default holeResultReducer.slice.reducer;
export const {getAll: getAllHoleResults, get: getHoleResultById, create: createHoleResult, update: updateHoleResult, remove: removeHoleResult} = {...holeResultReducer.returnAsyncThunks()}