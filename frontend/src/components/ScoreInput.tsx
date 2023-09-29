import { useLocation, useNavigate, useOutletContext, useParams } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { useState } from "react";
import RoundCard from "./RoundCard";
import { Box, Button, Typography } from "@mui/material";
import { Hole, HoleResult } from "../types/models";
import { Direction } from "../helper";
import ScoreControl from "./ScoreControl";
import { useLocalResults } from "../pages/Round";

export default function ScoreInput() {
    const { nthHole } = useParams();
    const roundReducer = useAppSelector(state => state.round);
    const pathArr = useLocation().pathname.split("/");
    const navigate = useNavigate();
    const [throws, setThrows] = useState(0);
    const [penalties, setPenalties] = useState(0);
    const [localRoundResults, setLocalRoundResults] = useLocalResults();

    if (!localRoundResults || localRoundResults?.length === 0) {
        setLocalRoundResults(roundReducer.entities[0].roundResults.map(holeResult => holeResult))
        return;
    }
    
    const round = roundReducer.entities[0];
    const course = round.course;
    const enteredScoreOnAllHoles = localRoundResults.every(holeResult => holeResult.throws > 0);

    const hole = nthHole 
    ? course.holes.find(hole => hole.nthHole === parseInt(nthHole)) as Hole 
    : undefined

    function HandleNavigationButtonChange(direction:Direction) {
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

    return (
        <Box sx={{
            display: "flex",
            padding: "2em",
            flexDirection: "column",
            alignItems: "center",
            rowGap: "5em",
        }}>
            <Typography variant="h4">Round at {course.name}</Typography>
            {hole && <ScoreControl courseLength={course.holes.length} throws={throws} penalties={penalties} setThrows={setThrows} setPenalties={setPenalties} hole={hole} handleNavigationChange={HandleNavigationButtonChange} />}
            {enteredScoreOnAllHoles && <Button>Submit round?</Button>}
        </Box>
    )
}
