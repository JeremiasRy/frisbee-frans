import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { SetStateAction, useEffect, useState } from "react";
import { getRound } from "../redux/reducer/roundReducer";
import RoundCard from "../components/RoundCard";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { ResultInput } from "../components/ResultInput";
import { Hole, HoleResult } from "../types/models";
import RoundNthHoleIndicator from "../components/RoundNthHoleIndicator";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

export default function ScoreInput() {
    const { id, nthHole } = useParams();
    const roundReducer = useAppSelector(state => state.round);
    const pathArr = useLocation().pathname.split("/");
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [throws, setThrows] = useState(0);
    const [penalties, setPenalties] = useState(0);
    const [localRoundResults, setLocalRoundResults] = useState<HoleResult[]>();
    type Direction = "Next" | "Previous";

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

    if (roundReducer.entities.length === 0) {
        return;
    }
    if (!localRoundResults) {
        setLocalRoundResults(roundReducer.entities[0].roundResults.map(holeResult => holeResult))
        return;
    }
    const round = roundReducer.entities[0];
    const course = round.course;

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
            {nthHole === undefined && <Button onClick={() => navigate("1")}>Go to first hole?</Button>}
            {hole &&
            <Box sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                rowGap: "2em"
            }}>
                <Outlet />
                <RoundNthHoleIndicator count={course.holes.length} />
                <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around"
                }}>
                    <IconButton size="large" onClick={() => HandleNavigationButtonChange("Previous")}><ArrowBackIosIcon/></IconButton>
                    <ResultInput par={hole.par} throws={throws} setThrows={setThrows} penalties={penalties} setPenalties={setPenalties} />
                    <IconButton size="large" onClick={() => HandleNavigationButtonChange("Next")}><ArrowForwardIosIcon/></IconButton>
                </Box>
            </Box>
            }
            <RoundCard round={roundReducer.entities[0]} localResults={localRoundResults} />
        </Box>
    )
}