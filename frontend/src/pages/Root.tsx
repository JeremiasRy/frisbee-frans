import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navigation from "../components/Navigation";

export default function Root() {
    return (
        <Box sx={{
            display: "flex"
        }}>
            <Navigation />
            <Box
            sx={{
            width: "calc(80% - 2em)",
            padding: "1em",
            }}>
                <Outlet />
            </Box>
        </Box>
    )
}