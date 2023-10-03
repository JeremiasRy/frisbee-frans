import { Outlet, useLocation, useNavigate, useOutletContext, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { Hole, HoleResult } from "../types/models";
import { CourseDto, HoleResultDto, RoundDto } from "../types/dtos";
import { useEffect, useState } from "react";
import { getRound, updateRound } from "../redux/reducer/roundReducer";
import { Box, Button } from "@mui/material";
import { createManyHoleResults } from "../redux/reducer/holeResultReducer";
import RoundCard from "../components/RoundCard";
import { createRequest, createRequestWithId } from "../helper";

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
        const request = createRequestWithId<RoundDto>(id, controller.signal)
        dispatch(getRound({...request}))
        return () => {
            controller.abort()
        }
    }, [id, location.pathname])

    useEffect(() => {
        const controller = new AbortController();
        if (roundReducer.state === "succeeded" && roundReducer.entities[0].roundResults.length === 0 && roundReducer.entities[0].status === "NotStarted") {
            const request = createRequest<HoleResultDto[]>(controller.signal, {}, createEmptyHoleresultDTOs())
            console.log(request)
            dispatch(createManyHoleResults({...request}));
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
        const dto:RoundDto = {
            userId,
            courseId,
            status: "OnGoing"
        }
        const request = createRequestWithId<RoundDto>(id, controller.signal, {}, dto)
        console.log(request);
        dispatch(updateRound({...request}))
    }

    if (roundReducer.entities.length === 0) {
        return;
    }

    const round = roundReducer.entities[0];

    if (round.status === "OnGoing") {
        !location.pathname.includes("scoreinput") && navigate("scoreinput/1");
    }
    if (round.status === "Completed") {
        location.pathname.includes("scoreinput") && navigate("");
    }

    return (
        <Box sx={{
            width: "90%"
        }}>
            {round.status === "NotStarted" && <Button disabled={roundReducer.state === "pending"} onClick={() => startRound()}>Start the round?</Button>}
            <Outlet context={[localRoundResults, setLocalRoundResults]}/>
            <RoundCard round={roundReducer.entities[0]} localResults={round.status === "OnGoing" ? localRoundResults as HoleResult[] : null} />
        </Box>
    )
}

export function useLocalResults() {
    return useOutletContext<ContextType>();
}