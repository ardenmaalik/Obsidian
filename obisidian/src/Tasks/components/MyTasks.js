import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

const MyTasks = () => {
	const tableRef = useRef();

	// useEffect(() => {
	// 	document.addEventListener("click", handleClickOutside);

	// 	return () => {
	// 		document.removeEventListener("click", handleClickOutside);
	// 	};
	// }, []);

	// const handleClickOutside = () => {

	// 	// const dataMap = [...records];
	// 	// const filteredData = dataMap.filter((item) => item.task_name !== "");

	// 	// setRecords([...filteredData]);
	// };

	// const sortData = (field) => {
	// 	let sortedData = [...records];
	// 	console.log(field);
	// 	if (field) {
	// 		setIsSorted(field);

	// 		if (isSorted === field || field === "None") {
	// 			setIsSorted("None");
	// 			setRecords(sortedData.sort((a, b) => a.id - b.id));
	// 		} else if (field === "assignee" || field === "task_name") {
	// 			setRecords(
	// 				sortedData.sort((a, b) =>
	// 					a[field] < b[field] ? -1 : a[field] > b[field] ? 1 : 0
	// 				)
	// 			);
	// 		} else if (field === "due_date") {
	// 			setRecords(
	// 				sortedData.sort(
	// 					(a, b) =>
	// 						new Date(a.due_date).getTime() - new Date(b.due_date).getTime()
	// 				)
	// 			);
	// 		}
	// 	}
	// };

	return (
		<MyTasksContainer ref={tableRef}>
			{/* <button onClick={fetchcolumns}>click me</button> */}
		</MyTasksContainer>
	);
};

export default MyTasks;

const MyTasksContainer = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 4em;
	width: 95vw;
`;
