import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getHoleResultById } from "../redux/reducer/holeResultReducer";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

export default function HoleResultInput() {
    const dispatch = useAppDispatch();
    const holeResult = useAppSelector(state => state.holeResult);
    const { holeResultId } = useParams();
    const [throws, setThrows] = useState(0);
    const [penalties, setPenalties] = useState(0);

    useEffect(() => {
        const controller = new AbortController();
        dispatch(getHoleResultById({
            id: parseInt(holeResultId as string),
            signal: controller.signal,
            params: {},
            requestData: {},
        }))
        return () => {
            controller.abort();
        }
    }, [holeResultId])

    console.log(holeResult)

    return (
        <></>
    )
}