import { useNavigate, useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useEffect } from "react";
import { getRound, updateRound } from "../redux/reducer/roundReducer";
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
    
    function handleRoundStart() {
        const {userId, courseId} = {...round.entities[0]}
        const controller = new AbortController();
        dispatch(updateRound(
            {
                id: parseInt(id as string),
                requestData: {
                    userId,
                    courseId,
                    status: "OnGoing"
                },
                signal: controller.signal,
                params: {}
            }
        ))
        navigate("scorecard/1")
    }

    if (round.entities.length === 0) {
        return;
    }

    return (
        <>
        {round.entities[0].status === "NotStarted" && <Button onClick={handleRoundStart}>Start round?</Button>}
        </>
    )
}