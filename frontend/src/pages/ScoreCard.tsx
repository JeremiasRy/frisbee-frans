import { Box } from "@mui/material";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useEffect, useState } from "react";
import RoundCard from "../components/RoundCard";
import { RoundPagination } from "../components/RoundPagination";
import { getRound } from "../redux/reducer/roundReducer";

export default function ScoreCard() {
    const round = useAppSelector(state => state.round);
    const dispatch = useAppDispatch();
    const { id, nthHole } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const nextHoleresultId = [...round.entities[0].roundResults].sort((a, b) => a.nthHole - b.nthHole)[parseInt(nthHole as string) - 1].id;
        navigate(nextHoleresultId.toString());
    }, [nthHole])

    return (
        <Box>
            <RoundPagination count={round.entities[0].roundResults.length} />
            <Outlet />
            <RoundCard round={round.entities[0]}/>
        </Box>
    )
}