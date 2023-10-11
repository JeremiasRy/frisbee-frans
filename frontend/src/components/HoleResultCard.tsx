import { Box, Typography } from "@mui/material";

export interface HoleResultCardProps {
    score: number
    count: number
    isLast: boolean
}

export default function HoleResultCard(props:HoleResultCardProps) {
    const { score, count, isLast } = {...props};

    const color = () => {
        if (score === 0) {
            return "white"
        } else if (score > 0) {
            return `rgba(200,0,0, ${0.2 * score})`
        } else {
            return `rgba(0,200,0, ${0.2 * Math.abs(score)})`
        }
    }

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
                backgroundColor: color(),
            }}>
                <Typography variant="h5" sx={{margin: "auto"}}>{count}</Typography>
        </Box>
    )
}