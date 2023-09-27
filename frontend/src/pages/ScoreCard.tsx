import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { SetStateAction, useEffect } from "react";
import { getAllHoleResults } from "../redux/reducer/holeResultReducer";
import ScoreInput from "../components/ScoreInput";

export default function ScoreCard() {
    const { id, nthHole } = useParams();
    const dispatch = useAppDispatch();
    const loginReducer = useAppSelector(state => state.login);
    const holeResultReducer = useAppSelector(state => state.holeResult);
    const round = useAppSelector(state => state.round);
    
    const holeNumber = parseInt(nthHole as string);
    const roundId = parseInt(id as string);

    useEffect(() => {
        const controller = new AbortController();
        dispatch(getAllHoleResults({
            signal: controller.signal,
            params: {
                roundId
            },
            requestData: {}
        }))
        return () => {
            controller.abort();
        }
    }, [nthHole])

    const results = [...holeResultReducer.entities].sort((a, b) => a.nthHole - b.nthHole);

    return (
        <Box>
        </Box>
    )
}