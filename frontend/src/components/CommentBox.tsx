import { Avatar, Paper, Typography } from "@mui/material";

export interface CommentBoxProps {
    text: string,
    username: string,
    createdAt: Date
}

export default function CommentBox(props: CommentBoxProps) {
	const { text, username, createdAt } = props;

	return (
		<Paper elevation={3} style={{ padding: '10px', margin: '10px', borderRadius: '10px' }}>
			<div style={{ display: 'flex', alignItems: 'center' }}>
				<Avatar alt={username} />
				<div style={{ marginLeft: '10px' }}>
					<Typography variant="body2">
						<strong>{username}</strong>
					</Typography>
					<Typography variant="body2" color="textSecondary">
						{new Date(createdAt).toDateString()}
					</Typography>
				</div>
			</div>
			<Typography variant="body1" style={{ 
                paddingLeft: "5em", 
                marginTop: '10px' 
                }}>
				{text}
			</Typography>
		</Paper>
	);
}