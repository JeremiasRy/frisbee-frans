import { Box } from "@mui/material";
import { Course } from "../types/models";
import CourseCard, { OnClickAction } from "./CourseCard";

export interface CourseCardWrapperProps {
    courses: Course[],
    onClickAction: OnClickAction
}

export default function CourseCardWrapper(props:CourseCardWrapperProps) {
    const {courses, onClickAction} = {...props}; 
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
                        <CourseCard course={course} onClickAction={onClickAction}/>)
                }
        </Box>
    )
}