import { Box, Button, Typography } from "@mui/material";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { SetStateAction, useEffect } from "react";
import { getAllHoleResults } from "../redux/reducer/holeResultReducer";
import ScoreInput from "../components/ScoreInput";
import RoundCard from "../components/RoundCard";
import { RoundPagination } from "../components/RoundPagination";

export default function ScoreCard() {
    const round = useAppSelector(state => state.round);
    const navigate = useNavigate();

    return (
        <Box>
            <RoundPagination onChange={function (page: number): void {
                throw new Error("Function not implemented.");
            } } count={round.entities[0].roundResults.length} disableNext={false} disablePrev={false} />
            <Outlet />
            <RoundCard round={round.entities[0]}/>
        </Box>
    )
}