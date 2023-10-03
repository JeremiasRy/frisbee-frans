import { useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { getHole } from "../redux/reducer/holeReducer";
import { useEffect } from "react";
import { createRequestWithId } from "../helper";
import { HoleDto } from "../types/dtos";

export default function Hole() {
    const { id } = useParams()
    const holeReducer = useAppSelector(state => state.hole);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const controller = new AbortController();
        const request = createRequestWithId<HoleDto>(id, controller.signal)
        dispatch(getHole({...request}))
        return () => {
            controller.abort();
        }
    }, [id])
    return (
        <></>
    )
}