import React from "react";
import styled from "styled-components";

function TaskNameInput({
	index,
	field,
	val,
	handleInputOnChange,
	handleOnFocus,
	handleOnBlur,
}) {
	return (
		<TaskNameContainer>
			<input
				name={field}
				type='text'
				onChange={(e) => handleInputOnChange(e, index, field)}
				placeholder={"Write a task name"}
				value={val}
				onFocus={() => handleOnFocus(index, field)}
				onBlur={() => handleOnBlur()}
			/>
		</TaskNameContainer>
	);
}

export default TaskNameInput;

const TaskNameContainer = styled.div`
	input {
		border: none;
		outline: none;
		width: ${({ isActive }) => isActive && "98%"};
		height: 25px;
		font-size: 12px;
		color: #3a3b3c;
	}

	input:focus {
		border: 1px solid black;
	}
`;
