import { Box, Button } from "@mui/material";
import { useState } from "react";

export interface RoundPaginationProps {
    onChange: (page: number) => void,
    count: number,
    disableNext: boolean,
    disablePrev: boolean
}

export function RoundPagination(props:RoundPaginationProps) {
    const { count, onChange, disableNext, disablePrev } = {...props}
    const [hole, setHole] = useState(1);

    function handleNextPress() {
        setHole(prev => prev + 1)
        onChange(hole + 1)
    }

    function handlePrevPress() {
        setHole(prev => prev - 1)
        onChange(hole - 1)
    }

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            flexShrink: 0,
        }}>
            <Box sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            gap: "0.5em",
            flexShrink: 0,
            }}>
                {Array(count).fill(null).map((_, index) =><HoleIndicator holeNumber={index + 1} highlighted={hole === index + 1} />)}
            </Box>
            <Box sx={{
            display: "flex",
            flexDirection: "row",
            flexShrink: 0,
            px: "7.5em",
            justifyContent: "space-between"
            }}>
                <Button disabled={disablePrev} onClick={handlePrevPress}>
                    Previous
                </Button>
                <Button disabled={disableNext} onClick={handleNextPress}>
                    {hole === count ? <>Submit</> : <>Next</>}
                </Button>
            </Box>
        </Box>
    );
}

export interface HoleIndicatorProps {
    holeNumber: number,
    highlighted: boolean
}
export function HoleIndicator(props:HoleIndicatorProps) {
    const {holeNumber, highlighted} = {...props}
    return (
        <Box sx={{
            position: "relative",
            height: "2em",
            width: "2em",
        }}>
            <Box sx={{
                position: "absolute",
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
            }}>
                <p style={{
                    textAlign: "center",
                    verticalAlign: "center",
                    margin: "auto auto",
                    zIndex: "2"
                }}>{holeNumber}</p>
            </Box>
            {highlighted && <Box sx={{
                position: "absolute",
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                backgroundColor: "rgba(200,200,200,0.5)",
                zIndex: "1"
            }}>
            </Box>}
        </Box>
    )
}