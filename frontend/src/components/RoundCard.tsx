import { Box, Paper, Typography } from "@mui/material";
import { HoleResult, Round } from "../types/models";
import  HoleResultCard from "./HoleResultCard";
import { ScoreDictionary } from "../helper";

export interface RoundCardProps {
    round: Round,
    localResults: HoleResult[] | null
}

export default function RoundCard(props:RoundCardProps) {
    const { round, localResults } = {...props}
    const sortedResults = [...round.roundResults].sort((a, b) => a.nthHole - b.nthHole);

    function returnResultsToRender():HoleResult[] {
        if (localResults) {
            return localResults.sort((a, b) => a.nthHole - b.nthHole);
        }
        return sortedResults
    }


    return (
        <Paper
        elevation={2} 
        sx={{
            display: "flex",
            flexDirection: "column",
            padding: "1em",
            columnGap: "0.5em",
            width: "100%",
            flexShrink: 0
        }}>
            <Typography variant={"h4"}>{round.course.name}</Typography>
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
                    width: "80%",
                    paddingLeft: "2em"
                }}>
                    {returnResultsToRender().filter(result => result.throws > 0).map((result, idx) => <HoleResultCard key={result.id} result={result} isLast={idx === sortedResults.length - 1} />)}
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
                <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    columnGap: "2em"
                }}>                    
                    <Box>
                        <Typography variant="h3" sx={{width: "5em"}}>Score: {returnResultsToRender().filter(res => res.throws > 0).map(res => res.throws + res.penalties - res.par).reduce((a, b) => a + b, 0)}</Typography>
                    </Box>
                </Box>
            </Box>
        </Paper>
    )
}