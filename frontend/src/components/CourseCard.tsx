import { Paper, Typography } from "@mui/material"
import { Course } from "../types/models"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export type OnClickAction = "Navigate" | "Select"

export interface CourseCardProps {
    course: Course,
    onClickAction: OnClickAction
    setCourse: React.Dispatch<React.SetStateAction<number>> | null
}

export default function CourseCard(props:CourseCardProps) {
    const { course, onClickAction, setCourse } = {...props}
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

    function handleClick() {
        if (onClickAction === "Navigate") {
            navigate(`${course.id}`)
        } else if (setCourse) {
            setCourse(course.id);
        }
    }

    return (
        <Paper
        onMouseLeave={zeroRotate}
        onMouseMove={rotateMouse} 
        onClick={handleClick}
        sx={{
            width: "20vw",
            height: "20vh",
            boxSizing: "border-box",
            padding: "1em",
            boxShadow: "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)",
            transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) ${scale ? "scale3d(1.02, 1.02, 1.02)" : "" }`,
            backgroundImage: `radial-gradient(circle at ${circleX}px ${circleY}px, #ffffff55, #0000000f)`,
            "&:hover": {
                cursor: "pointer"
            }
        }}>
            <Typography variant="h4" sx={{textAlign: "center"}}>{course.name}</Typography>
            <Typography>Holes: {course.holes.length}<br/> Par: {course.coursePar} </Typography>
            <Typography>Grade: {course.gradeValue}</Typography>
        </Paper>
    )
}