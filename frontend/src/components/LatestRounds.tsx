import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getAllRounds } from "../redux/reducer/roundReducer";
import RoundCard from "./RoundCard";

export default function LatestRounds() {
    const state = useAppSelector(state => state.round);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const controller = new AbortController();
        if (state.state === "pending") {
            return;
        }
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
        <Typography variant="h2" sx={{textAlign: "center"}}>Latest</Typography>
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            rowGap: "1em"
        }}>
            {
                state.entities.map(round => 
                    <RoundCard key={round.id} round={round}/>
                )
            }
        </Box>
        
        </>
    )
}