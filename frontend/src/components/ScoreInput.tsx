import { Box, Button } from "@mui/material"

export interface ScoreInputProps {
    throws: number,
    penalties: number,
    par: number,
    setThrows: React.Dispatch<React.SetStateAction<number>>,
    setPenalties: React.Dispatch<React.SetStateAction<number>>,
}

export default function ScoreInput(props:ScoreInputProps) {
    const {throws, setThrows, penalties, setPenalties, par} = {...props}

    function handleIncrement() {
        if (throws === 0) {
            setThrows(par);
            return;
        }
        setThrows(prev => prev + 1)
    }

    function handleDecrement() {
        if (throws === 0) {
            setThrows(par - 1);
            return;
        }
        setThrows(prev => prev - 1 < 0 ? 0 : prev - 1);
    }
        return (
            <>
            <Box>
                <Button onClick={handleDecrement}>-</Button>Throws: {throws}<Button onClick={handleIncrement}>+</Button>
            </Box>
            <Box>
                <Button onClick={() => setPenalties(prev => prev - 1 < 0 ? 0 : prev - 1)}>-</Button>Penalties: {penalties}<Button onClick={() => setPenalties(prev => prev + 1)}>+</Button>
            </Box>
            </>
        )   
}