import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useEffect, useState } from "react";
import { getRound } from "../redux/reducer/roundReducer";
import { Box, Button } from "@mui/material";
import { createHoleResult, getAllHoleResults } from "../redux/reducer/holeResultReducer";
import { HoleResultDto } from "../types/dtos";

export default function ScoreCard() {
    const {id, holeNumber} = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const round = useAppSelector(state => state.round);
    const holeResult = useAppSelector(state => state.holeResult);
    const [throws, setThrows] = useState(0);
    const [penalties, setPenalties] = useState(0);

    useEffect(() => {
        const controller = new AbortController();
        setThrows(0)
        setPenalties(0)
        dispatch(getRound({
            id: parseInt(id as string),
            signal: controller.signal,
            requestData: {},
            params: {}
        }))
        return () => {
            controller.abort();
        }
    }, [id, holeNumber])

    useEffect(() => {
        const controller = new AbortController()
        if (holeResult.state === "created") {
            navigate(`/rounds/${id}/fill/${parseInt(holeNumber as string) + 1}`)
            dispatch(getAllHoleResults({requestData: {}, params: {}, signal: controller.signal}))
        }
        return () => {
            controller.abort();
        }
    }, [holeResult.state])

    if (!round.entities[0]) {
        return;
    }
    
    let hole = round.entities[0].course.holes.find(hole => hole.nthHole === parseInt(holeNumber as string))

    function handleResultSubmit() {
        const {userId, id: roundId} = {...round.entities[0]}
        const holeId = round.entities[0].course.holes.find(hole => hole.nthHole === parseInt(holeNumber as string))?.id as number;
        const controller = new AbortController();

        const requestData:HoleResultDto = {
            throws,
            userId,
            holeId,
            roundId,
            penalties
        }
        dispatch(createHoleResult({requestData, params: {}, signal: controller.signal}))
    }

    return (
        <>{hole?.length}
        <Button onClick={handleResultSubmit}>Submit and go to next hole?</Button>
        <Box>
        <Button onClick={() => setThrows(prev => prev - 1 < 0 ? 0 : prev - 1)}>-</Button>Throws: {throws}<Button onClick={() => setThrows(prev => prev + 1)}>+</Button>
        </Box>
        <Box>
        <Button onClick={() => setPenalties(prev => prev - 1 < 0 ? 0 : prev - 1)}>-</Button>Penalties: {penalties}<Button onClick={() => setPenalties(prev => prev + 1)}>+</Button>
        </Box>
        </>
    )
}