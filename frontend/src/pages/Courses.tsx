import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { getAllCourses } from "../redux/reducer/courseReducer";
import { Box, Typography } from "@mui/material";
import CourseCard from "../components/CourseCard";

export default function Courses() {
    const state = useAppSelector(state => state.course);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const controller = new AbortController()
        dispatch(getAllCourses({signal: controller.signal, params: {}, requestData: {}}))
        return () => {
            controller.abort();
        }
    }, [])

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            rowGap: "5em"
        }}>
            <Typography variant="h3" sx={{textAlign: "center"}}>Courses</Typography>
            <Box 
            sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                gap: "1em",
            }}>
                {
                    state.entities.map(course => 
                        <CourseCard course={course}/>)
                }
            </Box>
        </Box>
    )
}