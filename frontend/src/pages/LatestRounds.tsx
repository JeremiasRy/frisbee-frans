import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getAllRounds } from "../redux/reducer/roundReducer";
import RoundCard from "../components/RoundCard";

export default function LatestRounds() {
    const state = useAppSelector(state => state.round);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const controller = new AbortController();
        dispatch(getAllRounds({
            signal: controller.signal,
            params: {},
            requestData: {}
        }));
        return () => {
            controller.abort();
        }
    }, [])

    return (
        <>
        <Typography variant="h2" sx={{textAlign: "center", marginBottom: "1em"}}>Latest</Typography>
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            rowGap: "1em",
            height: "100%",
            maxWidth: "80vw",
            overflow: "auto"
        }}>
            {
                state.entities.filter(round => round.status === "Completed").map(round => 
                    <RoundCard key={round.id} round={round}/>
                )
            }
        </Box>
        
        </>
    )
}