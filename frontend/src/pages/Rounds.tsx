import { Box, Button, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import LinearProgress from '@mui/material/LinearProgress';
import { useEffect, useState } from "react";
import { getAllRounds } from "../redux/reducer/roundReducer";
import { useNavigate } from "react-router-dom";
import ScrollableBox from "../components/ScrollableBox";

export default function Rounds() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const roundReducer = useAppSelector(state => state.round);
    //filter params to implement
    const [user, setUser] = useState(-1);
    const [course, setCourse] = useState(-1);
    const [page, setPage] = useState(1);
    const [atBottom, setAtBottom] = useState<boolean>(false)

    useEffect(() => {
        const controller = new AbortController();
        dispatch(getAllRounds({
            signal: controller.signal,
            params: {
                page,
                pageSize: 5
            },
            requestData: {}
        }));
        return () => {
            controller.abort();
        }
    }, [page])

    if (!roundReducer.entities[0]) {
        return;
    }

    return (
        <>
        <Typography variant="h2" sx={{textAlign: "center", marginBottom: "1em"}}>Rounds</Typography>
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            rowGap: "1em",
            width: "100%",
        }}>
            <Box sx={{
            display: "flex",
            flexDirection: "column",
            rowGap: "1em",
            }}>
                <Button variant="contained" onClick={() => navigate("new")}>Start a new round?</Button>
                <Button variant="contained">Search for rounds</Button>
            </Box>
            <ScrollableBox height={70} rounds={roundReducer.entities} atBottom={atBottom} page={page} setAtBottom={setAtBottom} setPage={setPage} />
            {atBottom && roundReducer.state === "pending" && <LinearProgress />}
        </Box>
        
        </>
    )
}