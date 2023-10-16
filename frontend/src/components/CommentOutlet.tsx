import { Typography } from "@mui/material";
import { Comment } from "../types/models";
import CommentInput from "./CommentInput";
import CommentBox from "./CommentBox";

export interface CommentOutletProps {
    commentSubmitAction: (text:string) => void,
    comments: Comment[]
}

export default function CommentOutlet(props:CommentOutletProps) {
    const {commentSubmitAction, comments} = {...props};
    return (
        <>
        <Typography variant="h4">Comments</Typography>
        <CommentInput onSubmit={commentSubmitAction}/>
        {comments.map(comment => <CommentBox {...comment}/>)}
        </>
    )
}