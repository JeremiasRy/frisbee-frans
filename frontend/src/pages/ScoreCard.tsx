import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useEffect, useState } from "react";
import { getRound, updateRound } from "../redux/reducer/roundReducer";
import { Box, Button, Pagination } from "@mui/material";
import { createHoleResult, getAllHoleResults, getHoleResultById, setHoleResultReducerStateToIdle, updateHoleResult } from "../redux/reducer/holeResultReducer";
import { HoleResultDto } from "../types/dtos";
import ScoreInput from "../components/ScoreInput";
import RoundCard from "../components/RoundCard";
import { Hole, Round } from "../types/models";

export default function ScoreCard() {
    const {id, holeNumber} = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const roundReducer = useAppSelector(state => state.round);
    const holeResultReducer = useAppSelector(state => state.holeResult);
    const loggedInReducer = useAppSelector(state => state.login)
    const [nextPage, setNextPage] = useState(0);
    const [throws, setThrows] = useState(0);
    const [penalties, setPenalties] = useState(0);

    function resetScoreCard() {
        setThrows(0)
        setPenalties(0)
    }
    function navigateTo(nextLocation:number) {
        navigate(`/rounds/${id}/scorecard/${nextLocation}}`)
    }

    useEffect(() => {
        const controller = new AbortController();
        resetScoreCard();
        dispatch(getRound({
            id: parseInt(id as string),
            signal: controller.signal,
            requestData: {},
            params: {}
        }))
        dispatch(getAllHoleResults({
            signal: controller.signal,
            requestData: {},
            params: {
                holeId: round.course.holes.find(hole => hole.nthHole === parseInt(holeNumber as string))?.id,
                roundId: round.id,
                userId: loggedInReducer.loggedIn?.id
            }
        }))
        return () => {
            controller.abort();
        }
    }, [id, holeNumber])

    useEffect(() => {
        if (holeResultReducer.state === "created" || holeResultReducer.state === "updated") {
            navigateTo(nextPage);
        }
    }, [holeResultReducer.state])

    if (!roundReducer.entities[0]) {
        return;
    }

    const round:Round = roundReducer.entities[0];
    const hole = round.course.holes.find(hole => hole.nthHole === parseInt(holeNumber as string)) as Hole;
    
    const enteredScoreToAllHoles = round.course.holes.length <= parseInt(holeNumber as string)
    const roundLength = round.course.holes.length;

    function handleResultCreate() {
        const {userId, id: roundId} = {...roundReducer.entities[0]}
        const holeId = roundReducer.entities[0].course.holes.find(hole => hole.nthHole === parseInt(holeNumber as string))?.id as number;
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

    function handleResultUpdate() {
        const {userId, id: roundId} = {...roundReducer.entities[0]}
        const holeId = roundReducer.entities[0].course.holes.find(hole => hole.nthHole === parseInt(holeNumber as string))?.id as number;
        const controller = new AbortController();

        const requestData:HoleResultDto = {
            throws,
            userId,
            holeId,
            roundId,
            penalties
        }
        dispatch(updateHoleResult({id: parseInt(holeNumber as string), requestData, params: {}, signal: controller.signal}))
    }

    function handleRoundSubmit() {
        const {userId, courseId} = {...roundReducer.entities[0]}
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

    function handlePaginationChange(_: React.ChangeEvent<unknown>, page: number) {
        if (holeResultReducer.entities.length === 0) {
            handleResultCreate()
        } else {
            handleResultUpdate()
        }
        setNextPage(page);
    }

    return (
        <>
        {hole.length}m || Hole {hole.nthHole} || Par {hole.par}
        <Pagination count={roundLength} boundaryCount={roundLength} onChange={handlePaginationChange}/>
        <ScoreInput throws={throws} penalties={penalties} setPenalties={setPenalties} setThrows={setThrows}/>
        <RoundCard round={round} />
        </>
    )
}