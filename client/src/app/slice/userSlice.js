import { createSlice } from '@reduxjs/toolkit';
import {
	loadLanguage,
	loadUser,
	loginrUser,
	logout,
	registerUser,
	updateLanguage,
} from '../action/userAction';
const userSlice = createSlice({
	name: 'userSlice',
	initialState: {
		userInfo: {},
		loading: false,
		error: null,
		isAuthenticated: false,
		isLanguageUpdate: false,
		allLanguage: [],
	},
	reducers: {
		updateLocalLang: (state, action) => {
			state.userInfo.language = action.payload;
		},
	},
	extraReducers: {
		[registerUser.pending]: (state) => {
			state.loading = true;
		},
		[registerUser.fulfilled]: (state, action) => {
			state.loading = false;
			state.user = action.payload;
			state.isAuthenticated = true;
		},
		[registerUser.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		[loginrUser.pending]: (state) => {
			state.loading = true;
		},
		[loginrUser.fulfilled]: (state, action) => {
			state.loading = false;
			state.userInfo = action.payload;
			state.isAuthenticated = true;
		},
		[loginrUser.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		[logout.pending]: (state) => {
			state.loading = true;
		},
		[logout.fulfilled]: (state) => {
			state.loading = false;
			state.isAuthenticated = false;
		},
		[logout.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		[loadUser.pending]: (state) => {
			state.loading = true;
		},
		[loadUser.fulfilled]: (state, action) => {
			state.loading = false;
			state.userInfo = action.payload.user;
			state.allLanguage = action.payload.language;
			state.isAuthenticated = true;
		},
		[loadUser.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
			state.isAuthenticated = false;
		},
		[updateLanguage.pending]: (state) => {
			state.loading = true;
		},
		[updateLanguage.fulfilled]: (state,action) => {
			state.loading = false;
			state.isLanguageUpdate = true;
			state.userInfo.language = action.payload.result.language;
		},
		[updateLanguage.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		[loadLanguage.pending]: (state) => {
			state.loading = true;
		},
		[loadLanguage.fulfilled]: (state, action) => {
			state.loading = false;
			state.allLanguage = action.payload;
		},
		[loadLanguage.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
	},
});
export const { updateLocalLang } = userSlice.actions;
export default userSlice.reducer;
