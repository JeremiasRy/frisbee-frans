import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useEffect, useState } from "react";
import { getRound, updateRound } from "../redux/reducer/roundReducer";
import { Box, Button } from "@mui/material";
import { createHoleResult, setHoleResultReducerStateToIdle } from "../redux/reducer/holeResultReducer";
import { HoleResultDto } from "../types/dtos";
import ScoreInput from "../components/ScoreInput";
import RoundCard from "../components/RoundCard";

export default function ScoreCard() {
    const {id, holeNumber} = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const round = useAppSelector(state => state.round);
    const holeResult = useAppSelector(state => state.holeResult);
    const [throws, setThrows] = useState(0);
    const [penalties, setPenalties] = useState(0);

    useEffect(() => {
        const controller = new AbortController();
        setThrows(0)
        setPenalties(0)
        dispatch(getRound({
            id: parseInt(id as string),
            signal: controller.signal,
            requestData: {},
            params: {}
        }))
        return () => {
            controller.abort();
        }
    }, [id])

    useEffect(() => {
        const controller = new AbortController()

        if (holeResult.state === "created" && round.state === "succeeded") {
            navigate(`/rounds/${id}/fill/${parseInt(holeNumber as string) + 1}`)
            dispatch(setHoleResultReducerStateToIdle(""))
            return;
        }
        if (round.state === "updated" && round.entities[0].status === "Completed") {
            navigate(`/rounds/${id}`)
            return;
        }
        dispatch(getRound({
            id: parseInt(id as string),
            signal: controller.signal,
            requestData: {},
            params: {}
        }))
        return () => {
            controller.abort();
        }
    }, [holeResult.state, round.state])

    if (!round.entities[0]) {
        return;
    }
    
    const hole = round.entities[0].course.holes.find(hole => hole.nthHole === parseInt(holeNumber as string))
    const enteredScoreToAllHoles = round.entities[0].course.holes.length < parseInt(holeNumber as string)

    function handleResultSubmit() {
        const {userId, id: roundId} = {...round.entities[0]}
        const holeId = round.entities[0].course.holes.find(hole => hole.nthHole === parseInt(holeNumber as string))?.id as number;
        const controller = new AbortController();

        const requestData:HoleResultDto = {
            throws,
            userId,
            holeId,
            roundId,
            penalties
        }
        dispatch(createHoleResult({requestData, params: {}, signal: controller.signal}))
    }

    function handleRoundSubmit() {
        const {userId, courseId} = {...round.entities[0]}
        const controller = new AbortController();
        dispatch(updateRound(
            {
                id: parseInt(id as string),
                requestData: {
                    userId,
                    courseId,
                    status: "Completed"
                },
                signal: controller.signal,
                params: {}
            }
        ))
    }


    return (
        <>
        {hole?.length}
        
        {
            enteredScoreToAllHoles
            ? <><Button disabled={holeResult.state === "pending"} onClick={handleRoundSubmit}>Finish round?</Button> <RoundCard round={round.entities[0]} /></>
            : <>
            <Button disabled={holeResult.state === "pending"} onClick={handleResultSubmit}>Submit and go to next hole?</Button> 
            <ScoreInput throws={throws} penalties={penalties} setPenalties={setPenalties} setThrows={setThrows}/>
            <RoundCard round={round.entities[0]} /> 
            </>
        }
        </>
    )
}