import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

export interface RoundNthHoleIndicator {
    count: number,
}

export default function RoundNthHoleIndicator(props:RoundNthHoleIndicator) {
    const { count } = {...props};
    const { nthHole } = useParams();
    
    return (
        <Box sx={{
            display:"flex",
            flexDirection: "row",
            columnGap: "3em",
            justifyContent: "center"
        }}>
            {Array(count).fill(null).map((_, idx) => <HoleNumberIndicator number={idx + 1} selected={idx + 1 === parseInt(nthHole as string)} />)}
        </Box>
    )
}

export interface HoleNumberIndicatorProps {
    number:number,
    selected:boolean
}

export function HoleNumberIndicator(props:HoleNumberIndicatorProps) {
    const { number, selected } = {...props};

    return (
        <Box sx={{
            position: "relative",
            height: "2em",
            width: "2em",
        }}>
            <Box sx={{
                position: "absolute",
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
            }}>
                <Typography style={{
                    fontWeight: "400",
                    textAlign: "center",
                    verticalAlign: "center",
                    margin: "auto auto",
                    zIndex: "2"
                }}>{number}</Typography>
            </Box>
            {selected && <Box sx={{
                position: "absolute",
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                backgroundColor: "rgba(200,200,200,0.5)",
                zIndex: "1"
            }}/>}
        </Box>
    )
}