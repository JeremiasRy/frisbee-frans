import { Box, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

export interface RoundPaginationProps {
    count: number,
}

export function RoundPagination(props:RoundPaginationProps) {
    const { count } = {...props}
    const navigate = useNavigate();
    const location = useLocation();
    const path = location.pathname.split("/");
    path.shift();
    const nthHole = parseInt(path[path.length - 2] as string)
    const isFirst = nthHole === 1;
    const isLast = nthHole === count;

    function handleNextPress() {
        if (isLast) {
            return;
        }
        path[path.length - 2] = (nthHole + 1).toString();
        navigate("/" + path.join("/"));
    }

    function handlePrevPress() {
        if (isFirst) {
            return;
        }
        path[path.length - 2] = (nthHole - 1).toString();
        navigate("/" + path.join("/"));
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
                {Array(count).fill(null).map((_, index) =><HoleIndicator key={Math.random() * 1000} holeNumber={index + 1} highlighted={nthHole === index + 1} />)}
            </Box>
            <Box sx={{
            display: "flex",
            flexDirection: "row",
            flexShrink: 0,
            px: "7.5em",
            justifyContent: "space-between"
            }}>
                <Button  onClick={handlePrevPress}>
                    Previous
                </Button>
                <Button onClick={handleNextPress}>
                    {isLast ? <>Submit</> : <>Next</>}
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