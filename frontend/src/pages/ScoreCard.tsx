import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { ChangeEvent, useEffect, useState } from "react";
import { getRound, updateRound } from "../redux/reducer/roundReducer";
import { Box, Button, Pagination } from "@mui/material";
import { createHoleResult, getAllHoleResults, getHoleResultById, setHoleResultReducerStateToIdle, updateHoleResult } from "../redux/reducer/holeResultReducer";
import { HoleResultDto } from "../types/dtos";
import ScoreInput from "../components/ScoreInput";
import RoundCard from "../components/RoundCard";
import { Hole, Round } from "../types/models";
import { RoundPagination } from "../components/RoundPagination";

export default function ScoreCard() {
    const {id, holeNumber} = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const roundReducer = useAppSelector(state => state.round);
    const holeResultReducer = useAppSelector(state => state.holeResult);
    const loggedInReducer = useAppSelector(state => state.login)
    const [nextPage, setNextPage] = useState(0);
    const [page, setPage] = useState(0);
    const [throws, setThrows] = useState(0);
    const [penalties, setPenalties] = useState(0);

    function resetScoreCard() {
        setThrows(0)
        setPenalties(0)
    }

    function navigateTo(nextHole:number) {
        navigate(`/rounds/${id}/scorecard/${nextHole}`)
    }

    function setThrowsAndPenaltiesFromHoleResult() {
        const scorecard = holeResultReducer.entities[0];
        setPenalties(scorecard.penalties);
        setThrows(scorecard.throws);
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
        switch (holeResultReducer.state) {
            case "updated": navigateTo(nextPage); break;
            case "created": dispatch(setHoleResultReducerStateToIdle("")); break;
            case "succeeded": holeResultReducer.entities.length === 0 ? handleResultCreate() : setThrowsAndPenaltiesFromHoleResult(); break;
        }

    }, [holeResultReducer.state, holeResultReducer.entities])

    if (!roundReducer.entities[0]) {
        return;
    }

    const round:Round = roundReducer.entities[0];
    const hole = round.course.holes.find(hole => hole.nthHole === parseInt(holeNumber as string)) as Hole;
    const holeResult = holeResultReducer.entities[0];
    
    const enteredScoreToAllHoles = round.roundResults.every(holeResult => holeResult.throws > 0);
    const roundLength = round.course.holes.length;

    function handleResultCreate() {
        const {userId, id: roundId} = {...round}
        const holeId = round.course.holes.find(hole => hole.nthHole === parseInt(holeNumber as string))?.id as number;
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
        const {userId, id: roundId} = {...round}
        const holeId = round.course.holes.find(hole => hole.nthHole === parseInt(holeNumber as string))?.id as number;
        const controller = new AbortController();

        const requestData:HoleResultDto = {
            throws,
            userId,
            holeId,
            roundId,
            penalties
        }
        dispatch(updateHoleResult({id: holeResult.id, requestData, params: {}, signal: controller.signal}))
    }

    function handleRoundSubmit() {
        const {userId, courseId} = {...round}
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

    function handlePaginationChange(page: number) {
        if (throws === holeResult.throws && penalties === holeResult.penalties) {
            navigateTo(page);
            return;
        }
        setNextPage(page);
        handleResultUpdate();
    }

    return (
        <>
        {hole.length}m || Hole {hole.nthHole} || Par {hole.par}
        <RoundPagination onChange={handlePaginationChange} count={roundLength} disableNext={throws < 1} disablePrev={parseInt(holeNumber as string) === 1}/>
        <ScoreInput throws={throws} penalties={penalties} setPenalties={setPenalties} setThrows={setThrows}/>
        <RoundCard round={round} />
        </>
    )
}