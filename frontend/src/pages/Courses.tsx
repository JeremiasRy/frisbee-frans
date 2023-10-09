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
    const [name, setName] = useState("");
    const [city, setCity] = useState("");
    const [atBottom, setAtBottom] = useState(false);
    const [page, setPage] = useState(1);
    const state = useAppSelector(state => state.course);
    const dispatch = useAppDispatch();
    let timeout:ReturnType<typeof setTimeout>;

    useEffect(() => {
        const controller = new AbortController()
        const request = createRequest<CourseDto>(controller.signal, {courseName: name, page, pageSize: 20, city})
        timeout = setTimeout(() => {
            dispatch(getAllCourses({...request}));
        }, 200)
        return () => {
            controller.abort();
            if (timeout) {
                clearTimeout(timeout);
            }
        }
    }, [name, page, city])

    function handleNameFilterChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setPage(1);
        setName(e.currentTarget.value);
    }
    function handleCityFilterChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setPage(1);
        setCity(e.currentTarget.value)
    }

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1em"
        }}>
            <Typography variant="h2" sx={{textAlign: "center"}}>{onClickAction === "Navigate" ? "Courses" : "Select a course"}</Typography>
            <TextField label="Filter by name" onChange={handleNameFilterChange}/>
            <TextField label="Filter by city" onChange={handleCityFilterChange}/>
            <CourseCardWrapper courses={state.entities} onClickAction={onClickAction} setCourse={setCourse} atBottom={atBottom} page={page} setAtBottom={setAtBottom} setPage={setPage}/>
        </Box>
    )
}