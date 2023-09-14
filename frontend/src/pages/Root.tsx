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

    console.log(login)

    useEffect(() => {
        dispatch(checkToken());
    }, [])

    console.log(login);
    return (
        <Box sx={{
            display: "flex"
        }}>
            <Navigation />
            <Box
            sx={{
            width: "calc(80% - 2em)",
            padding: "1em",
            }}>
                {login.loggedIn ? <Outlet /> : <LoginForm />}
            </Box>
        </Box>
    )
}