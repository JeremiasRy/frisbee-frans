import { Round } from "../../types/models";
import { Base } from "../../types/requests";
import { CrudReducer } from "./crudReducer";

const roundReducer = new CrudReducer<Round, Base>("rounds", "round");

export default roundReducer.slice.reducer;
export const {getAll: getAllRounds, get: getRound, create: createRound, update: updateRound, remove: removeRound} = roundReducer.returnAsyncThunks();