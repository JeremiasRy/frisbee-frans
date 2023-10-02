import { Paper, Typography } from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getHole } from "../redux/reducer/holeReducer";

export default function HoleCardHorizontal() {
    const {nthHole} = useParams();
    const dispatch = useAppDispatch();
    const round = useAppSelector(state => state.round);
    const holeReducer = useAppSelector(state => state.hole);

    useEffect(() => {
        const controller = new AbortController();
        if (!round.entities[0]) {
            return;
        }
        const hole = round.entities[0].course.holes.find(hole => hole.nthHole === parseInt(nthHole as string));
        if (!hole) {
            return;
        }
        dispatch(getHole({
            id: hole.id,
            signal: controller.signal,
            params: {},
            requestData: {}
        }))
        return () => {
            controller.abort();
        }
    }, [nthHole])

    if (!holeReducer.entities[0]) {
        return;
    }
    const hole = holeReducer.entities[0];

    return (
        <Paper 
        elevation={2} 
        sx={{
            display:"flex", 
            gap: "1em", 
            marginBottom: "1em",
            flexDirection: "row", 
            alignItems: "center",
            justifyContent: "space-around",
            height: "5em"
            }}>
            <Typography variant="h4">Hole {hole.nthHole}</Typography>
            <Typography variant="h4">Par {hole.par}</Typography>
            <Typography variant="h4">{hole.length}m</Typography>
        </Paper>
    )
}