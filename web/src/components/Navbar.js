/**
 * Navigation Bar Component
 */

import LockIcon from "@mui/icons-material/Lock";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => {
	return (
		<AppBar position='static'>
			<Toolbar>
				<LockIcon sx={{ mr: 2 }} />
				<Typography variant='h6' component={Link} to='/' sx={{ flexGrow: 1, textDecoration: "none", color: "inherit" }}>
					SecureLog
				</Typography>
				<Box>
					<Button color='inherit' component={Link} to='/encrypt'>
						Encrypt
					</Button>
					<Button color='inherit' component={Link} to='/decrypt'>
						Decrypt
					</Button>
					<Button color='inherit' component={Link} to='/logs'>
						Logs
					</Button>
				</Box>
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;
