import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import { Hole } from "../types/models";
import { Direction, createRequest, createRequestWithId } from "../helper";
import ScoreControl from "./ScoreControl";
import { useLocalResults } from "../pages/Round";
import { updateManyHoleResults } from "../redux/reducer/holeResultReducer";
import { HoleResultDto, HoleResultWithIdDto, RoundDto } from "../types/dtos";
import { updateRound } from "../redux/reducer/roundReducer";

export default function ScoreInput() {
    const { nthHole } = useParams();
    const roundReducer = useAppSelector(state => state.round);
    const holeResultReducer = useAppSelector(state => state.holeResult);
    const dispatch = useAppDispatch();
    const pathArr = useLocation().pathname.split("/");
    const navigate = useNavigate();
    const [throws, setThrows] = useState(0);
    const [penalties, setPenalties] = useState(0);
    const [localRoundResults, setLocalRoundResults] = useLocalResults();

    useEffect(() => {
        if (!localRoundResults || localRoundResults?.length === 0) {
            setLocalRoundResults(roundReducer.entities[0].roundResults.map(holeResult => holeResult))
            return;
        }
    }, [])

    if (!localRoundResults) {
        return;
    }
    
    const round = roundReducer.entities[0];
    const course = round.course;
    const enteredScoreOnAllHoles = localRoundResults.every(holeResult => holeResult.throws > 0);

    const hole = nthHole 
    ? course.holes[parseInt(nthHole) - 1] as Hole 
    : undefined

    function handleNavigationButtonChange(direction:Direction) {
        setLocalRoundResults(prev => prev?.map((holeResult, idx) => idx + 1 === parseInt(nthHole as string) ? { ...holeResult, throws: throws, penalties: penalties } : holeResult))
        const nextHoleNth = direction === "Next" ? parseInt(nthHole as string) + 1 : parseInt(nthHole as string) - 1;
        const nextHole = localRoundResults[nextHoleNth - 1]

        if (nextHole) {
            setThrows(nextHole.throws);
            setPenalties(nextHole.penalties);
        }
        pathArr[pathArr.length - 1] = nextHoleNth.toString();
        navigate(pathArr.join("/"));
    }

    function submitRound() {
        const controller = new AbortController();
        const requestData = createHoleResultDTOs();
        const request = createRequest<HoleResultDto[]>(controller.signal, {}, requestData);
        dispatch(updateManyHoleResults({...request}))
        const roundDto:RoundDto = {
            userId: round.userId,
            courseId: course.id,
            status: "Completed"
        }
        const roundRequest = createRequestWithId<RoundDto>(round.id, controller.signal, {}, roundDto)
        dispatch(updateRound({...roundRequest}))
    }

    function createHoleResultDTOs():HoleResultWithIdDto[] {
        return localRoundResults.map(holeResult => ({
            id: holeResult.id, 
            userId: holeResult.userId, 
            holeId: holeResult.holeId, 
            roundId: holeResult.roundId,
            throws: holeResult.throws,
            penalties: holeResult.penalties
        }))
    }

    return (
        <Box sx={{
            display: "flex",
            padding: "2em",
            flexDirection: "column",
            alignItems: "center",
            rowGap: "5em",
        }}>
            {hole && <ScoreControl courseLength={course.holes.length} throws={throws} penalties={penalties} setThrows={setThrows} setPenalties={setPenalties} hole={hole} handleNavigationChange={handleNavigationButtonChange} />}
            {enteredScoreOnAllHoles && <Button disabled={roundReducer.state === "pending" || holeResultReducer.state === "pending"} onClick={submitRound} variant="contained">Submit round</Button>}
        </Box>
    )
}
