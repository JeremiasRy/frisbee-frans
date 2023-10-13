import { RoundCommentDTO } from "../../types/dtos";
import { RoundComment } from "../../types/models";
import { RequestBase } from "../../types/requests";
import { CrudReducer } from "./crudReducer";

const roundCommentReducer = new CrudReducer<RoundComment, RequestBase<RoundCommentDTO>>("roundComments", "roundCommentReducer");

export default roundCommentReducer.slice.reducer;
export const {getAll: getAllRoundCommments, get: getRoundComment, create: createRoundComment, update: updateRoundComment, remove: removeRoundcomment} = roundCommentReducer.returnAsyncThunks();
export const {setStateToIdle: setRoundCommentReducerStateToIdle} = roundCommentReducer.slice.actions;