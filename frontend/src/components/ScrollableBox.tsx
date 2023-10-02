import { Box } from "@mui/material";
import { useAppDispatch} from "../redux/hooks"
import RoundCard from "./RoundCard";
import React, { useEffect, useRef, } from "react";
import { getAllRounds } from "../redux/reducer/roundReducer";
import { Round } from "../types/models";

export interface ScrollableBoxProps {
    height: number,
    rounds: Round[],
    atBottom: boolean,
    page: number,
    setAtBottom: React.Dispatch<React.SetStateAction<boolean>>,
    setPage: React.Dispatch<React.SetStateAction<number>>
}
export default function ScrollableBox(props:ScrollableBoxProps) {
    const {height, rounds, atBottom, setAtBottom, page, setPage} = {...props};
    const ref = useRef<HTMLDivElement>(null)
    const dispatch = useAppDispatch();

    useEffect(() => {
        const controller = new AbortController()
        if (atBottom && rounds.length / 5 === page) {
            setPage(prev => prev + 1)
        }
        return () => {
            controller.abort()
        }

    }, [atBottom])

    function checkIfAtBottom() {
        if (ref.current) {
            const top = ref.current.getBoundingClientRect().top;
            setAtBottom(window.innerHeight > top)
        }
    }

    return (
        <Box 
        sx={{
            display: "flex",
            flexDirection: "column",
            rowGap: "1em",
            maxHeight: `${height}vh`,
            maxWidth: "80vw",
            overflowY: "auto",
        }}
        onScroll={checkIfAtBottom}>
            {
                rounds.filter(round => round.status === "Completed").map(round => 
                    <RoundCard key={round.id} round={round} localResults={null}/>
                )
            }
            <div ref={ref} />
        </Box>
    )
}