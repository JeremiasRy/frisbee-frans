import { useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { getHole } from "../redux/reducer/holeReducer";
import { useEffect } from "react";
import { createRequestWithId, getTagByValue } from "../helper";
import { HoleDto } from "../types/dtos";
import { Box, LinearProgress, Typography } from "@mui/material";
import { getHoleStats } from "../redux/reducer/statisticsReducer";
import { PieChart } from "@mui/x-charts";
import HoleResultCard from "../components/HoleResultCard";

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

    if (holeReducer.state === "pending" || !holeReducer.entities[0]) {
        return <LinearProgress />
    }
    
    const hole = holeReducer.entities[0];
    const {breakdownOfHoleResults, averageScore } = {...statisticsReducer.holeStats}

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 4
        }}>
            <Typography variant="h1">Hole {hole.nthHole} at {hole.courseName}</Typography>
            <Typography variant="h4" textAlign={"center"}>Par {hole.par} | {hole.length}m</Typography>
            {breakdownOfHoleResults !== undefined && averageScore !== undefined &&
            <Box sx={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start"
            }}>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                }}>
                    <Typography>Average result:</Typography> 
                    <HoleResultCard score={Math.floor(averageScore * 100) / 100} count={Math.floor(averageScore * 100) / 100} isLast={true}/> 
                    <Typography><b>{getTagByValue(Math.floor(averageScore))}</b></Typography>
                </Box>
            <PieChart 
            series={[
                {
                    data: breakdownOfHoleResults.map((res, idx) => ({id: idx, value: res.count, label: res.identifier}))
                }
            ]} 
            height={300} 
            width={600}/>
            </Box>
            }
        </Box>
    )
}