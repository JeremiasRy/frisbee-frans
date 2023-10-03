import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { getAllCourses } from "../redux/reducer/courseReducer";
import { Box, TextField, Typography } from "@mui/material";
import { OnClickAction } from "../components/CourseCard";
import CourseCardWrapper from "../components/CourseCardWrapper";
import { createRequest } from "../helper";
import { CourseDto } from "../types/dtos";

export interface CoursesProps {
    onClickAction: OnClickAction
    setCourse: React.Dispatch<React.SetStateAction<number>>
}

export default function Courses(props: CoursesProps) {
    const { onClickAction, setCourse } = {...props};
    const [filter, setFilter] = useState("");
    const state = useAppSelector(state => state.course);
    const dispatch = useAppDispatch();
    let timeout:ReturnType<typeof setTimeout>;

    useEffect(() => {
        const controller = new AbortController()
        const request = createRequest<CourseDto>(controller.signal, {name: filter})
        timeout = setTimeout(() => {
            dispatch(getAllCourses({...request}));
        }, 500)

        return () => {
            controller.abort();
            if (timeout) {
                clearTimeout(timeout);
            }
        }
    }, [filter])

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            rowGap: "5em"
        }}>
            <Typography variant="h2" sx={{textAlign: "center"}}>{onClickAction === "Navigate" ? "Courses" : "Select a course"}</Typography>
            <TextField label="Filter by name" onChange={(e) => {setFilter(e.currentTarget.value)}}/>
            <CourseCardWrapper courses={state.entities} onClickAction={onClickAction} setCourse={setCourse}/>
        </Box>
    )
}