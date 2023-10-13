import { Box } from "@mui/material";
import { Course } from "../types/models";
import CourseCard, { OnClickAction } from "./CourseCard";
import { useEffect, useRef } from "react";

export interface CourseCardWrapperProps {
    courses: Course[],
    onClickAction: OnClickAction,
    atBottom: boolean,
    page: number,
    setAtBottom: React.Dispatch<React.SetStateAction<boolean>>,
    setPage: React.Dispatch<React.SetStateAction<number>>,
    setCourse: React.Dispatch<React.SetStateAction<number>>
}

export default function CourseCardWrapper(props:CourseCardWrapperProps) {
    const {courses, onClickAction, atBottom, page, setCourse, setAtBottom, setPage} = {...props}; 
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (atBottom && courses.length / 20 === page) {
            setPage(prev => prev + 1)
        }
    }, [atBottom, courses.length, page, setPage])

    function checkIfAtBottom() {
        if (ref.current) {
            const top = ref.current.getBoundingClientRect().top;
            setAtBottom(window.innerHeight > top);
        }
    }
    return (
        <Box sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "1em",
            maxHeight: `70vh`,
            maxWidth: "80vw",
            overflowY: "auto",
            '&::-webkit-scrollbar': {
                display: "none"
            }
        }}
        onScroll={checkIfAtBottom}>
            {
                courses.map(course => 
                    <CourseCard key={course.id} course={course} onClickAction={onClickAction} setCourse={setCourse}/>)
            }
            <div ref={ref}/>
        </Box>
    )
}