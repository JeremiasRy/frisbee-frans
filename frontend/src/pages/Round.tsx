import { Outlet, useNavigate, useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useEffect } from "react";
import { getRound, updateRound } from "../redux/reducer/roundReducer";
import { Box, Button, Typography } from "@mui/material";
import { HoleResultDto } from "../types/dtos";
import { Hole } from "../types/models";
import { createManyHoleResults } from "../redux/reducer/holeResultReducer";
import { setHoleReducerStateToIdle } from "../redux/reducer/holeReducer";

export default function Round() {
    const {id} = useParams();
    const dispatch = useAppDispatch();
    const round = useAppSelector(state => state.round);
    const holeResult = useAppSelector(state => state.holeResult);
    const navigate = useNavigate();

    useEffect(() => {
        const controller = new AbortController();
        if (round.state === "updated") {
            navigate(`score/${[...holeResult.entities].sort((a,b) => a.nthHole - b.nthHole)[0].id}`);
            return
        }
        dispatch(getRound({
            id: parseInt(id as string),
            requestData: {},
            params: {},
            signal: controller.signal
        }))
        
        return () => {
            controller.abort()
        }
    }, [id, round.state])

    useEffect(() => {
        const controller = new AbortController();
        if (holeResult.state === "created") {
            const {userId, courseId, id} = {...round.entities[0]}
            dispatch(setHoleReducerStateToIdle(""))
            dispatch(updateRound({
                id,
                signal: controller.signal,
                params: {},
                requestData: {
                    courseId,
                    userId,
                    status: "OnGoing"
                }
            }))

        }
    }, [holeResult.state])

    function createHoleResultDtoFromHole(hole:Hole):HoleResultDto {
        const {userId, id: roundId} = {...round.entities[0]}
        let holeResult:HoleResultDto = {
            userId,
            roundId,
            holeId: hole.id,
            throws: 0,
            penalties: 0
        }
        return holeResult
    }

    function createEmptyRoundDTOs():HoleResultDto[] {
        return round.entities[0].course.holes.map(hole => createHoleResultDtoFromHole(hole))
    }
    
    function handleRoundStart() {
        const controller = new AbortController();
        const emptyResults = createEmptyRoundDTOs();
        dispatch(createManyHoleResults({
            signal: controller.signal,
            params: {},
            requestData: emptyResults
        }))
    }

    if (round.entities.length === 0) {
        return;
    }

    return (
        <Box>
            <Typography variant="h1" textAlign={"center"}>Round at {round.entities[0].course.name}</Typography>
            {round.entities[0].status === "NotStarted" && <Button onClick={handleRoundStart}>Start round?</Button>}
            <Box>
                <Outlet />
            </Box>
        </Box>
    )
}