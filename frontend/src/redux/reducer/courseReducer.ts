import { CourseDto } from "../../types/dtos";
import { Course } from "../../types/models";
import { RequestBase } from "../../types/requests";
import { CrudReducer } from "./crudReducer";

const courseReducer = new CrudReducer<Course, RequestBase<CourseDto>>("courses", "course");

export default courseReducer.slice.reducer;
export const {getAll: getAllCourses, get: getCourseById, create: createCourse, update: updateCourse, remove: removeCourse} = {...courseReducer.returnAsyncThunks()}