import { CourseCommentDTO } from "../../types/dtos";
import { CourseComment } from "../../types/models";
import { RequestBase } from "../../types/requests";
import { CrudReducer } from "./crudReducer";

const courseCommentReducer = new CrudReducer<CourseComment, RequestBase<CourseCommentDTO>>("courseComments", "courseCommentReducer");

export default courseCommentReducer.slice.reducer;
export const {getAll: getAllCourseComments, get: getCourseComment, create: createCourseComment, update: updateCourseComment, remove: removeCourseComment} = {...courseCommentReducer.returnAsyncThunks()}
export const {setStateToIdle: setCourseCommentReducerStateToIdle} = courseCommentReducer.slice.actions;