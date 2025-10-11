/**
 * Decrypt Page Component
 *
 * Provides a user interface for decrypting Caesar cipher encrypted data.
 * Features:
 * - Input fields for shift key and encrypted data
 * - Loading state during API call
 * - Error handling with clear messages
 * - Copy-to-clipboard functionality for the decrypted result
 * - Input validation before API call
 */

import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Alert, Box, Button, CircularProgress, Paper, Snackbar, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { decryptData } from "../services/api";

const DecryptPage = () => {
	// State management for form inputs and UI feedback
	const [key, setKey] = useState(""); // Shift key input
	const [encryptedData, setEncryptedData] = useState(""); // Encrypted data input
	const [decryptedData, setDecryptedData] = useState(""); // Decrypted result
	const [loading, setLoading] = useState(false); // Loading state during API call
	const [error, setError] = useState(null); // Error message
	const [copied, setCopied] = useState(false); // Clipboard copy confirmation

	/**
	 * Handles the decryption process
	 * Validates inputs, calls API, and displays results or errors
	 */
	const handleDecrypt = async () => {
		// Client-side validation
		if (!key.trim()) {
			setError("Shift key is required");
			return;
		}

		if (!encryptedData.trim()) {
			setError("Encrypted data is required");
			return;
		}

		setLoading(true);
		setError(null);

		try {
			const response = await decryptData(key, encryptedData);
			setDecryptedData(response.data);
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
				Decrypt Data
			</Typography>
			<Typography variant='body1' paragraph>
				Enter the same shift key used for encryption and the encrypted data you want to decrypt.
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
				<TextField label='Shift Key (number)' type='number' fullWidth variant='outlined' value={key} onChange={(e) => setKey(e.target.value)} placeholder='Enter the same number used for encryption (e.g., 3)' sx={{ mb: 2 }} />

				<TextField label='Encrypted Data' multiline rows={4} fullWidth variant='outlined' value={encryptedData} onChange={(e) => setEncryptedData(e.target.value)} placeholder='Enter the encrypted data...' sx={{ mb: 2 }} />

				<Button variant='contained' color='secondary' onClick={handleDecrypt} disabled={loading} fullWidth>
					{loading ? <CircularProgress size={24} /> : "Decrypt Data"}
				</Button>
			</Paper>

			{decryptedData && (
				<Paper sx={{ p: 3 }}>
					<Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
						<Typography variant='h6'>Decrypted Result</Typography>
						<CopyToClipboard text={decryptedData} onCopy={handleCopy}>
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
						value={decryptedData}
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

export default DecryptPage;
