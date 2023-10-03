import { Box, TextField, Typography } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { login } from "../redux/reducer/loginReducer";

export function LoginForm() {
    const loginReducer = useAppSelector(state => state.login);
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useAppDispatch();

    function handleClick() {
        dispatch(login({name, password}))
    }

    function statusText():string {
        switch (loginReducer.state) {
            case "Rejected": return "Something went wrong... Try again?";
            case "LoggingIn": return "Logging you in...";
            case "Registering": return "Registering new account...";
            case "Fullfilled": if (!loginReducer.loggedIn) { return "Duplicate username" }; break;
        }
        return ""
    }

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            }}
            textAlign="center"
            gap={2}>
            <Typography variant="h4" >Please login</Typography>
            <Typography variant="body1">Don't worry if you don't have user;</Typography>
            <Typography variant="subtitle2">to register just input credentials and that's your account for the future!</Typography>
            <Typography>{statusText()}</Typography>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                px: "10em",
                gap: "1em"
            }}>
                <TextField label="Username" value={name} onChange={(e) => setName(e.currentTarget.value)}/>
                <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.currentTarget.value)}/>
                <LoadingButton loading={loginReducer.state === "LoggingIn" || loginReducer.state === "Registering"} variant="contained" onClick={handleClick}>Submit!</LoadingButton>
            </Box>
        </Box>
    )
}