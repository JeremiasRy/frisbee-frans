import { HoleDto } from "../../types/dtos";
import { Hole } from "../../types/models";
import { RequestBase } from "../../types/requests";
import { CrudReducer } from "./crudReducer";

const holeReducer = new CrudReducer<Hole, RequestBase<HoleDto>>("holeReducer", "holes");

export default holeReducer.slice.reducer;
export const {getAll: getAllHoles, get: getHole, create: createHole, update: updateHole, remove: removeHole} = {...holeReducer.returnAsyncThunks()}