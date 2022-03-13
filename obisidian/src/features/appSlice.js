import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	projectId: null,
	projectName: null,
	roomId: null,
	displayInput: null,
};

// const initialDataState = {
	
// }

export const appSlice = createSlice({
	name: "app",
	initialState,
	// The `reducers` field lets us define reducers and generate associated actions
	reducers: {
		enterRoom: (state, action) => {
			state.roomId = action.payload.roomId;
		},
		openProject: (state, action) => {
			state.projectId = action.payload.projectId;
			state.projectName = action.payload.projectName;
		},
		displayAddTask: (state, action) => {
			console.log('ACTION: ', action)
			state.displayInput = action.payload.displayInput;
		},
	},
});

// export const dataSlice = createSlice({
// 	name: "data",
// 	initialDataState,
// 	// The `reducers` field lets us define reducers and generate associated actions
// 	reducers: {
		
// 	},
// });

export const { enterRoom, openProject } = appSlice.actions;
export const { displayAddTask } = appSlice.actions;

export const selectRoomId = (state) => state.app.roomId;
export const selectProjectId = (state) => state.app.projectId;
export const selectProjectName = (state) => state.app.projectName;
export const selectAddTask = (state) => state.app.displayInput;


export default appSlice.reducer;
