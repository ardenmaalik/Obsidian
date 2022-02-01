import React, { useState, useEffect, useMemo } from "react";
import { useTable, useFlexLayout, useResizeColumns } from "react-table";
import MOCK_DATA from "./MOCK_DATA.json";
import { COLUMNS } from "./columns";
import styled from "styled-components";
import DataCell from "./DataCell";
import DataHeader from "./DataHeader";

import { sortAssignee } from "./Sort";

const Table = () => {
	const [isEditing, setIsEditing] = useState([]);
	const [isSorted, setIsSorted] = useState(false);

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
		let sortedData = [...MOCK_DATA];

		if (isSorted) {
			if (isSorted === "assignee") {
				sortedData.sort((a, b) =>
					a.assignee < b.assignee ? -1 : a.assignee > b.assignee ? 1 : 0
				);
			} else if (isSorted === "task_name") {
				sortedData.sort((a, b) =>
					a.task_name < b.task_name ? -1 : a.task_name > b.task_name ? 1 : 0
				);
			} else if (isSorted == 'due_date') {
				sortedData.sort((a, b) =>
					new Date(a.due_date).getTime() - new Date(b.due_date).getTime()
				);
			}
		}

		console.log("sorted...", sortedData);
		return sortedData;
	}, [isSorted]);

	useEffect(() => {
		console.log("Sorted?: ", isSorted);
	});

	const handleOnClick = (e, i) => {
		const rowId = Number(e.currentTarget.parentNode.getAttribute("id"));
		setIsEditing([rowId, i]);
	};

	const handleInput = (e, i) => {
		handleOnClick();

		console.log();
	};

	const handleRowId = (e, i) => {
		console.log("Row ID: ", e, i);
	};

	const handleKeyPress = (e) => {
		console.log(e.keyCode);
		e.keyCode == 13 && setIsEditing(null);
	};

	const renderData = () => {};

	const columnWidth = (key) => {
		const colWidth = COLUMNS.map((column) => {
			if (key === column.field) {
				return column.width;
			}
		});

		const filteredColWidth = colWidth.filter((width) => {
			return width !== undefined;
		});

		return filteredColWidth;
	};

	const sortData = (field) => {
		console.log(field, " has been clicked!");
	};

	return (
		<DataContainer>
			<DataHeaderContainer>
				{COLUMNS.map((header, i) => (
					<DataHeader
						headerWidth={header.width}
						header={header}
						index={i}
						isSorted={isSorted}
						setIsSorted={setIsSorted}
					/>
				))}
			</DataHeaderContainer>
			<DataRowContainer>
				{data.map((row, i) => (
					<DataRow key={i} id={i} className = 'data-row'>
						{Object.entries(row).map(
							([key, val]) =>
								key !== "id" && (
									<DataCell
										columns={COLUMNS}
										key={key}
										val={val}
										index={i}
										columnWidth={columnWidth(key)}
									/>
								)
						)}
					</DataRow>
				))}
			</DataRowContainer>
		</DataContainer>
	);
};

export default Table;

const DataContainer = styled.div`
	display: grid;
	width: 100%;
	grid-template-columns:
		350px
		150px
		150px
		minmax(150px, 1.67fr);
`;

const DataHeaderContainer = styled.div`
	display: contents;
    cursor: pointer;
`;

const DataRowContainer = styled.div`
	display: contents;
	cursor: pointer;

	> .data-row {
		background-color: #000;
	}
`;

const DataRow = styled.div`
	display: contents;
	height: 30px;
	align-items: center;
	font-size: 12px;
    background-color: green;
`;
