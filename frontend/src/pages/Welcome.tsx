import { Box, Typography } from "@mui/material";
import { useAppSelector } from "../redux/hooks"
import { Outlet } from "react-router-dom";

export default function Welcome() {
    const login = useAppSelector(state => state.login);
    if (!login.loggedIn) {
        return;
    }

    return (
        <Box>
            <Typography variant="h1">Welcome!</Typography>
            {login.loggedIn.loginCount === 1 && <Typography>We have created an account for you based on the credentials you just inputted</Typography>}
            <Outlet />
        </Box>
        
    )
}