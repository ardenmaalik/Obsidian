import React, { useState, useEffect, useMemo } from "react";
import styled from "styled-components";

import MOCK_DATA from "./MOCK_DATA.json";
import { COLUMNS } from "./columns";

import MyTasksHeader from "./MyTasksHeader";
import Table from "./Table";

const MyTasks = () => {
	const [dataState, setDataState] = useState([...MOCK_DATA]);
	const [isSorted, setIsSorted] = useState(false);
	const [displayNewTask, setDisplayNewTask] = useState(false);

	const NO_DATA = [
		{
			task_name: "Click here to add task...",
			first_name: "Ravid",
			last_name: "Port",
			email: "rport0@narod.ru",
			date_of_birth: "1976-03-02T02:27:46Z",
			Age: 34,
		},
	];

	const columns = useMemo(() => COLUMNS, []);

	const data = useMemo(() => {
		return dataState;
	}, [dataState]);

	useEffect(() => {
	}, [dataState])

	const sortData = (field) => {
		let sortedData = [...dataState];
		console.log(field)
		if (field) {
			setIsSorted(field);

			if (isSorted === field || field === "None") {
				setIsSorted("None");
				setDataState(
					sortedData.sort((a, b) => a.id - b.id)
				);
			} else if (field === "assignee" || field === "task_name") {
				setDataState(
					sortedData.sort((a, b) =>
						a[field] < b[field] ? -1 : a[field] > b[field] ? 1 : 0
					)
				);
			} else if (field === "due_date") {
				setDataState(
					sortedData.sort(
						(a, b) =>
							new Date(a.due_date).getTime() - new Date(b.due_date).getTime()
					)
				);
			}
		}
	};

	return (
		<MyTasksContainer>
			<MyTasksHeader
				sortData={sortData}
				isSorted={isSorted}
				setIsSorted={setIsSorted}
				displayNewTask={displayNewTask}
				setDisplayNewTask={setDisplayNewTask}
			/>
			<Table
				dataState={dataState}
				setDataState={setDataState}
				data={data}
				sortData={sortData}
				columns={columns}
				isSorted={isSorted}
				setIsSorted={setIsSorted}
				displayNewTask={displayNewTask}
				setDisplayNewTask={setDisplayNewTask}
			/>
		</MyTasksContainer>
	);
};

export default MyTasks;

const MyTasksContainer = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 4em;
	width: 100vw;
`;
