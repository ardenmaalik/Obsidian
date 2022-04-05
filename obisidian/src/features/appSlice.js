import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getData } from "../Tasks/components/dataFuncs";
// import { doc, updateDoc } from "firebase/firestore"
// import { db } from "../firebase";



const initialState = {
	projectId: null,
	projectName: null,
	roomId: null,
	displayInput: null,
	columns: [],
	data: [],
};

export const appSlice = createSlice({
	name: "app",
	initialState,
	reducers: {
		enterRoom: (state, action) => {
			state.roomId = action.payload.roomId;
		},
		openProject: (state, action) => {
			state.projectId = action.payload.projectId;
			state.projectName = action.payload.projectName;
		},
		displayAddTask: (state, action) => {
			state.displayInput = action.payload.displayInput;
		},
		setData: (state, action) => {
			console.log('ACTION: ', action.payload.data)
			state.data = state.data.map((data, index) => {
				return (
					index === action.payload.index && {
						...data,
						[action.payload.id]: action.payload.value,
					}
				);
			});
		},
		resetDataInit: (state) => {
			state.columns = initialState.columns;
			state.data = initialState.data;
		},
		addRow: (state, action) => {
			console.log(action.payload.data);
			state.data = [...state.data, ...action.payload.data];
		},
		deleteRow: (state, action) => {
			state.data = [...action.payload.data];
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchRecords.fulfilled, (state, action) => {
			const sortData = action.payload.sort((a, b) => {
				return a.order - b.order
			})

			console.log('sorted: ', sortData)
			state.data = [...sortData]
		});
	},
});

// export const dataSlice = createSlice({
// 	name: "data",
// 	initialDataState,
// 	// The `reducers` field lets us define reducers and generate associated actions
// 	reducers: {

// 	},
// });

export const {
	enterRoom,
	openProject,
	ResetDataInit,
	displayAddTask,
	setColumns,
	setData,
	addRow,
	deleteRow,
} = appSlice.actions;

export const fetchRecords = createAsyncThunk(
	"app/fetchRecords",
	async (data, thunkAPI) => {
		const response = await getData(data.id);
		const updatedData = [];
		console.log('is selected: ', data.isSelected)
		response.forEach((item) => {
			updatedData.push({
				id: item.id,
				task_name: item.data().task_name,
				assignee: item.data().assignee,
				due_date: item.data().due_date,
				custom: item.data().custom,
				order: item.data().order
			});
		});

		return updatedData
	}
);


export const selectRoomId = (state) => state.app.roomId;
export const selectProjectId = (state) => state.app.projectId;
export const selectProjectName = (state) => state.app.projectName;
export const selectAddTask = (state) => state.app.displayInput;
export const selectData = (state) => state.app.data;
export const selectColumns = (state) => state.app.columns;

export default appSlice.reducer;
