import { useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { getHole } from "../redux/reducer/holeReducer";
import { useEffect } from "react";
import { createRequestWithId, getTagByValue } from "../helper";
import { HoleDto } from "../types/dtos";
import { Box, Typography } from "@mui/material";
import { getHoleStats } from "../redux/reducer/statisticsReducer";
import { PieChart } from "@mui/x-charts";

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

    if (!holeReducer.entities[0]) {
        return;
    }
    
    const hole = holeReducer.entities[0];
    const {breakdownOfHoleResults, averageScore } = {...statisticsReducer.holeStats}

    return (
        <Box>
            <Typography variant="h1">Hole {hole.nthHole} at {hole.courseName}</Typography>
            <Typography variant="h4">Par {hole.par} {hole.length}m</Typography>
            {breakdownOfHoleResults && averageScore &&
            <>
            Average result: {Math.floor(averageScore * 100) / 100} {getTagByValue(Math.floor(averageScore))}
            <PieChart 
            series={[
                {
                    data: breakdownOfHoleResults.map((res, idx) => ({id: idx, value: res.count, label: res.identifier}))
                }
            ]} 
            height={300} 
            width={600}/>
            </>
            }
        </Box>
    )
}