import { Outlet, useLocation, useNavigate, useOutletContext, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { Hole, HoleResult } from "../types/models";
import { HoleResultDto } from "../types/dtos";
import { useEffect, useState } from "react";
import { getRound, updateRound } from "../redux/reducer/roundReducer";
import { Box, Button } from "@mui/material";
import { createManyHoleResults } from "../redux/reducer/holeResultReducer";
import RoundCard from "../components/RoundCard";

type ContextType = [HoleResult[], React.Dispatch<React.SetStateAction<HoleResult[]>>] 

export default function Round() {
    const { id } = useParams();
    const roundReducer = useAppSelector(state => state.round)
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [localRoundResults, setLocalRoundResults] = useState<HoleResult[]>();
    
    useEffect(() => {
        const controller = new AbortController();
        dispatch(getRound({
            id: parseInt(id as string),
            signal: controller.signal,
            params: {},
            requestData: {}
        }))
        return () => {
            controller.abort()
        }
    }, [id])

    useEffect(() => {
        const controller = new AbortController();
        if (roundReducer.state === "succeeded" && roundReducer.entities[0].roundResults.length === 0) {
            dispatch(createManyHoleResults({
                signal: controller.signal,
                params: {},
                requestData: createEmptyHoleresultDTOs()
            }));
        }
        return () => {
            controller.abort();
        }
    }, [roundReducer.state])
    
    function createEmptyHoleresultDTOs() {
        return roundReducer.entities[0].course.holes.map(hole => createHoleResultDTOfromHole(hole))
    }

    function createHoleResultDTOfromHole(hole:Hole) {
        const {userId, id: roundId} = {...roundReducer.entities[0]};
        let holeResultDto:HoleResultDto = {
            userId,
            roundId,
            holeId: hole.id,
            throws: 0,
            penalties: 0
        }
        return holeResultDto;
    }

    function startRound() {
        const controller = new AbortController();
        const {userId, courseId} = {...round}
        dispatch(updateRound({
            id: parseInt(id as string),
            signal: controller.signal,
            params: {},
            requestData: {
                userId,
                courseId,
                status: "OnGoing" 
            }
        }))
    }

    if (roundReducer.entities.length === 0) {
        return;
    }

    const round = roundReducer.entities[0];

    if (round.status === "OnGoing") {
        !location.pathname.includes("scoreinput") && navigate("scoreinput/1");
    }

    return (
        <Box>
            {round.status === "NotStarted" && <Button onClick={() => startRound()}>Start the round?</Button>}
            <Outlet context={[localRoundResults, setLocalRoundResults]}/>
            <RoundCard round={roundReducer.entities[0]} localResults={localRoundResults as HoleResult[]} />
        </Box>
    )
}

export function useLocalResults() {
    return useOutletContext<ContextType>();
}