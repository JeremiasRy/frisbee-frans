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

    return (
        <Box
            sx={{
                height: "5em",
                width: "3em",
                borderLeft: "1px solid black",
                borderRight: isLast ? "1px solid Black" : "",
                textAlign: "center"
            }}>
                <Typography variant="h5">{numberRepresentationOfScoreTag}</Typography>
        </Box>
    )
}