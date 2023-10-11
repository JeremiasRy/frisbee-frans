import { Box, Typography } from "@mui/material";
import { useAppSelector } from "../redux/hooks"

export default function Welcome() {
    const login = useAppSelector(state => state.login);
    if (!login.loggedIn) {
        return;
    }

    return (
        <Box>
            <Typography variant="h1">Welcome {login.loggedIn.name}!</Typography>
            <Typography>You have logged in {login.loggedIn.loginCount} times</Typography>
        </Box>
    )
}