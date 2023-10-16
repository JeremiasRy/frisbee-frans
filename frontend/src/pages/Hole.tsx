import { useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { getHole } from "../redux/reducer/holeReducer";
import { useEffect } from "react";
import { createRequest, createRequestWithId, getTagByValue } from "../helper";
import { HoleCommentDTO, HoleDto } from "../types/dtos";
import { Box, LinearProgress, Typography } from "@mui/material";
import { getHoleStats } from "../redux/reducer/statisticsReducer";
import { PieChart } from "@mui/x-charts";
import HoleResultCard from "../components/HoleResultCard";
import CommentOutlet from "../components/CommentOutlet";
import { createHoleComment, getAllHoleComments } from "../redux/reducer/holeCommentReducer";

export default function Hole() {
    const { id } = useParams()
    const holeReducer = useAppSelector(state => state.hole);
    const statisticsReducer = useAppSelector(state => state.statistics);
    const commentReducer = useAppSelector(state => state.holeComments);
    const loginReducer = useAppSelector(state => state.login);
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

    useEffect(() => {
        const controller = new AbortController();
        const request = createRequest<HoleCommentDTO>(controller.signal, {relationId: id})
        dispatch(getAllHoleComments({...request}))
        return () => {
            controller.abort();
        }
    }, [id])

    if (holeReducer.state === "pending" || !holeReducer.entities[0]) {
        return <LinearProgress />
    }
    
    const hole = holeReducer.entities[0];
    const {breakdownOfHoleResults, averageScore } = {...statisticsReducer.holeStats}
    const comments = commentReducer.entities;

    function submitComment(text:string) {
        const controller = new AbortController()
        const request = createRequest<HoleCommentDTO>(controller.signal, {}, {
            holeId: parseInt(id as string),
            text,
            userId: loginReducer.loggedIn?.id as number
        })
        dispatch(createHoleComment({...request}))
    }

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 4
        }}>
            <Typography variant="h1">Hole {hole.nthHole} at {hole.courseName}</Typography>
            <Typography variant="h4" textAlign={"center"}>Par {hole.par} | {hole.length}m</Typography>
            <Box 
            sx ={{
                display: "flex",
                flexDirection: "row"
            }}>
                <Box
                sx={{
                    width: "50%",
                    display: "flex",
                    flexDirection: "column",
                }}>
                    <CommentOutlet comments={comments} commentSubmitAction={submitComment} />
                </Box>
                <Box sx={{
                    width: "50%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center"
                }}>
                    {breakdownOfHoleResults !== undefined && averageScore !== undefined ? <>
                    <Typography variant="h2" textAlign={"center"}>Statistics</Typography>
                    <Box sx={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        gap: 2, 
                        alignItems: 'center', 
                        paddingTop: "5em" 
                        }}>
                            <Typography>Average result: </Typography>
                        <Box sx={{
                            width: "5em"
                        }}>
                            <HoleResultCard score={averageScore} count={hole.par + averageScore} isLast={true}/> 
                            <Typography textAlign={"center"}><b>{getTagByValue(Math.floor(averageScore))}</b></Typography>
                        </Box>
                        <Typography>Total throws tracked: {breakdownOfHoleResults.reduce((a, b) => { return a + b.count}, 0)}</Typography>
                        <Box sx={{ marginTop: 4, textAlign: 'center' }}>
                            
                            <Typography variant="h4">Result breakdown</Typography>
                            <PieChart 
                                series={[
                                {
                                    data: breakdownOfHoleResults.map((res, idx) => ({id: idx, value: res.count, label: res.identifier}))
                                }
                            ]} 
                            height={300} 
                            width={600}/>
                        </Box>
                    </Box></>
                    : <Typography variant="h4">No Statistics yet</Typography>}
                </Box>
            </Box>
        </Box>
    )
}