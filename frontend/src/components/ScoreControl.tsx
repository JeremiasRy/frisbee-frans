import { Box, IconButton } from "@mui/material"
import { Direction } from "../helper"
import { Hole } from "../types/models"
import { Outlet } from "react-router-dom"
import RoundNthHoleIndicator from "./RoundNthHoleIndicator"
import { ResultInput } from "./ResultInput"
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

export interface ScoreControlProps {
    courseLength: number,
    throws: number,
    penalties: number,
    setThrows: React.Dispatch<React.SetStateAction<number>>,
    setPenalties: React.Dispatch<React.SetStateAction<number>>,
    hole: Hole,
    handleNavigationChange: (direction:Direction) => void,
}
export default function ScoreControl(props:ScoreControlProps) {
    const { courseLength, throws, penalties, setThrows, setPenalties, hole, handleNavigationChange} = {...props}
    return (
        <Box sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            rowGap: "2em"
        }}>
            <Outlet />
            <RoundNthHoleIndicator count={courseLength} />
            <Box sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around"
            }}>
                <IconButton disabled={hole.nthHole === 1} size="large" onClick={() => handleNavigationChange("Previous")}><ArrowBackIosIcon/></IconButton>
                <ResultInput par={hole.par} throws={throws} setThrows={setThrows} penalties={penalties} setPenalties={setPenalties} />
                <IconButton disabled={throws === 0} size="large" onClick={() => handleNavigationChange("Next")}><ArrowForwardIosIcon/></IconButton>
            </Box>
        </Box>
    )
}