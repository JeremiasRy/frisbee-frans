import { Box, Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import { SortBy } from "../pages/Courses";

export interface CourseSortFilterProps {
    handleSortByChange: (_: any, value: string) => void
    handleDirectionChange: (_: any, value: string) =>  void
    handleClear: () => void
    setSortBy: React.Dispatch<React.SetStateAction<SortBy>>
    sortBy: SortBy
}

export default function CourseSortFilter(props:CourseSortFilterProps) {
    const { handleSortByChange, handleDirectionChange, handleClear, sortBy} = {...props}
    return (
        <Box>
            <FormControl>
                <FormLabel id="sort-column-label">Sort By</FormLabel>
                <RadioGroup
                row
                aria-labelledby="sort-column-label"
                name="sort-by-radio-buttons"
                onChange={handleSortByChange}
                >
                    <FormControlLabel value="RoundsPlayed" control={<Radio />} label="Rounds played" />
                    <FormControlLabel value="Grade" control={<Radio />} label="Grade" />
                </RadioGroup>
            </FormControl>
            {sortBy.column !== "NONE" && <>
            <FormControl>
                <FormLabel id="sort-direction-label">Direction</FormLabel>
                <RadioGroup
                row
                aria-labelledby="sort-direction-label"
                name="sort-direction-radio-buttons"
                onChange={handleDirectionChange}
                >
                    <FormControlLabel value="ASCENDING" control={<Radio />} label="Ascending" />
                    <FormControlLabel value="DESCENDING" control={<Radio />} label="Descending" />
                </RadioGroup>
            </FormControl>
            <Button onClick={handleClear}>Clear sorting</Button></>
            }
        </Box>
    );
}