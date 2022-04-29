import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectProjectId } from "../../../features/appSlice";

const TaskNameInput = ({
	id,
	index,
	field,
	val,
	isSelected,
	handleInputOnChange,
	updateData,
	displayNewTask,
	filterOutEmptyTasks,
	data,
}) => {
	const projectId = useSelector(selectProjectId);
	const inputRef = useRef();

	useEffect(() => {
		if (displayNewTask) {
			if (isSelected.index === null) {
				index === 0 && inputRef.current.focus();
			}
		}
	}, [displayNewTask]);

	const onBlur = async (index, id, val) => {
		console.log('blurred: ', val)
		updateData(index, id, val);
	};

	const onKeyDown = (e) => {
		e.key === "Enter" && inputRef.current.blur();
	};

	// const handleOnKeyDown = () => {

	// }

	return (
		<input
			ref={inputRef}
			name={field}
			type='text'
			onChange={(e) => handleInputOnChange(e)}
			placeholder={"Write a task name"}
			value={val}
			onBlur={() => onBlur(index, id, val)}
			onKeyDown={onKeyDown}
			className={"cell"}
			autoFocus={id === 0 && true}
			// OnKeyDown={() => handleOnKeyDown()}
		/>
	);
};

export default TaskNameInput;
