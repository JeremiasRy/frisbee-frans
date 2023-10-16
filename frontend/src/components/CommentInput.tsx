import { Send } from "@mui/icons-material";
import { Avatar, Box, IconButton, TextField } from "@mui/material";
import { useState } from "react";

export interface CommentInputProps {
    onSubmit: (text:string) => void
}

export default function CommentInput(props:CommentInputProps) {
    const { onSubmit } = {...props}
    const [comment, setComment] = useState("")
  
    const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setComment(event.target.value);
    };

    function handleSubmit()  {
        onSubmit(comment)
        setComment("");
    }

    return (
        <Box 
        display="flex" 
        flexDirection="row" 
        alignItems="center"
        width="70%" 
        gap={"1em"}
        onKeyDown={(e) => {if (e.key === "Enter" && comment.trim() !== '') {handleSubmit()}}}>
          <Avatar alt="Avatar" src="avatar.jpg" />
          <TextField
            label="Add a comment"
            variant="standard"
            value={comment}
            onChange={handleCommentChange}
            fullWidth
            InputProps={{
              endAdornment: (
                <IconButton disabled={comment.trim() === ''} color="primary" onClick={handleSubmit}>
                  <Send />
                </IconButton>
              ),
            }}
          />
        </Box>
      );
  };