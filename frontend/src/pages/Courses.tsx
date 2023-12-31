import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { getAllCourses } from "../redux/reducer/courseReducer";
import { Box, SelectChangeEvent, TextField, Typography } from "@mui/material";
import { OnClickAction } from "../components/CourseCard";
import CourseCardWrapper from "../components/CourseCardWrapper";
import { createRequest } from "../helper";
import { CourseDto } from "../types/dtos";
import { SortDirection } from "../types/models";
import GradeFilter from "../components/GradeFilter";
import CourseSortFilter from "../components/CourseSortFilter";

export interface CoursesProps {
    onClickAction: OnClickAction
    setCourse: React.Dispatch<React.SetStateAction<number>>
}
export type SortColumn = "Grade" | "RoundsPlayed" | "NONE";

export interface SortBy {
    column: SortColumn,
    direction: SortDirection
}

export default function Courses(props: CoursesProps) {
    const { onClickAction, setCourse } = {...props};
    const [name, setName] = useState("");
    const [city, setCity] = useState("");
    const [grade, setGrade] = useState("NONE");
    const [atBottom, setAtBottom] = useState(false);
    const [page, setPage] = useState(1);
    const [sortBy, setSortBy] = useState<SortBy>({direction: "DESCENDING", column: "RoundsPlayed"});
    const state = useAppSelector(state => state.course);
    const dispatch = useAppDispatch();
    const timeout = useRef<ReturnType<typeof setTimeout>>();

    useEffect(() => {
        const controller = new AbortController()
        const sort = sortBy.column !== "NONE" && sortBy.direction !== "NONE" ? {sort: sortBy.direction, SortProperty: sortBy.column} : {sort: "NONE", SortProperty: "NONE"}
        const request = createRequest<CourseDto>(controller.signal, {courseName: name, page, pageSize: 20, city, grade, ...sort})
        timeout.current = setTimeout(() => {
            dispatch(getAllCourses({...request}));
        }, 200)
        return () => {
            controller.abort();
            if (timeout.current) {
                clearTimeout(timeout.current);
            }
        }
    }, [name, page, city, grade, sortBy.column, sortBy.direction])

    function handleNameFilterChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setPage(1);
        setName(e.currentTarget.value);
    }
    function handleCityFilterChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setPage(1);
        setCity(e.currentTarget.value)
    }
    function handleGradeFilterChange(e: SelectChangeEvent) {
        setPage(1);
        setGrade(e.target.value);
    }
    function handleSortByChange(e: SelectChangeEvent) {
        setPage(1);
        if (e.target.value === "NONE") {
            setSortBy({column: "NONE", direction: "NONE"});
            return;
        }
        setSortBy(prev => ({...prev, column: e.target.value as SortColumn}))
    }
    function handleDirectionChange(e: SelectChangeEvent) {
        setPage(1);
        setSortBy(prev => ({...prev, direction: e.target.value as SortDirection}))
    }
    function handleClear() {
        setPage(1);
        setSortBy({column: "NONE", direction: "NONE"})
    }

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1em"
        }}>
            <Typography variant="h2" sx={{textAlign: "center"}}>{onClickAction === "Navigate" ? "Courses" : "Select a course"}</Typography>
            <Box sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly"
            }}>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    width: "40%",
                    gap: "1em",
                }}>
                    <TextField label="Find by name" onChange={handleNameFilterChange}/>
                    <TextField label="Find by city" onChange={handleCityFilterChange}/>
                </Box>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    gap: "1em",
                    width: "40%"
                }}>
                    <CourseSortFilter disabled={grade !== "NONE"} handleSortByChange={handleSortByChange} handleDirectionChange={handleDirectionChange} setSortBy={setSortBy} sortBy={sortBy} handleClear={handleClear}/>
                    <GradeFilter disabled={!(sortBy.column === "NONE" && sortBy.direction === "NONE")} grade={grade} handleGradeFilterChange={handleGradeFilterChange} />
                </Box>
            </Box>
                <CourseCardWrapper courses={state.entities} onClickAction={onClickAction} setCourse={setCourse} atBottom={atBottom} page={page} setAtBottom={setAtBottom} setPage={setPage}/>
        </Box>
    )
}