import React, { useState, useEffect, useMemo } from "react";
import {useSelector} from 'react-redux'
import MOCK_DATA from "./MOCK_DATA.json";
import { COLUMNS } from "./columns";
import styled from "styled-components";
import DataHeader from "./DataHeader";

import { selectAddTask } from '../../features/appSlice'


const Table = () => {
	const [isEditing, setIsEditing] = useState("");
	const [isSorted, setIsSorted] = useState(false);

    const taskInput = useSelector(selectAddTask)

    useEffect(() => {
        console.log('Task state: ', taskInput)
    })

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
			} else if (isSorted == "due_date") {
				sortedData.sort(
					(a, b) =>
						new Date(a.due_date).getTime() - new Date(b.due_date).getTime()
				);
			}
		}
		return sortedData;
	}, [isSorted]);

	const handleKeyPress = (e) => {
		console.log(e.keyCode);
		e.keyCode == 13 && setIsEditing(null);
	};


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
                    <DataRow key={i} id={i}>
						{Object.entries(row, i).map(
							([key, val]) =>
								key !== "id" && (
									<DataCell
										id={i}
										columnWidth={columnWidth(key)}
										isHoverable={isEditing === i && key === 'task_name' ? false : true}
									>
										{key === "task_name" ? (
											<DataInput
												id={i}
												onClick={(e) => {
													setIsEditing(i)
												}}
                                                isActive={isEditing === i ? true : false}
                                                inputVal={val}

											>
												<input
													readOnly={isEditing === i ? false : true}
													type='text'
													defaultValue={val}
												/>
											</DataInput>
                                        ) : (
                                            <DataValue>
                                                {val}
                                            </DataValue>
										)}
									</DataCell>
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
	border-top: 1px solid #ddd;
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

	.data-row {
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

const DataCell = styled.div`
	padding-top: 10px;
	padding-bottom: 10px;
	color: #808080;
	padding: 10px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	/* width: ${(props) => (props.columnWidth ? props.columnWidth : "100%")}; */
	/* border: ${(props) => (props.isActive ? "1px solid blue" : "none")}; */

	:hover {
		background-color: ${(props) => (props.isHoverable ? "#ddd" : "")};
		border: ${(props) => (props.isHoverable ? "1px solid #000" : "none")};
	}
`;

const DataValue = styled.div`

`

const DataInput = styled.div`
	input {
		border: none;
		outline: none;
        width: ${({ isActive }) => isActive && '98%'};
        /* background-color: blue; */
	}
    `
