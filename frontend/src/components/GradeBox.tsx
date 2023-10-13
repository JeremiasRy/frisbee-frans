import { Box, Typography } from "@mui/material";

export interface GradeBoxProps {
    grade: string
}

export function GradeBox(props:GradeBoxProps) {
    const { grade } = {...props};
    function returnColor():string {
        const gradeFamily = grade.charAt(0);
        switch (gradeFamily) {
            case "a": return `rgb(${75 + 40 * (grade.lastIndexOf("a") + 1)},0,0)`;
            case "b": return `rgb(${75 * (grade.lastIndexOf("b") + 1)},155,0)`;
            case "c": return `rgb(0,0,${75 * (grade.lastIndexOf("c") + 1)})`;
            case "d": return `rgb(0,${75 * (grade.lastIndexOf("d") + 1)},0)`;
        }
        return "";
    }
    return (
        <Box sx={{
            minHeight: "2em",
            minWidth: "5em",
            width: "calc(100% / 2)",
            margin: "auto",
            border: `0.25em solid ${returnColor()}`,
            color: returnColor(),
            borderRadius: "0.5em",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontFamily: "monospace",
            marginTop: "1em"
        }}>
            <Typography sx={{textTransform: "uppercase", textEmphasis: "ButtonHighlight"}}variant="h6">{grade === "NoGrade" ? "" : grade}</Typography>
        </Box>
    )
}