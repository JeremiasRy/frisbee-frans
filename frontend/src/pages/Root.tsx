import { Box, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navigation from "../components/Navigation";

export default function Root() {
    return (
        <Box sx={{
            width: "100%",
            height: "100%",
            display: "flex"
        }}>
            <Navigation />
            <Box
            sx={{
            width: "calc(80% - 2em)",
            padding: "1em"
            }}>
                <Outlet />
            </Box>
        </Box>
    )
}