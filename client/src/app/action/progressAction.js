import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
axios.defaults.withCredentials = true;
const url = 'https://grammar-guruu.vercel.app/api/v1';

export const getProgress= createAsyncThunk('getProgress', async (data, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${url}/progress`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});