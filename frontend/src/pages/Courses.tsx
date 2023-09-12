import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { getAllCourses } from "../redux/reducer/courseReducer";
import { Box, Typography } from "@mui/material";
import { OnClickAction } from "../components/CourseCard";
import CourseCardWrapper from "../components/CourseCardWrapper";

export interface CoursesProps {
    onClickAction: OnClickAction
}

export default function Courses(props: CoursesProps) {
    const { onClickAction } = {...props};
    const state = useAppSelector(state => state.course);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const controller = new AbortController()
        dispatch(getAllCourses({signal: controller.signal, params: {}, requestData: {}}));
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
            <Typography variant="h2" sx={{textAlign: "center"}}>Courses</Typography>
            <CourseCardWrapper courses={state.entities} onClickAction={onClickAction} />
        </Box>
    )
}