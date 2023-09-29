import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navigation from "../components/Navigation";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useEffect } from "react";
import { checkToken } from "../redux/reducer/loginReducer";
import { LoginForm } from "../components/LoginForm";

export default function Root() {
    const login = useAppSelector(state => state.login);
    const dispatch = useAppDispatch();
    
    useEffect(() => {
        dispatch(checkToken());
    }, [])

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            overflow: "hidden",
            padding: "2em",
            gap: "10em"
        }}>
            <Box 
            sx={{
                width: "20%",
                height: "94.5vh"
            }}>
                <Navigation />
            </Box>
            <Box 
            sx={{
                width: "80%"
            }}>
                {login.loggedIn ? <Outlet /> : <LoginForm />}
            </Box>
        </Box>
    )
}