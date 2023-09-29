import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import HoleNumberIndicator from "./HoleNumberIndicator";

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
            columnGap: "1em",
            justifyContent: "center"
        }}>
            {Array(count).fill(null).map((_, idx) => <HoleNumberIndicator key={Math.random() * 1000} number={idx + 1} selected={idx + 1 === parseInt(nthHole as string)} />)}
        </Box>
    )
}