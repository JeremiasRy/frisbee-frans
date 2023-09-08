import { Box, Button, Paper, Typography } from "@mui/material";

export default function Navigation() {
    const navLocations = ["Courses", "Rounds", "Profile"]
    return (
        <Box
        sx={{
            display: "flex",
            flexDirection: "column",
            rowGap: "1em",
            width: "calc(20% - 2em)",
            padding: "1em"
        }}>
        <Box sx={{
            marginBottom: "2em"
        }}>
            <Typography 
                variant="h4"
                sx={{
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    fontStyle: "italic"
                }}
            >frisbee frans
            </Typography>
        </Box>
          
          {
            navLocations.map(location => 
            <Button
                variant="contained"
                color="info"
                key={location}
                sx={{
                    marginLeft: "1em",
                    width: "25em",
                    textAlign: "left",
                    justifyContent: "flex-start"
                }}>
            {location}
            </Button>)
          }
        </Box>
    )
}