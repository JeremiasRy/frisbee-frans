import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useEffect } from "react";
import { getRound } from "../redux/reducer/roundReducer";

export default function ScoreInput() {
    const { id } = useParams();
    const roundReducer = useAppSelector(state => state.round);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const controller = new AbortController();
        dispatch(getRound({
            id: parseInt(id as string),
            signal: controller.signal,
            params: {},
            requestData: {}
        }))
        return () => {
            controller.abort()
        }
    }, [id])

    if (roundReducer.entities.length === 0) {
        return;
    }

    const copyOfRound = [...roundReducer.entities[0].roundResults];

    return (
        <></>
    )
}