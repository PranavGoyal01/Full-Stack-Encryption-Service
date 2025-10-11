/**
 * Home Page Component
 *
 * Landing page with overview and navigation to all features.
 */

import ListIcon from "@mui/icons-material/List";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { Box, Button, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const HomePage = () => {
	return (
		<Box>
			<Typography variant='h3' gutterBottom>
				Welcome to SecureLog
			</Typography>
			<Typography variant='body1' paragraph>
				Encrypt and decrypt data using Caesar cipher. All operations are logged.
			</Typography>

			<Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 3, my: 4 }}>
				<Paper sx={{ p: 3, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
					<LockIcon fontSize='large' color='primary' sx={{ mb: 2 }} />
					<Typography variant='h5' gutterBottom>
						Encrypt Data
					</Typography>
					<Typography variant='body2' sx={{ mb: 2 }}>
						Encrypt your data using Caesar cipher with a shift key.
					</Typography>
					<Button variant='contained' component={Link} to='/encrypt'>
						Encrypt
					</Button>
				</Paper>

				<Paper sx={{ p: 3, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
					<LockOpenIcon fontSize='large' color='secondary' sx={{ mb: 2 }} />
					<Typography variant='h5' gutterBottom>
						Decrypt Data
					</Typography>
					<Typography variant='body2' sx={{ mb: 2 }}>
						Decrypt your encrypted data using the same shift key.
					</Typography>
					<Button variant='contained' component={Link} to='/decrypt' color='secondary'>
						Decrypt
					</Button>
				</Paper>

				<Paper sx={{ p: 3, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
					<ListIcon fontSize='large' color='info' sx={{ mb: 2 }} />
					<Typography variant='h5' gutterBottom>
						View Logs
					</Typography>
					<Typography variant='body2' sx={{ mb: 2 }}>
						Access logs of all encryption and decryption operations.
					</Typography>
					<Button variant='contained' component={Link} to='/logs' color='info'>
						View Logs
					</Button>
				</Paper>
			</Box>
		</Box>
	);
};

export default HomePage;
