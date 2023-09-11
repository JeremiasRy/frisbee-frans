import { Typography } from "@mui/material";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getAllRounds } from "../redux/reducer/roundReducer";

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

    console.log(state.entities)

    return (
        <>
        <Typography variant="h2" sx={{textAlign: "center"}}>Latest</Typography>
        </>
    )
}