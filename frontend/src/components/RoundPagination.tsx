import { Box, Button } from "@mui/material";

export interface RoundPaginationProps {
    count: number,
    disableNext: boolean,
    disablePrev: boolean,
    nthHole: number,
    setNthHole: React.Dispatch<React.SetStateAction<number>>
}

export function RoundPagination(props:RoundPaginationProps) {
    const { count, disableNext, disablePrev, setNthHole, nthHole } = {...props}

    function handleNextPress() {
        setNthHole(prev => prev + 1)
    }

    function handlePrevPress() {
        setNthHole(prev => prev - 1)
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
                {Array(count).fill(null).map((_, index) =><HoleIndicator holeNumber={index + 1} highlighted={nthHole === index + 1} />)}
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
                    {nthHole === count ? <>Submit</> : <>Next</>}
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