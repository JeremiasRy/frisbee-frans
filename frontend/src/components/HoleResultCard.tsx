import { Box, Typography } from "@mui/material";
import { HoleResult } from "../types/models";
import { GetScoreFromTag } from "../helper";

export interface HoleResultCardProps {
    result: HoleResult;
    isLast: boolean
}

export default function HoleResultCard(props:HoleResultCardProps) {
    const { result, isLast } = {...props};
    const numberRepresentationOfScoreTag = GetScoreFromTag(result.scoreTag);

    const color = () => {
        if (numberRepresentationOfScoreTag === 0) {
            return "white"
        } else if (numberRepresentationOfScoreTag > 0) {
            return `rgba(200,0,0, ${0.2 * numberRepresentationOfScoreTag})`
        } else {
            return `rgba(0,200,0, ${0.2 * Math.abs(numberRepresentationOfScoreTag)})`
        }
    }

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                height: "5em",
                width: "3em",
                borderLeft: "1px solid black",
                borderRight: isLast ? "1px solid Black" : "",
                backgroundColor: color(),
            }}>
                <Typography variant="h5" sx={{margin: "auto"}}>{result.throws + result.penalties}</Typography>
        </Box>
    )
}