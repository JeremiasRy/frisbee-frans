import { Box, Paper, Typography } from "@mui/material";
import { Round } from "../types/models";
import  HoleResultCard from "./HoleResultCard";

export interface RoundCardProps {
    round: Round
}

export default function RoundCard(props:RoundCardProps) {
    const { round } = {...props}
    const sortedResults = [...round.roundResults].sort((a, b) => a.nthHole - b.nthHole);

    return (
        <Paper
            elevation={2} 
            sx={{
                padding: "1em"
            }}>
            <Typography variant={"h4"}>{round.courseName}</Typography>
            <Typography 
                variant={"subtitle1"} 
                sx={{
                    paddingLeft: "0.5em"
            }}>By: {round.by}</Typography>
            <Box 
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingRight: "5em"
                }}>
                <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                }}>
                    {sortedResults.map((result, idx) => <HoleResultCard result={result} isLast={idx === sortedResults.length - 1} />)}
                </Box>
                <Box>
                    <Typography variant="h3">{round.roundResult}</Typography>
                </Box>
            </Box>
        </Paper>
    )
}