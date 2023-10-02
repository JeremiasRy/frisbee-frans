import { Box, Button, TextField, Typography } from "@mui/material";
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
    const [username, setUsername] = useState("");
    const [course, setCourse] = useState("");
    const [page, setPage] = useState(1);
    const [atBottom, setAtBottom] = useState<boolean>(false)
    let timeout:ReturnType<typeof setTimeout>;

    useEffect(() => {
        const controller = new AbortController();
        timeout = setTimeout(() => {
            dispatch(getAllRounds({
                signal: controller.signal,
                params: {
                    page,
                    pageSize: 5,
                    username,
                    courseName: course
                },
                requestData: {}
            }));
        }, 200)
        return () => {
            if (timeout) {
                clearTimeout(timeout)
            }
            controller.abort();
        }
    }, [page, username, course])

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
            display: "flex",
            flexDirection: "column",
            rowGap: "1em",
            width: "99%",
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
                        <TextField label="Search by username" value={username} onChange={handleUsernameChange} autoComplete="false"/>
                        <TextField label="Search by course name" value={course} onChange={handleCourseNameChange} autoComplete="false"/>
                    </Box>
                    <Box>
                        <Button variant="contained" onClick={() => navigate("new")}>Start a new round?</Button>
                    </Box>
                </Box>
            </Box>
            <ScrollableBox height={70} rounds={roundReducer.entities} atBottom={atBottom} page={page} setAtBottom={setAtBottom} setPage={setPage} />
            {atBottom && roundReducer.state === "pending" && <LinearProgress />}
        </Box>
        </>
    )
}