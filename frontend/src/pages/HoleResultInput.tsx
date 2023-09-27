import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getHoleResultById, updateHoleResult } from "../redux/reducer/holeResultReducer";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import ScoreInput from "../components/ScoreInput";

export default function HoleResultInput() {
    const dispatch = useAppDispatch();
    const holeResult = useAppSelector(state => state.holeResult);
    const { holeResultId, nthHole } = useParams();
    const [holeResultToUpdateId, setHoleResultToUpdateId] = useState(-1);
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
        setHoleResultToUpdateId(parseInt(holeResultId as string))
        return () => {
            controller.abort();
        }
    }, [holeResultId])

    useEffect(() => {
        if (holeResult.state === "succeeded") {
            setThrows(holeResult.entities[0].throws)
            setPenalties(holeResult.entities[0].penalties)
        }
    }, [holeResult.state])

    useEffect(() => {
        const controller = new AbortController();
        const {userId, roundId, holeId} = {...holeResult.entities[0]};
        if (throws !== 0) {
            dispatch(updateHoleResult({
                id: holeResultToUpdateId,
                signal: controller.signal,
                params: {},
                requestData: {
                    throws,
                    penalties,
                    roundId,
                    holeId,
                    userId
                }
            }))
        }
        return () => {
            controller.abort();
        }
    }, [nthHole])

    if (!holeResult.entities[0]) {
        return;
    }


    return (
        <>
        <ScoreInput throws={throws} penalties={penalties} par={holeResult.entities[0].par} setThrows={setThrows} setPenalties={setPenalties} />
        </>
    )
}