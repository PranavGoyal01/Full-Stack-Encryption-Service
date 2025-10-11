/**
 * Main Application Component
 *
 * Sets up routing and theme for the application.
 */

import { Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import DecryptPage from "./pages/DecryptPage";
import EncryptPage from "./pages/EncryptPage";
import HomePage from "./pages/HomePage";
import LogsPage from "./pages/LogsPage";

const theme = createTheme({
	palette: {
		mode: "light",
		primary: {
			main: "#1976d2",
		},
		secondary: {
			main: "#dc004e",
		},
	},
});

function App() {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Router>
				<Navbar />
				<Container maxWidth='lg' style={{ marginTop: "2rem", marginBottom: "2rem" }}>
					<Routes>
						<Route path='/' element={<HomePage />} />
						<Route path='/encrypt' element={<EncryptPage />} />
						<Route path='/decrypt' element={<DecryptPage />} />
						<Route path='/logs' element={<LogsPage />} />
					</Routes>
				</Container>
			</Router>
		</ThemeProvider>
	);
}

export default App;
