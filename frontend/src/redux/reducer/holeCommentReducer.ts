import { HoleCommentDTO } from "../../types/dtos";
import { HoleComment } from "../../types/models";
import { RequestBase } from "../../types/requests";
import { CrudReducer } from "./crudReducer";

const holeCommentReducer = new CrudReducer<HoleComment, RequestBase<HoleCommentDTO>>("holeComments", "holeCommentReducer");

export default holeCommentReducer.slice.reducer;
export const {getAll: getAllHoleComments, get: getHoleComment, create: createHoleComment, update: updateHoleComment, remove: removeHoleComment} = {...holeCommentReducer.returnAsyncThunks()}
export const {setStateToIdle: setHoleCommentReducerStateToIdle} = holeCommentReducer.slice.actions;