import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useEffect } from "react";
import { getRound } from "../redux/reducer/roundReducer";
import { Button } from "@mui/material";

export default function ScoreCard() {
    const {id, holeNumber} = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const round = useAppSelector(state => state.round);

    useEffect(() => {
        const controller = new AbortController();
        dispatch(getRound({
            id: parseInt(id as string),
            signal: controller.signal,
            requestData: {},
            params: {}
        }))
        return () => {
            controller.abort();
        }
    }, [id, holeNumber])

    if (!round.entities[0]) {
        return;
    }
    
    let hole = round.entities[0].course.holes.find(hole => hole.nthHole === parseInt(holeNumber as string))

    return (
        <>{hole?.length}
        <Button onClick={() => navigate(`/rounds/${id}/fill/${parseInt(holeNumber as string) + 1}`)}>Next hole!</Button>
        </>
    )
}