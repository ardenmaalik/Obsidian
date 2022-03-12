import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import DueDateInput from "./inputs/DueDateInput";
import AssigneeInput from "./inputs/AssigneeInput";
import TaskNameInput from "./inputs/TaskNameInput";

function DataCell({
	field,
	val,
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
}) {
	const dataCellRef = useRef();

	const handleInputOnChange = (e, index, key) => {
		const dataTable = [...dataState];

		const formattedDate = new Intl.DateTimeFormat("en-US")
			.format(e.$d)
			.toString();

		setDataState(
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

	// useEffect(() => {
	// 	console.log("okay: ", dataCellRef.current);
	// }, [isSelected]);

	return (
		<DataCellContainer
			id={`${field + "_" + index}`}
			className={"cell"}
			selected={
				isSelected.index === index && isSelected.field === field ? true : false
			}
			onClick={(e) => console.log(!val && e)}
		>
			{field === "task_name" ? (
				<TaskNameInput
					index={index}
					field={field}
					val={val}
					handleInputOnChange={handleInputOnChange}
					handleOnFocus={handleOnFocus}
					handleOnBlur={handleOnBlur}
				/>
			) : field === "assignee" ? (
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
			) : field === "due_date" ? (
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
			) : null}
			{/* ) : (
											<DataValue
												cellVal={val}
												onMouseEnter={() => {
													setInputHover(index);
												}}
												onMouseLeave={() => {
													setInputHover(null);
												}}
											>
												<span>{val}</span>
											</DataValue>
										)} */}
		</DataCellContainer>
	);
}

export default DataCell;

const DataCellContainer = styled.div`
	padding-top: 10px;
	padding-bottom: 10px;
	color: #3a3b3c;
	padding: 10px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	/* width: ${(props) => (props.columnWidth ? props.columnWidth : "100%")}; */
	border: ${({ selected }) => (selected ? "1px solid blue" : "none")};

	.MuiTextField-root {
		height: 20px;
		padding-bottom: 2em;
	}

	:hover {
		border: ${({ selected }) =>
			selected ? "1px solid blue" : "1px solid #4C4C4C"};
	}
`;

const DataValue = styled.div``;
