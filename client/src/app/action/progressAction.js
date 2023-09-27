import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
axios.defaults.withCredentials = true;
const url = 'http://localhost:8080/api/v1';

export const getProgress= createAsyncThunk('getProgress', async (data, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${url}/progress`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});