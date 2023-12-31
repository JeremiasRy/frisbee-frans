import { Box, Paper, Typography } from "@mui/material";
import { HoleResult, Round } from "../types/models";
import  HoleResultCard from "./HoleResultCard";
import StopCircleIcon from '@mui/icons-material/StopCircle';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import CheckIcon from '@mui/icons-material/Check';
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export interface RoundCardProps {
    round: Round,
    localResults: HoleResult[] | null
}

export default function RoundCard(props:RoundCardProps) {
    const [elevation, setElevation] = useState(2);
    const { round, localResults } = {...props}
    const sortedResults = [...round.roundResults].sort((a, b) => a.nthHole - b.nthHole);
    const resultsToRender = localResults ? localResults.sort((a, b) => a.nthHole - b.nthHole).filter(result => result.throws > 0) : sortedResults
    const navigate = useNavigate();

    function returnRoundStatusIcon() {
        switch (round.status) {
            case "NotStarted": return <StopCircleIcon />
            case "OnGoing": return <PlayCircleOutlineIcon />
            case "Completed": return <CheckIcon />
        }
    }
    function prePaddingToScore(score:number) {
        if (score === 0) {
            return "±"
        }
        if (score > 0) {
            return "+"
        }  else {
            return ""
        }
    }

    const score = resultsToRender.filter(res => res.throws > 0).map(res => res.throws + res.penalties - res.par).reduce((a, b) => a + b, 0)
    const scoreString = `${prePaddingToScore(score)}${score}`
  
    return (
        <Paper
        onClick={() => navigate(`/rounds/${round.id}`)}
        elevation={elevation} 
        onMouseEnter={() => setElevation(4)}
        onMouseLeave={() => setElevation(2)}
        sx={{
            display: "flex",
            flexDirection: "column",
            padding: "1em",
            columnGap: "0.5em",
            width: "65vw",
            flexShrink: 0,
            "&:hover": {
                cursor: "pointer"
            }
        }}>
            <Typography variant={"h4"}>{round.course.name}</Typography>
            {returnRoundStatusIcon()}
            <Typography 
            variant={"subtitle1"} 
            sx={{
                paddingLeft: "0.5em"
            }}>
                By: {round.by}
            </Typography>
            <Typography 
            variant={"subtitle2"}
            >
                {new Date(round.createdAt).toLocaleDateString()}
            </Typography>
            <Box 
            sx={{
                display: "flex",
                flexDirection: "row",
                paddingRight: "5em"
            }}>
                <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    width: "100%",
                    paddingLeft: "2em",
                    rowGap: "1em"
                }}>
                    {resultsToRender.filter(result => result.throws > 0).map((result, idx) => <HoleResultCard key={result.id} score={result.throws + result.penalties - result.par} count={result.throws + result.penalties} isLast={idx === resultsToRender.length - 1} />)}
                    <Box 
                    sx={{
                        width: "5em", 
                        marginLeft: "1em", 
                        display: "flex", 
                        flexDirection: "column", 
                        alignItems: "center"
                    }}>
                        {!localResults && 
                        <Box sx={{margin: "auto"}}>
                            <Typography>total: {round.roundTotal}</Typography>
                            <Typography>par: {round.course.coursePar}</Typography>
                        </Box>
                        } 
                    </Box>
                </Box>
                <Typography variant="h3" textAlign="right"sx={{width: "5em"}}>{scoreString}</Typography>
            </Box>
        </Paper>
    )
}