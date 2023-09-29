import { Box, Button, Typography } from "@mui/material";
import Logo from "./Logo";
import { useNavigate } from "react-router-dom";

export default function Navigation() {
    const navLocations = ["Courses", "Rounds", "Profile"]
    const navigate = useNavigate();
    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%"
        }}>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                rowGap: "1.5em"
            }}>
                <Box>
                    <Typography 
                        variant="h4"
                        onClick={() => navigate("/")}
                        sx={{
                            letterSpacing: "0.2em",
                            textTransform: "uppercase",
                            fontStyle: "italic",
                            "&:hover": {
                                cursor: "pointer"
                            }
                        }}>
                        frisbee frans
                    </Typography>
                </Box>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    rowGap: "1em"
                }}>
                {
                    navLocations.map((location, idx) => 
                    <Button
                        variant="contained"
                        color="info"
                        key={location}
                        onClick={() => navigate(`/${location.toLocaleLowerCase()}`)}
                        sx={{
                            marginLeft: "1em",
                            width: `${20 - idx}vw`,
                            textAlign: "left",
                            justifyContent: "flex-start"
                        }}>
                    {location}
                    </Button>)
                }
                </Box>
            </Box>
        <Box>
            <Logo />
        </Box>
        </Box>
    )
}