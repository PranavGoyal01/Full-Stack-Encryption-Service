/**
 * API Service Module
 *
 * Functions to interact with the SecureLog backend API.
 */

import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

const api = axios.create({
	baseURL: API_URL,
});

/**
 * Encrypts data using Caesar cipher
 */
export const encryptData = async (key, data) => {
	try {
		const response = await api.post("/api/v1/encrypt", { key, data });
		return response.data;
	} catch (error) {
		throw error.response?.data?.detail || error.message;
	}
};

/**
 * Decrypts data using Caesar cipher
 */
export const decryptData = async (key, data) => {
	try {
		const response = await api.post("/api/v1/decrypt", { key, data });
		return response.data;
	} catch (error) {
		throw error.response?.data?.detail || error.message;
	}
};

/**
 * Fetches paginated logs of operations
 */
export const fetchLogs = async (size, offset) => {
	try {
		const response = await api.get(`/api/v1/logs?size=${size}&offset=${offset}`);
		return response.data;
	} catch (error) {
		throw error.response?.data?.detail || error.message;
	}
};
