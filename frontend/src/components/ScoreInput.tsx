import { Box, Button } from "@mui/material"

export interface ScoreInputProps {
    throws: number,
    penalties: number,
    setThrows: React.Dispatch<React.SetStateAction<number>>,
    setPenalties: React.Dispatch<React.SetStateAction<number>>,
}

export default function ScoreInput(props:ScoreInputProps) {
    const {throws, setThrows, penalties, setPenalties} = {...props}
        return (
            <>
            <Box>
                <Button onClick={() => setThrows(prev => prev - 1 < 0 ? 0 : prev - 1)}>-</Button>Throws: {throws}<Button onClick={() => setThrows(prev => prev + 1)}>+</Button>
            </Box>
            <Box>
                <Button onClick={() => setPenalties(prev => prev - 1 < 0 ? 0 : prev - 1)}>-</Button>Penalties: {penalties}<Button onClick={() => setPenalties(prev => prev + 1)}>+</Button>
            </Box>
            </>
        )   
}