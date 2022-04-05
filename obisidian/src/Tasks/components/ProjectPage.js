import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import ProjectHeader from "./ProjectHeader";
import Table from "./Table";

// import { collection, addDoc } from "firebase/firestore";
// import { useCollection } from "react-firebase-hooks/firestore";
// import { db } from "../../firebase";

import {
	selectProjectId,
	selectProjectName,
	selectColumns,
	selectData,
	setData,
	addRow,
	fetchRecords,
} from "../../features/appSlice";
import { createNewDoc, deleteRow} from "./dataFuncs";
import { COLUMNS } from "./columns";
import { db } from "../../firebase";
import { updateDoc, doc } from "@firebase/firestore";

function ProjectPage() {
	const projectId = useSelector(selectProjectId);
	const projectName = useSelector(selectProjectName);
	const [columnsState, setColumnState] = useState([]);
	const dataState = useSelector(selectData);

	const [isUpdating, setIsUpdating] = useState(false);
	const [records, setRecords] = useState([]);
	const [isSorted, setIsSorted] = useState(false);
	const [displayNewTask, setDisplayNewTask] = useState(false);
	const [isSelected, setIsSelected] = useState({ index: null, field: null });

	const columns = useMemo(() => columnsState, [columnsState]);
	const data = useMemo(() => dataState, [dataState]);

	const dispatch = useDispatch();

	useEffect(() => {
		initProject();
	}, [projectId]);

	useEffect(() => {
		if (isUpdating) {
			const isNull = isSelected.index;
			console.log("selected: ", isNull);
			dispatch(fetchRecords({ id: projectId, isSelected: isSelected.index }));
			setIsUpdating((prev) => !prev);
		}
	}, [isUpdating]);

	useEffect(() => {
		console.log("data: ", data);
	}, [data]);

	const initProject = () => {
		createColumns();
		dispatch(fetchRecords({ id: projectId, isSelected: isSelected.index }));
	};

	const createColumns = async () => {
		const colArr = [];
		COLUMNS.forEach((column) => {
			!column.hidden && colArr.push(column);
		});

		setColumnState(colArr);
	};

	const filterOutEmptyTasks = () => {
		const DATA = [...data];
		console.log("filtering...: ", DATA);
		setDisplayNewTask(false);
		const filterData = DATA.filter((row) => row.task_name === "");
		console.log("filter: ", filterData, filterData[0].id, filterData[0].order);
		deleteRow(projectId, ...filterData)
		// setIsUpdating((prev) => !prev);
		// dispatch(
		// 	deleteRow({
		// 		data: filterData,
		// 	})
		// );
	};

	const updateData = async (rowIndex, columnId, value) => {
		setIsUpdating((prev) => !prev);
		const DATA = [...data];
		console.log("updating data...: ", rowIndex, columnId, value);
		// We also turn on the flag to not reset the page
		// setSkipPageReset(true);
		await DATA.map((row, index) => {
			if (index === rowIndex) {
				updateDoc(doc(db, "projects", projectId, "data", row.id), {
					[columnId]: value,
				});
			}
    });
    
    if (columnId === "task_name" && value.length === 0) {
      filterOutEmptyTasks()
    } 
	};

	const addEmptyTaskValue = async () => {
		const newRow = {
			task_name: "",
			assignee: "",
			due_date: "",
      custom: null,
      order: isSelected.index !== null ? isSelected.index + 1 : 0
		};

		setDisplayNewTask((prev) => !prev);
		await createNewDoc(projectId, newRow);
		setIsUpdating((prev) => !prev);
	};

	return (
		<ProjectPageContainer>
			<ProjectHeader
				name={projectName}
				// sortData={sortData}
				// isSorted={isSorted}
				// setIsSorted={setIsSorted}
				addEmptyTaskValue={addEmptyTaskValue}
			/>
			<Styles>
				<Table
					records={records}
					setRecords={setRecords}
					// sortData={sortData}
					data={data}
					columns={columns}
					isSorted={isSorted}
					setIsSorted={setIsSorted}
					displayNewTask={displayNewTask}
					setDisplayNewTask={setDisplayNewTask}
					isSelected={isSelected}
					setIsSelected={setIsSelected}
					updateData={updateData}
					filterOutEmptyTasks={filterOutEmptyTasks}
				/>
			</Styles>
		</ProjectPageContainer>
	);
}

export default ProjectPage;

const ProjectPageContainer = styled.div`
	margin-top: 5rem;
	width: 100%;
`;

const Styles = styled.div`
	padding: 1rem;
	display: flex;
	flex: 1;
	flex-direction: column;
	height: 0;
	.table {
		display: flex;
		flex: 1;
		flex-direction: column;
		width: 100%;
		border-spacing: 0;
		border-top: 1px solid #ddd;
		border-bottom: 1px solid #ddd;
		cursor: pointer;
		.tr {
			:last-child {
				.td {
					border-bottom: 0;
				}
			}

			:hover {
				background-color: #fafafa;
			}
		}

		.th {
			user-select: none;
			&.sortable {
				cursor: pointer;
			}
		}

		.th,
		.td {
			font-size: 12px;
			color: #949494;
			margin: 0;
			padding: 0.5rem;
			border-bottom: 1px solid #ddd;
			border-right: 1px solid #ddd;
			:last-child {
				border-right: 0;
			}

			input {
				font-size: 12px;
				color: #949494;
				padding: 0;
				margin: 0;
				border: 0;
				outline: none;
			}

			:hover {
				input {
					border: 1px solid #ddd;
				}
			}
		}

		.resizer {
			right: -5px;
			width: 10px;
			height: 100%;
			position: absolute;
			top: 0;
			z-index: 1;
			touch-action: none;
			&.isResizing {
				background: red;
			}

			:hover {
				background: blue;
			}
		}

		.td.assignee, .td.due_date {
			padding: 0;
			input {
				box-sizing: border-box;
				height: 100%;
				width: 100%;
				padding-left: 10px;
			}
		}

		.td.task_name {
			input {
				box-sizing: border-box;
				padding-left: 10px;
				margin-left: 1rem;
				height: 25px;
			}
		}
	}
`;
