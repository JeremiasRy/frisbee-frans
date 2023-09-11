import { Box, Button, Typography } from "@mui/material";
import Logo from "./Logo";

export default function Navigation() {
    const navLocations = ["Courses", "Rounds", "Profile"]
    return (
        <Box
        sx={{
            display: "flex",
            flexDirection: "column",
            rowGap: "1em",
            width: "calc(30% - 2em)",
            maxHeight: "90vh",
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
            navLocations.map((location, idx) => 
            <Button
                variant="contained"
                color="info"
                key={location}
                sx={{
                    marginLeft: "1em",
                    width: `${20 - idx}vw`,
                    textAlign: "left",
                    justifyContent: "flex-start"
                }}>
            {location}
            </Button>)
          }
          <Box sx={{
            marginTop: "50%",
            padding: "10em 10em 10em 0"
          }}>
            <Logo />
          </Box>
        </Box>
    )
}