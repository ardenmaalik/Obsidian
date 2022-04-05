import React, { useEffect } from "react";
import styled from "styled-components";

const AddTaskRow = () => {
    useEffect(() => {
			console.log("rendered");
		});
	return (
		<AddTaskContainer onMouseOver={() => console.log("Add task mouse over")}>
			<div>Add task...</div>
		</AddTaskContainer>
	);
}



export default AddTaskRow;

const AddTaskContainer = styled.div`
	grid-column-start: 1;
	grid-column-end: last-line;
	width: 100%;
	color: #949494;
	font-size: 14px;
	padding: 10px;
    cursor: pointer;

	:hover {
		background-color: #f5f5f5;
	}
`;
