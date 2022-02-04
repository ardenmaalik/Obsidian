import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	roomId: null,
	taskInput: null,
};

export const appSlice = createSlice({
	name: "app",
	initialState,
	// The `reducers` field lets us define reducers and generate associated actions
	reducers: {
		enterRoom: (state, action) => {
			state.roomId = action.payload.roomId;
		},
		addTask: (state, action) => {
			state.taskInput = action.payload.taskInput;
		},
	},
});

export const { enterRoom } = appSlice.actions;
export const { addTask } = appSlice.actions;

export const selectRoomId = (state) => state.app.roomId;
export const selectAddTask = (state) => state.app.taskInput;


export default appSlice.reducer;
