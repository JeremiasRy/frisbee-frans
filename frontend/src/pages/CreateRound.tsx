import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import Courses from "./Courses";
import { createRound } from "../redux/reducer/roundReducer";
import { RoundDto } from "../types/dtos";
import { useNavigate } from "react-router-dom";

export function CreateRound() {
    const user = useAppSelector(state => state.login);
    const roundReducer = useAppSelector(state => state.round);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [course, setCourse] = useState(-1)

    useEffect(() => {
        const controller = new AbortController();
        const roundDto:RoundDto = {
            userId: user.loggedIn?.id as number,
            courseId: course
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
        if (roundReducer.state === "created") {
            const newRoundId = roundReducer.entities[0].id;
            navigate(`/rounds/${newRoundId}`);
            return;
        }
    }, [roundReducer.state])

    return (
        <Courses onClickAction="Select" setCourse={setCourse}/>
    )
}