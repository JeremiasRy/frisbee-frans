import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getUserStats } from "../redux/reducer/statisticsReducer";
import { Box, LinearProgress, Typography } from "@mui/material";

export default function Profile() {
    const user = useAppSelector(state => state.login);
    const statistics = useAppSelector(state => state.statistics);
    const dispatch = useAppDispatch()

    useEffect(() => {
        const controller = new AbortController();
        if (!user.loggedIn) {
            return;
        }
        dispatch(getUserStats({
            id: user.loggedIn?.id,
            signal: controller.signal
        }))
        return () => {
            controller.abort()
        }
    }, [])

    if (!statistics.userStats) {
        return <LinearProgress/>
    }
    const {averageScore, breakdownOfHoleResults, totalHolesPlayed, totalThrows} = {...statistics.userStats}

    return (
        <Box>
            <Typography variant="h4">Statistics</Typography>
            <Typography>Average score on a hole: {Math.floor(averageScore * 100) / 100} </Typography>
            <Typography>Total throws tracked: {totalThrows}</Typography>
            {
                breakdownOfHoleResults.map(identifier => <Typography key={identifier.identifier + identifier.count}>{identifier.identifier}s: {identifier.count}</Typography>)
            }
        </Box>
    )
}