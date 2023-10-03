import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { Hole } from "../types/models";
import { Direction } from "../helper";
import ScoreControl from "./ScoreControl";
import { useLocalResults } from "../pages/Round";
import { updateManyHoleResults } from "../redux/reducer/holeResultReducer";
import { HoleResultWithIdDto, RoundDto } from "../types/dtos";
import { updateRound } from "../redux/reducer/roundReducer";

export default function ScoreInput() {
    const { nthHole } = useParams();
    const roundReducer = useAppSelector(state => state.round);
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
    ? course.holes.find(hole => hole.nthHole === parseInt(nthHole)) as Hole 
    : undefined

    function handleNavigationButtonChange(direction:Direction) {
        setLocalRoundResults(prev => prev?.map(roundResult => roundResult.nthHole === parseInt(nthHole as string) ? { ...roundResult, throws: throws, penalties: penalties } : roundResult))
        const nextHoleNth = direction === "Next" ? parseInt(nthHole as string) + 1 : parseInt(nthHole as string) - 1;
        const nextHole = localRoundResults?.find(roundResult => roundResult.nthHole === nextHoleNth);
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
        dispatch(updateManyHoleResults({
            signal: controller.signal,
            params: {},
            requestData
        }))
        const roundDto:RoundDto = {
            userId: round.userId,
            courseId: course.id,
            status: "Completed"
        }
        dispatch(updateRound({
            id: round.id,
            signal: controller.signal,
            params: {},
            requestData: roundDto
        }))
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
            <Typography variant="h4">Round at {course.name}</Typography>
            {hole && <ScoreControl courseLength={course.holes.length} throws={throws} penalties={penalties} setThrows={setThrows} setPenalties={setPenalties} hole={hole} handleNavigationChange={handleNavigationButtonChange} />}
            {enteredScoreOnAllHoles && <Button onClick={submitRound}>Submit round?</Button>}
        </Box>
    )
}
