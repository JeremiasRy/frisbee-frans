import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { getAllCourses } from "../redux/reducer/courseReducer";
import { Box, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import { OnClickAction } from "../components/CourseCard";
import CourseCardWrapper from "../components/CourseCardWrapper";
import { Grades, createRequest } from "../helper";
import { CourseDto } from "../types/dtos";
import { SortDirection } from "../types/models";

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
    const [sortBy, setSortBy] = useState<SortBy>({direction: "NONE", column: "NONE"});
    const state = useAppSelector(state => state.course);
    const dispatch = useAppDispatch();
    let timeout:ReturnType<typeof setTimeout>;

    useEffect(() => {
        const controller = new AbortController()
        const request = createRequest<CourseDto>(controller.signal, {courseName: name, page, pageSize: 20, city, grade, sort: sortBy.direction, SortProperty: sortBy.column})
        timeout = setTimeout(() => {
            dispatch(getAllCourses({...request}));
        }, 200)
        return () => {
            controller.abort();
            if (timeout) {
                clearTimeout(timeout);
            }
        }
    }, [name, page, city, grade, sortBy?.column, sortBy?.direction])

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
    function handleSortByChange(_: any, value:string) {
        setSortBy(prev => ({...prev, column: value as SortColumn}))
    }
    function handleDirectionChange(_: any, value:string) {
        setPage(1);
        setSortBy(prev => ({...prev, direction: value as SortDirection}))
    }

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1em"
        }}>
            <Typography variant="h2" sx={{textAlign: "center"}}>{onClickAction === "Navigate" ? "Courses" : "Select a course"}</Typography>
            <TextField label="Find by name" onChange={handleNameFilterChange}/>
            <TextField label="Find by city" onChange={handleCityFilterChange}/>
            <Box>
                <FormControl fullWidth>
                    <InputLabel id="grade-filter-label">Grade</InputLabel>
                    <Select
                    labelId="grade-filter-label"
                    id="grade-filter-select"
                    value={grade}
                    label="Grade"
                    onChange={handleGradeFilterChange}
                    >
                    <MenuItem value="NONE">No filter</MenuItem>
                    {
                        Grades.map(grade => <MenuItem key={grade} value={grade}>{grade}</MenuItem>)
                    }
                    
                </Select>
                </FormControl>
            </Box>
            <Box>
                <FormControl>
                    <FormLabel id="sort-column-label">Sort By</FormLabel>
                    <RadioGroup
                    row
                    aria-labelledby="sort-column-label"
                    name="sort-by-radio-buttons"
                    onChange={handleSortByChange}
                    >
                        <FormControlLabel value="RoundsPlayed" control={<Radio />} label="Rounds played" />
                        <FormControlLabel value="Grade" control={<Radio />} label="Grade" />
                    </RadioGroup>
                </FormControl>
            </Box>
            {sortBy.column !== "NONE" &&
            <FormControl>
                <FormLabel id="sort-direction-label">Direction</FormLabel>
                <RadioGroup
                row
                aria-labelledby="sort-direction-label"
                name="sort-direction-radio-buttons"
                onChange={handleDirectionChange}
                >
                    <FormControlLabel value="ASCENDING" control={<Radio />} label="Ascending" />
                    <FormControlLabel value="DESCENDING" control={<Radio />} label="Descending" />
                </RadioGroup>
            </FormControl>
            }
            <CourseCardWrapper courses={state.entities} onClickAction={onClickAction} setCourse={setCourse} atBottom={atBottom} page={page} setAtBottom={setAtBottom} setPage={setPage}/>
        </Box>
    )
}