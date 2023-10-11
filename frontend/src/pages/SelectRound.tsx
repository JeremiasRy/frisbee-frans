import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import Courses from "./Courses";
import { createRound, setRoundReducerStateToIdle} from "../redux/reducer/roundReducer";
import { RoundDto } from "../types/dtos";
import { useNavigate } from "react-router-dom";
import { createRequest } from "../helper";


export function SelectRound() {
    const user = useAppSelector(state => state.login);
    const roundReducer = useAppSelector(state => state.round);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [course, setCourse] = useState(-1)

    useEffect(() => {
        const controller = new AbortController();
        if (course > 0) {
            createRoundAction(controller.signal)
        }
        return () => {
            controller.abort()
        }
    }, [course])

    useEffect(() => {
        if (roundReducer.state === "created") {
            dispatch(setRoundReducerStateToIdle(""))
            navigateToRound()
        }
    }, [roundReducer.state, dispatch])

    function createRoundAction(signal:AbortSignal) {
        const roundDto:RoundDto = {
            userId: user.loggedIn?.id as number,
            courseId: course,
            status: "NotStarted"
        }
        const request = createRequest<RoundDto>(signal, {}, roundDto)
        dispatch(createRound({...request}));
    }

    function navigateToRound() {
        const newRoundId = roundReducer.entities[0].id;
        navigate(`/rounds/${newRoundId}`);
    }

    return (
        <Courses onClickAction="Select" setCourse={setCourse}/>
    )
}