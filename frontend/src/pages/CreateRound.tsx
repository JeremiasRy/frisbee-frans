import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import Courses from "./Courses";
import { createRound, setRoundReducerStateToIdle } from "../redux/reducer/roundReducer";
import { HoleResultDto, RoundDto } from "../types/dtos";
import { useNavigate } from "react-router-dom";
import { createManyHoleResults, setHoleResultReducerStateToIdle } from "../redux/reducer/holeResultReducer";
import { Hole } from "../types/models";

export function CreateRound() {
    const user = useAppSelector(state => state.login);
    const roundReducer = useAppSelector(state => state.round);
    const holeResult = useAppSelector(state => state.holeResult);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [course, setCourse] = useState(-1)

    useEffect(() => {
        const controller = new AbortController();
        const roundDto:RoundDto = {
            userId: user.loggedIn?.id as number,
            courseId: course,
            status: "OnGoing"
        }
        if (course > 0) {
            dispatch(createRound({
                requestData: roundDto, 
                signal: controller.signal, 
                params: {}
            }));
        }
        return () => {
            controller.abort()
        }
    }, [course])

    useEffect(() => {
        const controller = new AbortController();
        if (roundReducer.state === "created") {
            dispatch(createManyHoleResults({
                signal: controller.signal,
                params: {},
                requestData: createEmptyHoleresultDTOs(),
            }))
            dispatch(setRoundReducerStateToIdle(""))
        }
    }, [roundReducer.state])

    useEffect(() => {
        if (holeResult.state === "created") {
            const newRoundId = roundReducer.entities[0].id;
            navigate(`/rounds/${newRoundId}/scoreinput`);
            dispatch(setHoleResultReducerStateToIdle(""));
            return;
        }
    }, [holeResult.state])

    function createEmptyHoleresultDTOs() {
        return roundReducer.entities[0].course.holes.map(hole => createHoleResultDTOfromHole(hole))
    }

    function createHoleResultDTOfromHole(hole:Hole) {
        const {userId, id: roundId} = {...roundReducer.entities[0]};
        let holeResultDto:HoleResultDto = {
            userId,
            roundId,
            holeId: hole.id,
            throws: 0,
            penalties: 0
        }
        return holeResultDto;
    }

    return (
        <Courses onClickAction="Select" setCourse={setCourse}/>
    )
}