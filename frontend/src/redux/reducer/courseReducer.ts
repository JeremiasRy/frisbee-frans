import { Course } from "../../types/models";
import { Base } from "../../types/requests";
import { CrudReducer } from "./crudReducer";

const courseReducer = new CrudReducer<Course, Base>("courses", "course");

export default courseReducer.slice.reducer;
export const {getAll: getAllCourses, get: getCourseById, create: createCourse, update: updateCourse, remove: removeCourse} = {...courseReducer.returnAsyncThunks()}