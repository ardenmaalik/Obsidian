import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import './DataTable.css'

import DueDateInput from "./inputs/DueDateInput";
import AssigneeInput from "./inputs/AssigneeInput";
import TaskNameInput from "./inputs/TaskNameInput";

function Cell({
	records,
	setRecords,
	field,
	val,
	id,
	dataState,
	setDataState,
	index,
	isSelected,
	setIsEmptyValue,
	setIsSelected,
	displayNewTask,
	handleClickOutside,
	editDate,
	setEditDate,
	assigneeInput,
	showAssigneeInput,
	filterEmptyTasks,
	createNewDoc,
	columns,
	header,
	data,
}) {
	const cellRef = useRef();
	useEffect(() => {
		console.log(records);
	});

	const handleInputOnChange = (e, index, key) => {
		const dataTable = [...records];

		const formattedDate = new Intl.DateTimeFormat("en-US")
			.format(e.$d)
			.toString();

		setRecords(
			dataTable.map((data, data_index) =>
				data_index === index && key !== "due_date"
					? { ...data, [key]: e.target.value }
					: data_index === index && key === "due_date"
					? { ...data, [key]: formattedDate }
					: data
			)
		);
	};

	const handleOnFocus = (index, field) => {
		setIsSelected({ index: index, field: field });
	};

	const handleOnBlur = () => {
		setIsSelected({ index: null, field: "" });
	};

	const handleOnClick = (index, field) => {
		setIsSelected({ index: index, field: field });
	};

	const setFieldWidth = () => {
		let width = "";
		columns.forEach((data) => {
			console.log(columns);
			if (field === data.field) {
				width = data.width;
			}
		});

		return width;
	};

	useEffect(() => {
		console.log(columns);
	});

	return (
		// <CellContainer
		// 	id={`${field + "_" + index}`}
		// 	className={"cell"}
		// 	selected={
		// 		isSelected.index === index && isSelected.field === field ? true : false
		// 	}
		// 	onClick={() => handleOnClick(index, field)}
		// 	columnWidth={header ? data.width : setfieldWidth()}
		// >
		<>
			{header ? (
				<th
					className='cell cell-header'
				>
					{data.headerName}
				</th>
			) : field === "task_name" ? (
				<td className='cell task_name'>
					<TaskNameInput
						id={id}
						index={index}
						field={field}
						val={val}
						handleInputOnChange={handleInputOnChange}
						handleOnFocus={handleOnFocus}
						handleOnBlur={handleOnBlur}
						isSelected={isSelected}
						records={records}
						setRecords={setRecords}
				
					/>
				</td>
			) : field === "assignee" ? (
				<td
					className='cell assignee'
					columnWidth={header ? data.width : setFieldWidth()}
				>
					<AssigneeInput
						index={index}
						field={field}
						val={val}
						isSelected={isSelected}
						handleOnFocus={handleOnFocus}
						handleInputOnChange={handleInputOnChange}
						setIsSelected={setIsSelected}
						assigneeInput={assigneeInput}
						showAssigneeInput={showAssigneeInput}
					/>
				</td>
			) : field === "due_date" ? (
				<td
					className='cell due_date'
					columnWidth={header ? data.width : setFieldWidth()}
				>
					<DueDateInput
						val={val}
						index={index}
						field={field}
						handleOnFocus={handleOnFocus}
						handleOnBLur={handleOnBlur}
						handleInputOnChange={handleInputOnChange}
						editDate={editDate}
						setEditDate={setEditDate}
						isSelected={isSelected}
						setIsSelected={setIsSelected}
					/>
				</td>
			) : null}
		</>
	);
}

export default Cell;

const CellContainer = styled.div`
	/* padding-top: 10px; */
	/* padding-bottom: 10px; */
	color: #3a3b3c;
	padding: 10px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	width: ${({ columnWidth }) => (columnWidth ? columnWidth : "100%")};
	height: 35px;
	border: ${({ selected }) => (selected ? "1px solid blue" : "1px solid #ddd")};
	font-size: 12px;
	color: #949494;

	.cell-header {
		width: 150px;
	}

	.MuiTextField-root {
		height: 20px;
		padding-bottom: 2em;
	}

	:hover {
		border: ${({ selected }) =>
			selected ? "1px solid blue" : "1px solid #4C4C4C"};
	}
`;
