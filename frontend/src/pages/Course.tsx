import { useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { getCourseById } from "../redux/reducer/courseReducer";
import { useEffect, useState } from "react";
import { getCourseStats } from "../redux/reducer/statisticsReducer";
import { Accordion, AccordionDetails, AccordionSummary, Box, Grid, LinearProgress, Typography } from "@mui/material";
import HoleCardBox from "../components/HoleCardBox";
import { createRequest, createRequestWithId } from "../helper";
import { CourseCommentDTO, CourseDto } from "../types/dtos";
import { GradeBox } from "../components/GradeBox";
import { createCourseComment, getAllCourseComments } from "../redux/reducer/courseCommentReducer";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'; 
import CommentOutlet from "../components/CommentOutlet";

export default function Course() {
    const { id } = useParams();
    const courseReducer = useAppSelector(state => state.course);
    const statisticsReducer = useAppSelector(state => state.statistics);
    const commentReducer = useAppSelector(state => state.courseComments);
    const loginReducer = useAppSelector(state => state.login);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const controller = new AbortController();
        const request = createRequestWithId<CourseDto>(id, controller.signal)
        dispatch(getCourseById({...request}))
        return () => {
            controller.abort();
        }
    }, [id])

    useEffect(() => {
        const controller = new AbortController();
        const request = createRequest<CourseCommentDTO>(controller.signal, {relationId: id})
        dispatch(getAllCourseComments({...request}))
        return () => {
            controller.abort()
        }
    }, [id])

    useEffect(() => {
        const controller = new AbortController();
        const request = createRequest<CourseCommentDTO>(controller.signal, {relationId: id})
        dispatch(getAllCourseComments({...request}))
        return () => {
            controller.abort()
        }
    }, [id])

    useEffect(() => {
        const controller = new AbortController();
        dispatch(getCourseStats({
            id: parseInt(id as string),
            signal: controller.signal
        }))
        return () => {
            controller.abort();
        }
    }, [id])

    if (courseReducer.state === "pending" || statisticsReducer.courseStats === null) {
        return (
            <LinearProgress />
        )
    }

    const course = courseReducer.entities[0];
    const {roundsPlayed, averageScore, bestScore} = {...statisticsReducer.courseStats}
    const comments = commentReducer.entities;

    function onCommentSubmit(text:string) {
        const controller = new AbortController();
        const request = createRequest<CourseCommentDTO>(controller.signal, {}, {
            courseId: parseInt(id as string),
            text,
            userId: loginReducer.loggedIn?.id as number
        })
        dispatch(createCourseComment({...request}));
    }

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1em",
            maxHeight: "90vh",
            overflow: "auto",
            msOverflowStyle: "none",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": {
                display: "none"
            }
        }}>
        <Grid container spacing={3}>
            <Grid item xs={8}>
                <Typography variant="h1">{course.name}</Typography>
            </Grid>
            <Grid item xs={4}>
                <GradeBox grade={course.courseGrade} />
            </Grid>
        </Grid>
        {roundsPlayed && averageScore && bestScore && <>
            <Typography variant="h4">Rounds played: {roundsPlayed}</Typography>
            <Typography variant="h5">Average: {averageScore > 0 && "+"}{Math.floor(averageScore * 100) / 100} </Typography>
            <Typography variant="h5">Course record: {bestScore > 0 &&  "+"}{bestScore}</Typography></>
        }
        <Accordion>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h4" textAlign="center">Layout ({course.holes.length})</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        gap: '1em',
                        margin: 'auto auto',
                    }}
                >
                {course.holes.map(hole => <HoleCardBox key={hole.id} hole={hole} />)}
                </Box>
            </AccordionDetails>
        </Accordion>
        <CommentOutlet commentSubmitAction={onCommentSubmit} comments={comments} />
        </Box>
    )
}