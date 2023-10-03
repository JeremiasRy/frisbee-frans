import { useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { getHole } from "../redux/reducer/holeReducer";
import { useEffect } from "react";
import { createRequestWithId } from "../helper";
import { CourseDto, HoleDto } from "../types/dtos";
import { Box, Typography } from "@mui/material";
import { getCourseById } from "../redux/reducer/courseReducer";
import { getHoleStats } from "../redux/reducer/statisticsReducer";

export default function Hole() {
    const { id } = useParams()
    const holeReducer = useAppSelector(state => state.hole);
    const statisticsReducer = useAppSelector(state => state.statistics);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const controller = new AbortController();
        const request = createRequestWithId<HoleDto>(id, controller.signal)
        dispatch(getHole({...request}))
        return () => {
            controller.abort();
        }
    }, [id])

    useEffect(() => {
        const controller = new AbortController();
        dispatch(getHoleStats({
            id: parseInt(id as string),
            signal: controller.signal
        }))
        return () => {
            controller.abort();
        }
    }, [id])

    if (!holeReducer.entities[0] || !statisticsReducer.holeStats) {
        return;
    }
    
    const hole = holeReducer.entities[0];
    const {averageScore, breakdownOfHoleResults} = statisticsReducer.holeStats

    console.log(breakdownOfHoleResults)
    console.log(averageScore)

    return (
        <Box>
            <Typography variant="h1">Hole {hole.nthHole} at {hole.courseName}</Typography>
        </Box>
    )
}