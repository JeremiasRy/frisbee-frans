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
        let controller = new AbortController();
        let roundDto:RoundDto = {
            userId: user.loggedIn?.id as number,
            courseId: course
        }
        dispatch(createRound({
            requestData: roundDto, 
            signal: controller.signal, 
            params: {}
        }));

        return () => {
            controller.abort()
        }
    }, [course])

    if (roundReducer.state === "created") {
        let newRoundId = roundReducer.entities[0].id;
        navigate(`/rounds/${newRoundId}`)
    }

    return (
        <Courses onClickAction="Select" setCourse={setCourse}/>
    )
}