import { Box, Typography } from "@mui/material";
import { color } from "../helper";

export interface HoleResultCardProps {
    score: number
    count: number
    isLast: boolean
}

export default function HoleResultCard(props:HoleResultCardProps) {
    const { score, count, isLast } = {...props};

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                height: "5em",
                minWidth: "3em",
                maxWidth: "5em",
                borderLeft: "1px solid black",
                borderRight: isLast ? "1px solid Black" : "",
                backgroundColor: count > 0 ? color(score) : "white",
            }}>
                <Typography variant="h5" sx={{margin: "auto"}}>{Math.floor(count * 100) / 100}</Typography>
        </Box>
    )
}