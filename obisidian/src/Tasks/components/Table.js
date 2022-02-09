import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import MOCK_DATA from "./MOCK_DATA.json";
import { COLUMNS } from "./columns";
import styled from "styled-components";
import DataHeader from "./DataHeader";
import { displayAddTask } from "../../features/appSlice";
// import DataCell from './DataCell';

import { selectAddTask } from "../../features/appSlice";

const Table = () => {
	const [isEditing, setIsEditing] = useState("");
	const [selected, setSelected] = useState("");
	const [isSorted, setIsSorted] = useState(false);
	const [inputHover, setInputHover] = useState(null);
	const [dataState, setDataState] = useState([...MOCK_DATA]);
	const [test, setTest] = useState("");

	const displayInput = useSelector(selectAddTask);
	const dispatch = useDispatch();

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
		let sortedData = [...dataState];

		if (isSorted) {
			if (isSorted === "assignee") {
				sortedData.sort((a, b) =>
					a.assignee < b.assignee ? -1 : a.assignee > b.assignee ? 1 : 0
				);
			} else if (isSorted === "task_name") {
				sortedData.sort((a, b) =>
					a.task_name < b.task_name ? -1 : a.task_name > b.task_name ? 1 : 0
				);
			} else if (isSorted === "due_date") {
				sortedData.sort(
					(a, b) =>
						new Date(a.due_date).getTime() - new Date(b.due_date).getTime()
				);
			}
		}
		return sortedData;
	}, [isSorted, dataState]);

	useEffect(() => {
		// const updatedData = dataState

		const newValue = {
			id: 0,
			task_name: '',
			assignee: null,
			due_date: null,
			field: null,
		};

		if (displayInput) {
            setDataState((prevState) => [newValue, ...prevState]);
            setIsEditing(0)
		}

		// console.log("data State: ", dataState);
	}, [displayInput]);

	useEffect(() => {
		console.log(dataState);
	}, [dataState]);

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

	useEffect(() => {
		console.log("select: ", selected, isEditing);
	}, [selected]);

    const handleInputOnChange = (e, index) => {
        e.preventDefault()
        const dataTable = [...dataState];
        // dataTable[index].task_name = e.target.value;
        setDataState(
            dataTable.map((data, data_index) =>
                data_index === index ? { ...data, task_name: e.target.value } : data
            )
        );
        // setInput([...MOCK_DATA])
    };

    const handleOnClick = (index) => {
        setIsEditing(index);
        setSelected(index)

    }

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
				{data.map((row, index) => (
					<DataRow key={index} id={index}>
						{Object.entries(row, index).map(
							([key, val]) =>
								key !== "id" && (
									// <DataCell id={index} index={index} cellVal={val} dataKey={key} columnWidth={columnWidth}/>
									<DataCell
										id={index}
										columnWidth={columnWidth(key)}
										isHoverable={
											isEditing === index && key === "task_name" ? false : true
										}
										cellVal={val}
										selected={selected === index ? true : false}
									>
										{key === "task_name" ? (
											<DataInput
												id={index}
												isActive={isEditing === index ? true : false}
												onClick={() => {
													handleOnClick(index);
												}}
											>
												<input
													readOnly={false}
													name={key}
													type='text'
													value={dataState[index].task_name}
													onChange={(e) => handleInputOnChange(e, index)}
													placeholder={
														isEditing === 0 ? "Write a task name" : false
													}
												/>
											</DataInput>
										) : (
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
	border: ${(props) => (props.isActive ? "1px solid blue" : "none")};
    background-color: ${({ selected }) => selected ? '#ADD8E6' : "#FFF"};
    
	:hover {
		background-color: ${(props) => (props.isHoverable ? "#F5F5F5" : "")};
		border: ${(props) => (props.isHoverable ? "1px solid #000" : "none")};
	}
`;

const DataValue = styled.div``;

const DataInput = styled.div`
	input {
		border: none;
		outline: none;
		/* width: ${({ isActive }) => isActive && "98%"}; */
		/* background-color: blue; */
		font-size: 12px;
		color: #808080;
	}

    
`;
