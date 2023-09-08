import { Course } from "../../types/models";
import { CrudReducer } from "./crudReducer";

const courseReducer = new CrudReducer<Course, {signal:AbortSignal, params: {name: string} | {}}>("courses", "course");

export default courseReducer.slice.reducer;
export const {getAll: getAllCourses, get: getCourseById, create: createCourse, update: updateCourse, remove: removeCourse} = {...courseReducer.returnAsyncThunks()}