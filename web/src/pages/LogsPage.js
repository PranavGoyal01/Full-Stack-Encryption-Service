/**
 * Logs Page Component
 *
 * Displays paginated table of encryption/decryption operations.
 */

import { Alert, Box, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { fetchLogs } from "../services/api";

const LogsPage = () => {
	const [logs, setLogs] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [totalLogs, setTotalLogs] = useState(0);

	const loadLogs = useCallback(async () => {
		setLoading(true);
		setError(null);

		try {
			const response = await fetchLogs(rowsPerPage, page * rowsPerPage);
			setLogs(response.logs);
			setTotalLogs(response.total);
		} catch (err) {
			setError(err.toString());
		} finally {
			setLoading(false);
		}
	}, [page, rowsPerPage]);

	useEffect(() => {
		loadLogs();
	}, [loadLogs]);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const formatTimestamp = (timestamp) => {
		return new Date(timestamp * 1000).toLocaleString();
	};

	return (
		<Box>
			<Typography variant='h4' gutterBottom>
				Request Logs
			</Typography>
			<Typography variant='body1' paragraph>
				View a history of encryption and decryption requests.
			</Typography>

			{error && (
				<Alert severity='error' sx={{ my: 2 }} onClose={() => setError(null)}>
					{error}
				</Alert>
			)}

			<Paper sx={{ width: "100%", mb: 2 }}>
				<TableContainer>
					{loading && logs.length === 0 ? (
						<Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
							<CircularProgress />
						</Box>
					) : (
						<Table>
							<TableHead>
								<TableRow>
									<TableCell>ID</TableCell>
									<TableCell>Timestamp</TableCell>
									<TableCell>IP Address</TableCell>
									<TableCell>Operation</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{logs.length === 0 ? (
									<TableRow>
										<TableCell colSpan={4} align='center'>
											No logs found
										</TableCell>
									</TableRow>
								) : (
									logs.map((log) => (
										<TableRow key={log.id}>
											<TableCell>{log.id}</TableCell>
											<TableCell>{formatTimestamp(log.timestamp)}</TableCell>
											<TableCell>{log.ip}</TableCell>
											<TableCell>{log.data}</TableCell>
										</TableRow>
									))
								)}
							</TableBody>
						</Table>
					)}
				</TableContainer>
				<TablePagination rowsPerPageOptions={[5, 10, 25]} component='div' count={totalLogs} rowsPerPage={rowsPerPage} page={page} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage} />
			</Paper>
		</Box>
	);
};

export default LogsPage;
