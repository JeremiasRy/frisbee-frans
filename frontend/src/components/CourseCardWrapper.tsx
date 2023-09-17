import { Box } from "@mui/material";
import { Course } from "../types/models";
import CourseCard, { OnClickAction } from "./CourseCard";

export interface CourseCardWrapperProps {
    courses: Course[],
    onClickAction: OnClickAction,
    setCourse: React.Dispatch<React.SetStateAction<number>> | null
}

export default function CourseCardWrapper(props:CourseCardWrapperProps) {
    const {courses, onClickAction, setCourse} = {...props}; 
    return (
        <Box 
            sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                gap: "1em",
            }}>
                {
                    courses.map(course => 
                        <CourseCard key={course.id} course={course} onClickAction={onClickAction} setCourse={setCourse}/>)
                }
        </Box>
    )
}