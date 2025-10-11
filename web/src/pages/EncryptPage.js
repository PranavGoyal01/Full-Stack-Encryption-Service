/**
 * Encrypt Page Component
 *
 * Interface for encrypting data using Caesar cipher.
 */

import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Alert, Box, Button, CircularProgress, Paper, Snackbar, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { encryptData } from "../services/api";

const EncryptPage = () => {
	const [key, setKey] = useState("");
	const [data, setData] = useState("");
	const [encryptedData, setEncryptedData] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [copied, setCopied] = useState(false);

	const handleEncrypt = async () => {
		if (!key.trim()) {
			setError("Shift key is required");
			return;
		}

		if (!data.trim()) {
			setError("Data to encrypt is required");
			return;
		}

		setLoading(true);
		setError(null);

		try {
			const response = await encryptData(key, data);
			setEncryptedData(response.data);
		} catch (err) {
			setError(err.toString());
		} finally {
			setLoading(false);
		}
	};

	const handleCopy = () => {
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<Box>
			<Typography variant='h4' gutterBottom>
				Encrypt Data
			</Typography>
			<Typography variant='body1' paragraph>
				Enter a shift key (number) and the data you want to encrypt using Caesar cipher.
			</Typography>

			{error && (
				<Alert severity='error' sx={{ my: 2 }} onClose={() => setError(null)}>
					{error}
				</Alert>
			)}

			<Paper sx={{ p: 3, mb: 3 }}>
				<Typography variant='h6' gutterBottom>
					Input
				</Typography>
				<TextField label='Shift Key (number)' type='number' fullWidth variant='outlined' value={key} onChange={(e) => setKey(e.target.value)} placeholder='Enter a number (e.g., 3)' sx={{ mb: 2 }} />

				<TextField label='Data to Encrypt' multiline rows={4} fullWidth variant='outlined' value={data} onChange={(e) => setData(e.target.value)} placeholder='Enter the text you want to encrypt...' sx={{ mb: 2 }} />

				<Button variant='contained' onClick={handleEncrypt} disabled={loading} fullWidth>
					{loading ? <CircularProgress size={24} /> : "Encrypt Data"}
				</Button>
			</Paper>

			{encryptedData && (
				<Paper sx={{ p: 3 }}>
					<Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
						<Typography variant='h6'>Encrypted Result</Typography>
						<CopyToClipboard text={encryptedData} onCopy={handleCopy}>
							<Button variant='outlined' size='small' startIcon={<ContentCopyIcon />}>
								Copy
							</Button>
						</CopyToClipboard>
					</Box>
					<TextField
						multiline
						rows={6}
						fullWidth
						variant='outlined'
						value={encryptedData}
						InputProps={{
							readOnly: true,
						}}
					/>
				</Paper>
			)}

			<Snackbar open={copied} autoHideDuration={2000} onClose={() => setCopied(false)} message='Copied to clipboard!' />
		</Box>
	);
};

export default EncryptPage;
