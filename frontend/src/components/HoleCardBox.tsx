import { Box, Paper, Typography } from "@mui/material";
import { Hole } from "../types/models"
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export interface HoleCardBoxProps {
    hole:Hole
}

export default function HoleCardBox(props:HoleCardBoxProps) {
    const {hole} = {...props}
    const navigate = useNavigate();

    const [rotateX, setRotateX] = useState(0);
    const [rotateY, setRotateY] = useState(0);
    const [circleX, setCircleX] = useState(0);
    const [circleY, setCircleY] = useState(0);
    const [scale, setScale] = useState(false);

    function zeroRotate() {
        setRotateX(0);
        setRotateY(0);
        setCircleX(0);
        setCircleY(0);
        setScale(false);
    }

    function rotateMouse(e:React.MouseEvent<HTMLDivElement, MouseEvent>) {
        const bounds = e.currentTarget.getBoundingClientRect();
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        const leftX = mouseX - bounds.x;
        const topY = mouseY - bounds.y;
        const center = {
            x: leftX - bounds.width / 2,
            y: topY - bounds.height / 2
        };
        setRotateX(-center.x / 50);
        setRotateY(center.y / 50);
        setCircleX(center.x * 2 + bounds.width / 2);
        setCircleY(center.y * 2 + bounds.height / 2);
        setScale(true);
    }

    function handleClick(): void {
        navigate(`/holes/${hole.id}`)
    }

    return (
        <Paper
        onMouseLeave={zeroRotate}
        onMouseMove={rotateMouse} 
        onClick={handleClick}
        sx={{
            width: "11.5vw",
            height: "13vh",
            boxSizing: "border-box",
            padding: "1em",
            boxShadow: "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)",
            transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) ${scale ? "scale3d(1.02, 1.02, 1.02)" : "" }`,
            backgroundImage: `radial-gradient(circle at ${circleX}px ${circleY}px, #ffffff55, #0000000f)`,
            overflow: "hidden",
            "&:hover": {
                cursor: "pointer"
            }
        }}>
            <Typography variant="h4" sx={{textAlign: "center"}}>Hole {hole.nthHole}</Typography>
            <Box sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                marginTop: "1em"
            }}>
                <Typography variant="h6">Par {hole.par}</Typography>
                <Typography variant="h6">{hole.length}m</Typography>
            </Box>
        </Paper>
    )
}