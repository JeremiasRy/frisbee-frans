import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useAppDispatch } from "../redux/hooks";
import { login } from "../redux/reducer/loginReducer";

export function LoginForm() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useAppDispatch();

    function handleClick() {
        dispatch(login({name, password}))
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
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                px: "10em",
                gap: "1em"
            }}>
                <TextField label="Username" value={name} onChange={(e) => setName(e.currentTarget.value)}/>
                <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.currentTarget.value)}/>
                <Button variant="contained" onClick={handleClick}>Submit!</Button>
            </Box>
        </Box>
    )
}