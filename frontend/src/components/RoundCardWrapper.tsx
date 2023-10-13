import { Box } from "@mui/material";
import RoundCard from "./RoundCard";
import React, { useEffect, useRef, } from "react";
import { Round } from "../types/models";

export interface RoundCardWrapperProps {
    height: number,
    rounds: Round[],
    atBottom: boolean,
    page: number,
    setAtBottom: React.Dispatch<React.SetStateAction<boolean>>,
    setPage: React.Dispatch<React.SetStateAction<number>>
}
export default function RoundCardWrapper(props:RoundCardWrapperProps) {
    const {height, rounds, atBottom, setAtBottom, page, setPage} = {...props};
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (atBottom && rounds.length / 5 === page) {
            setPage(prev => prev + 1)
        }
    }, [atBottom])

    function checkIfAtBottom() {
        if (ref.current) {
            const top = ref.current.getBoundingClientRect().top;
            setAtBottom(window.innerHeight > top);
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
            '&::-webkit-scrollbar': {
                display: "none"
            }
        }}
        onScroll={checkIfAtBottom}>
            {
                rounds.map(round => 
                    <RoundCard key={round.id} round={round} localResults={null}/>
                )
            }
            <div ref={ref} />
        </Box>
    )
}