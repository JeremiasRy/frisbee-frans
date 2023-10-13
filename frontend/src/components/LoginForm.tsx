import { Box, Button, CircularProgress, TextField, Typography } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { login, register } from "../redux/reducer/loginReducer";

export function LoginForm() {
	const loginReducer = useAppSelector((state) => state.login);
	const [name, setName] = useState('');
	const [password, setPassword] = useState('');
	const dispatch = useAppDispatch();

	const isLoggingInOrRegistering =
		loginReducer.state === 'LoggingIn' || loginReducer.state === 'Registering';

	function handleClick() {
		dispatch(login({ name, password }));
	}

	useEffect(() => {
		switch (loginReducer.state) {
			case 'LoginFailedTryToRegister': dispatch(register({ name, password })); break;
			case 'Registered': dispatch(login({ name, password })); break;
			default: break;
		}
	}, [loginReducer.state]);

	function statusText(): string {
		switch (loginReducer.state) {
			case 'Rejected': return 'Something went wrong... Try again?';
			case 'LoggingIn': return 'Logging you in...';
			case 'Registering': return 'Registering new account...';
			case 'Fullfilled':
				if (!loginReducer.loggedIn) {
					return 'Duplicate username';
				}
				return '';
			default: return '';
		}
	}

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				gap: '16px',
			}}
		>
			<Typography variant="h4">Please log in</Typography>
			<Typography variant="body1">Don't worry if you don't have a user:</Typography>
			<Typography variant="subtitle2">
				To register, just input credentials, and that's your account for the
				future!
			</Typography>
			<Typography variant="body2" color="error">
				{statusText()}
			</Typography>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					gap: '16px',
				}}
			>
				<TextField
					label="Username"
					value={name}
					onChange={(e) => setName(e.currentTarget.value)}
				/>
				<TextField
					label="Password"
					type="password"
					value={password}
					onChange={(e) => setPassword(e.currentTarget.value)}
				/>
				<Button
					variant="contained"
					color="primary"
					onClick={handleClick}
					disabled={isLoggingInOrRegistering}
				>
					{isLoggingInOrRegistering ? <CircularProgress size={24} color="secondary" /> : 'Submit'}
				</Button>
			</Box>
		</Box>
	);
}