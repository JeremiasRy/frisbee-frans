import { Box, Button, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, SelectChangeEvent } from "@mui/material";
import { SortBy } from "../pages/Courses";

export interface CourseSortFilterProps {
    handleSortByChange: (e: SelectChangeEvent) => void
    handleDirectionChange: (e: SelectChangeEvent) =>  void
    handleClear: () => void
    setSortBy: React.Dispatch<React.SetStateAction<SortBy>>
    sortBy: SortBy
}

export default function CourseSortFilter(props:CourseSortFilterProps) {
    const { handleSortByChange, handleDirectionChange, handleClear, sortBy} = {...props}
    return (
      <Box sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        columnGap: "1em",
        width: "100%"
      }}>
        <FormControl variant="outlined" >
          <InputLabel id="sort-column-label">Sort By</InputLabel>
          <Select
            labelId="sort-column-label"
            id="sort-column-select"
            value={sortBy.column}
            onChange={handleSortByChange}
            label="Sort By"
          >
            <MenuItem value="NONE">None</MenuItem>
            <MenuItem value="RoundsPlayed">Rounds played</MenuItem>
            <MenuItem value="Grade">Grade</MenuItem>
          </Select>
        </FormControl>
      {sortBy.column !== 'NONE' && (
        <>
          <FormControl variant="outlined">
            <InputLabel id="sort-direction-label">Direction</InputLabel>
            <Select
              labelId="sort-direction-label"
              id="sort-direction-select"
              value={sortBy.direction}
              onChange={handleDirectionChange}
              label="Direction"
            >
              <MenuItem value="NONE">None</MenuItem>
              <MenuItem value="ASCENDING">Ascending</MenuItem>
              <MenuItem value="DESCENDING">Descending</MenuItem>
            </Select>
          </FormControl>
          <Button onClick={handleClear}>Clear sorting</Button>
        </>
      )}
    </Box>
  );
}