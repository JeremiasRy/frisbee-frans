import { Box, Button, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import RoundCard from "../components/RoundCard";
import { useEffect, useState } from "react";
import { getAllRounds } from "../redux/reducer/roundReducer";
import { useNavigate } from "react-router-dom";

export default function Rounds() {
    const state = useAppSelector(state => state.round);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    //filter params to implement
    const [user, setUser] = useState(-1);
    const [course, setCourse] = useState(-1);

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
        <Typography variant="h2" sx={{textAlign: "center", marginBottom: "1em"}}>Rounds</Typography>
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            rowGap: "1em"
        }}>
            <Box sx={{
            display: "flex",
            flexDirection: "column",
            rowGap: "1em"
            }}>
                <Button variant="contained" onClick={() => navigate("new")}>Start a new round?</Button>
                <Button variant="contained">Search for rounds</Button>
            </Box>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                rowGap: "1em",
                height: "100%",
                maxWidth: "80vw",
                overflow: "auto"
            }}>
                {
                    state.entities.map(round => 
                        <RoundCard key={round.id} round={round} localResults={null}/>
                    )
                }
            </Box>
        </Box>
        
        </>
    )
}