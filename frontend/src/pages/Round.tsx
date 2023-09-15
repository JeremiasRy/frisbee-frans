import { useNavigate, useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useEffect } from "react";
import { getRound } from "../redux/reducer/roundReducer";
import { Button } from "@mui/material";

export default function Round() {
    const {id} = useParams();
    const dispatch = useAppDispatch();
    const round = useAppSelector(state => state.round);
    const navigate = useNavigate();

    useEffect(() => {
        const controller = new AbortController();
        dispatch(getRound({
            id: parseInt(id as string),
            requestData: {},
            params: {},
            signal: controller.signal
        }))
        return () => {
            controller.abort()
        }

    }, [id])
    return (
        <>
        <Button onClick={() => navigate("fill/1")}>Start round?</Button>
        </>
    )
}