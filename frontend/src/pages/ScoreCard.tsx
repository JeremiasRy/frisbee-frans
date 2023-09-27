import { Box, Button, Typography } from "@mui/material";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { SetStateAction, useEffect, useState } from "react";
import { getAllHoleResults } from "../redux/reducer/holeResultReducer";
import ScoreInput from "../components/ScoreInput";
import RoundCard from "../components/RoundCard";
import { RoundPagination } from "../components/RoundPagination";

export default function ScoreCard() {
    const round = useAppSelector(state => state.round);
    const [nthHole, setNthHole] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        const nextHoleresultId = [...round.entities[0].roundResults].sort((a, b) => a.nthHole - b.nthHole)[nthHole - 1].id;
        navigate(nextHoleresultId.toString());
    }, [nthHole])

    return (
        <Box>
            <RoundPagination nthHole={nthHole} setNthHole={setNthHole} count={round.entities[0].roundResults.length} disableNext={false} disablePrev={false} />
            <Outlet />
            <RoundCard round={round.entities[0]}/>
        </Box>
    )
}