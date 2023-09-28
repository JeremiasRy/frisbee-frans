import { Box, IconButton, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export interface ResultInputProps {
    par: number,
    throws: number,
    setThrows: React.Dispatch<React.SetStateAction<number>>,
    penalties: number,
    setPenalties: React.Dispatch<React.SetStateAction<number>>
}

export function ResultInput(props:ResultInputProps) {
    const {par, throws, penalties, setThrows, setPenalties} = {...props};

    function handleThrowsIncrement() {
        if (throws === 0) {
            setThrows(par);
            return;
        }
        setThrows(prev => prev + 1)
    }
    function handleThrowsDecrement() {
        if (throws === 0) {
            setThrows(par - 1);
            return;
        }
        setThrows(prev => prev - 1)
    }
    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-evenly",
            gap: "1.5em",
        }}>
            <Typography variant="h6" textAlign="left">Throws</Typography>
            <NumberInputBox handleDecrement={handleThrowsDecrement} handleIncrement={handleThrowsIncrement} value={throws}/>
            <Typography variant="h6">Penalties</Typography>
            <NumberInputBox handleDecrement={function () {setPenalties(prev => prev - 1 < 0 ? 0 : prev - 1)}} handleIncrement={function () {setPenalties(prev => prev + 1)}} value={penalties}/>
        </Box>
    )
}
export interface NumberInputProps {
    handleDecrement: () => void,
    handleIncrement: () => void,
    value: number,
}
export function NumberInputBox(props:NumberInputProps) {
    const {handleDecrement, handleIncrement, value} = {...props}
    return (
        <Box sx={{
            width: "40vw",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center"

        }}>
            <IconButton size="large" onClick={handleDecrement}><RemoveIcon/></IconButton>
            <Typography variant="h6">{value}</Typography>
            <IconButton size="large" onClick={handleIncrement}><AddIcon/></IconButton >
        </Box>
    )
}