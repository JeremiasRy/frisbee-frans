import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getUserStats } from "../redux/reducer/statisticsReducer";
import { Box, LinearProgress, Typography } from "@mui/material";
import { getTagByValue } from "../helper";
import { PieChart } from "@mui/x-charts";
import HoleResultCard from "../components/HoleResultCard";

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

    if (statistics.pending) {
        return <LinearProgress/>
    }
    if (!statistics.userStats) {
        return (
            <Typography>No statistics to show</Typography>
        )
    }
    const {averageScore, breakdownOfHoleResults, totalHolesPlayed, totalThrows} = {...statistics.userStats}
    const formattedAverageScore = Math.floor(averageScore * 100) / 100;

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
      <Typography variant="h2">Statistics</Typography>
      <Typography>Average result: </Typography>
      <Box sx={{
        width: "5em"
      }}>
      <HoleResultCard score={formattedAverageScore} count={formattedAverageScore} isLast={true}/> 
      <Typography textAlign={"center"}><b>{getTagByValue(Math.floor(averageScore))}</b></Typography>
      </Box>
      <Typography>Total throws tracked: {totalThrows}</Typography>
      <Box sx={{ marginTop: 4, textAlign: 'center' }}>
        <Typography variant="h4">Result breakdown</Typography>
        <Typography>Total holes played: {totalHolesPlayed}</Typography>
        <PieChart 
            series={[
                {
                    data: breakdownOfHoleResults.map((res, idx) => ({id: idx, value: res.count, label: res.identifier}))
                }
            ]} 
            height={300} 
            width={600}/>
      </Box>
    </Box>
    )
}