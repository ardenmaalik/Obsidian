import React, { useState, useEffect } from "react";
import TaskNameInput from "./inputs/TaskNameInput";

const EditableCell = ({
	value: initialValue,
	row: { index },
	column: { id },
	data,
	isSelected,
	updateData,
	displayNewTask,
	filterOutEmptyTasks
	// This is a custom function that we supplied to our table instance
}) => {
	// We need to keep and update the state of the cell normally
	const [value, setValue] = useState(initialValue);

	const onChange = (e) => {
		setValue(e.target.value);
	};

	// We'll only update the external data when the input is blurred
	const onBlur = () => {
		updateData(index, id, value);
	};

	// If the initialValue is changed external, sync it up with our state
	useEffect(() => {
		setValue(initialValue);
	}, [initialValue]);

	return (
		<>
			<TaskNameInput
				id={id}
				index={index}
				val={value}
				isSelected={isSelected}
				handleInputOnChange={onChange}
				// handleOnBlur={onBlur}
				setValue={setValue}
				data={data}
				updateData={updateData}
				displayNewTask={displayNewTask}
				filterOutEmptyTasks={filterOutEmptyTasks}
			/>
		</>
	);
};

export default EditableCell;
