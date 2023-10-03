import { Box, Button, TextField, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import LinearProgress from '@mui/material/LinearProgress';
import { useEffect, useState } from "react";
import { getAllRounds } from "../redux/reducer/roundReducer";
import { useNavigate } from "react-router-dom";
import ScrollableBox from "../components/ScrollableBox";
import { createRequest } from "../helper";
import { RoundDto } from "../types/dtos";

export default function Rounds() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const roundReducer = useAppSelector(state => state.round)
    const loginReducer = useAppSelector(state => state.login)
    const [userId, setUserId] = useState(0);
    const [username, setUsername] = useState("");
    const [course, setCourse] = useState("");
    const [page, setPage] = useState(1);
    const [atBottom, setAtBottom] = useState<boolean>(false)
    let timeout:ReturnType<typeof setTimeout>;

    useEffect(() => {
        const controller = new AbortController();
        const request = createRequest<RoundDto>(controller.signal, {page, pageSize: 5, username, courseName: course, userId})
        timeout = setTimeout(() => {
            dispatch(getAllRounds({...request}));
        }, 200)
        return () => {
            if (timeout) {
                clearTimeout(timeout)
            }
            controller.abort();
        }
    }, [page, username, course, userId])

    function handleUsernameChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setPage(1);
        setUsername(e.currentTarget.value)
    }

    function handleCourseNameChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setPage(1);
        setCourse(e.currentTarget.value)
    }


    return (
        <>
        <Typography variant="h2" sx={{textAlign: "center" }}>Rounds</Typography>
        <Box sx={{
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            rowGap: "1em",
            width: "100%",
            borderTop: "2px grey solid",
            borderRadius: "1em",
            padding: "1em"
        }}>
            <Box sx={{
            display: "flex",
            flexDirection: "column",
            rowGap: "1em",
            }}>
                <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around",
                    gap: "1em",
                }}>
                    <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around",
                    gap: "1em",
                    }}>
                        <Typography variant="h4">Filter:</Typography>
                        <TextField disabled={userId > 0} label="Search by username" value={username} onChange={handleUsernameChange} autoComplete="false"/>
                        <TextField disabled={userId > 0} label="Search by course name" value={course} onChange={handleCourseNameChange} autoComplete="false"/>
                    </Box>
                    <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around",
                    gap: "1em",
                    }}>
                        <Button onClick={() => setUserId(prev => prev > 0 ? 0 : loginReducer.loggedIn?.id as number)}>{userId > 0 ? "Show all rounds" : "Show rounds only by me"}</Button>
                        <Button variant="contained" onClick={() => navigate("new")}>Start a new round?</Button>
                    </Box>
                </Box>
            </Box>
            <ScrollableBox height={70} rounds={roundReducer.entities} atBottom={atBottom} page={page} setAtBottom={setAtBottom} setPage={setPage} />
            {atBottom && roundReducer.state === "pending" && <Box sx={{marginBottom: "5em"}}><LinearProgress /></Box>}
        </Box>
        </>
    )
}