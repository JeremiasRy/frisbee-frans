import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { Grades } from "../helper";

export interface GradeFilterProps {
    grade: string,
    handleGradeFilterChange: (e: SelectChangeEvent) => void,
    disabled: boolean
}
export default function GradeFilter(props:GradeFilterProps) {
    const { grade, handleGradeFilterChange, disabled } = {...props}
    return (
        <Box>
            <FormControl fullWidth>
                <InputLabel id="grade-filter-label">Grade</InputLabel>
                <Select
                labelId="grade-filter-label"
                id="grade-filter-select"
                value={grade}
                label="Grade"
                onChange={handleGradeFilterChange}
                disabled={disabled}
                >
                <MenuItem value="NONE">No filter</MenuItem>
                {
                    Grades.map(grade => <MenuItem key={grade} value={grade}>{grade}</MenuItem>)
                }
                </Select>
            </FormControl>
        </Box>
    )
}