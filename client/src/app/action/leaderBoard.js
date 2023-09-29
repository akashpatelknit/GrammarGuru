import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
axios.defaults.withCredentials = true;
const url = 'https://grammar-guruu.vercel.app/api/v1';
// const url = 'http://localhost:8080/api/v1';

export const getLeaderBoard = createAsyncThunk(
	'leaderBoard',
	async (data, { rejectWithValue }) => {
		try {
			const response = await axios.get(`${url}/leaderboard`);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);
