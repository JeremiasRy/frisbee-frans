import { useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { getCourseById } from "../redux/reducer/courseReducer";
import { useEffect } from "react";
import { getCourseStats } from "../redux/reducer/statisticsReducer";
import { Box, LinearProgress, Paper, Typography } from "@mui/material";
import HoleCardBox from "../components/HoleCardBox";
import { createRequestWithId } from "../helper";
import { CourseDto } from "../types/dtos";
import { GradeBox } from "../components/GradeBox";

export default function Course() {
    const { id } = useParams();
    const courseReducer = useAppSelector(state => state.course);
    const statisticsReducer = useAppSelector(state => state.statistics)
    const dispatch = useAppDispatch();

    useEffect(() => {
        const controller = new AbortController();
        const request = createRequestWithId<CourseDto>(id, controller.signal)
        dispatch(getCourseById({...request}))
        return () => {
            controller.abort();
        }
    }, [id])

    useEffect(() => {
        const controller = new AbortController();
        dispatch(getCourseStats({
            id: parseInt(id as string),
            signal: controller.signal
        }))
        return () => {
            controller.abort();
        }
    }, [id])

    if (courseReducer.state === "pending" || statisticsReducer.courseStats === null) {
        return (
            <LinearProgress />
        )
    }

    const course = courseReducer.entities[0];
    const {roundsPlayed, averageScore, bestScore} = {...statisticsReducer.courseStats}
    
    return (
        <>
        <Typography variant="h1">{course.name}</Typography>
        <GradeBox grade={course.courseGrade} />
        {roundsPlayed && averageScore && bestScore && <>
            <Typography variant="h4">Rounds played: {roundsPlayed}</Typography>
            <Typography variant="h5">Average: {Math.floor(averageScore * 100) / 100} {averageScore < 0 ? "under par" : "over par"}</Typography>
            <Typography variant="h5">Course record: {bestScore}</Typography></>
        }
        <Typography variant="h4" textAlign={"center"}>Layout</Typography>
        <Paper sx={{
            padding: "5em",
            borderRadius: "5em",
        }}>
            <Box sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "row",
                flexWrap: "wrap",
                gap: "1em",
                margin: "auto auto"
            }}>
            {course.holes.map(hole => 
                <HoleCardBox key={hole.id} hole={hole}/>
            )}
            </Box>
        </Paper>
        </>
    )
}