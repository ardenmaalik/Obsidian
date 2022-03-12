import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import DataHeader from "./DataHeader";
import DataCell from "./DataCell";

// import DataCell from './DataCell';

import { selectAddTask } from "../../features/appSlice";

const Table = ({
	data,
	dataState,
	setDataState,
	columns,
	sortData,
	isSorted,
	setIsSorted,
	displayNewTask,
	setDisplayNewTask,
}) => {
	const [isRowSelected, setIsRowSelected] = useState("");
	const [isSelected, setIsSelected] = useState({ index: null, field: "" });
	const [editDate, setEditDate] = useState(false);
	const [assigneeInput, showAssigneeInput] = useState(false);

	const dataRef = useRef();

	useEffect(() => {
		console.log();
		if (displayNewTask) {
			addEmptyTaskValue();
		} else {
			return null;
		}
	}, [displayNewTask]);

	useEffect(() => {
		document.addEventListener("click", handleClickOutside);
		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	});

	const handleClickOutside = (e) => {
		if (displayNewTask) {
			if (
				e.target.parentNode !==
					dataRef.current.children[1].children[0].children[0] ||
				!dataRef.current.children[1].children[0].contains(e.target.parentNode)//Fix this line
			) {
				const dataMap = [...dataState];
				const filteredData = dataMap.filter((item) => item.task_name !== "");

				setDataState([...filteredData]);
				setDisplayNewTask(false);
			}
		}

		// console.log("Filtered: ", filteredData);
	};

	const addEmptyTaskValue = () => {
		const newValue = {
			id: 0,
			task_name: "",
			assignee: "",
			due_date: "01/01/2001",
			field: null,
		};

		setDataState((prevState) => [newValue, ...prevState]);
	};

	const columnWidth = (key) => {
		const colWidth = columns.map((column) => {
			if (key === column.field) {
				return column.width;
			}
		});

		const filteredColWidth = colWidth.filter((width) => {
			return width !== undefined;
		});

		return filteredColWidth;
	};

	const handleRowOnClick = (index) => {
		setIsRowSelected(index);
	};

	return (
		<DataContainer ref={dataRef}>
			<DataHeaderContainer>
				{columns.map((header, i) => (
					<DataHeader
						headerWidth={header.width}
						header={header}
						index={i}
						isSorted={isSorted}
						setIsSorted={setIsSorted}
						sortData={sortData}
					/>
				))}
			</DataHeaderContainer>
			<>
				{data.map((row, index) => (
					<DataRow
						id={`${"row_" + index}`}
						selectedRow={isRowSelected === index ? true : false}
						onClick={(e) => handleRowOnClick(index)}
					>
						{Object.entries(row, index).map(
							([key, val]) =>
								key !== "id" && (
									<DataCell
										field={key}
										val={val}
										index={index}
										dataState={dataState}
										setDataState={setDataState}
										columnWidth={columnWidth(key)}
										setIsSelected={setIsSelected}
										isSelected={isSelected}
										displayNewTask={displayNewTask}
										setDisplayNewTask={setDisplayNewTask}
										handleClickOutside={handleClickOutside}
										editDate={editDate}
										setEditDate={setEditDate}
										assigneeInput={assigneeInput}
										showAssigneeInput={showAssigneeInput}
									/>
								)
						)}
					</DataRow>
				))}
			</>
		</DataContainer>
	);
};

export default Table;

const DataContainer = styled.div`
	display: grid;
	width: 100%;
	border-top: 1px solid #ddd;
	grid-template-columns:
		350px
		150px
		150px
		minmax(150px, 1.67fr);
`;

const DataRow = styled.div`
	display: contents;
	height: 30px;
	align-items: center;
	font-size: 12px;
	cursor: pointer;

	> div {
		background-color: ${({ selectedRow }) =>
			selectedRow ? "#ADD8E6" : "white"};
	}

	:hover div {
		background-color: ${({ selectedRow }) =>
			selectedRow ? "none" : "#F5F5F5"};
	}
`;

const DataHeaderContainer = styled.div`
	display: contents;
	cursor: pointer;
`;
