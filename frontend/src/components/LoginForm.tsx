import { Button, TextField } from "@mui/material";
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
        <>
        <TextField value={name} onChange={(e) => setName(e.currentTarget.value)}/>
        <TextField type="password" value={password} onChange={(e) => setPassword(e.currentTarget.value)}/>
        <Button onClick={handleClick}>Submit!</Button>
        </>
    )
}