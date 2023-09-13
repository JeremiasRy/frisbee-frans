import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { Typography } from "@mui/material";
import Courses from "./Courses";

export function CreateRound() {
    const dispatch = useAppDispatch();
    const [course, setCourse] = useState(-1)

    console.log(course)

    return (
        <Courses onClickAction="Select" setCourse={setCourse}/>
    )
}