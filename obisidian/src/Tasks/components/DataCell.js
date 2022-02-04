import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MOCK_DATA from "./MOCK_DATA";

const DataCell = ({ field, val, id, COLUMNS, index, columnWidth, row }) => {
	const [inputHover, setInputHover] = useState(null);
	const [isEditing, setIsEditing] = useState(null);

	// console.log("KEY: ", field, val);

	const handleOnClick = (x, y, e) => {
		setInputHover(false);
		setIsEditing(y);
	};

	useEffect(() => {});

	return (
		<DataCellContainer
			field={field}
			id={id}
			columnWidth={columnWidth}
			onMouseEnter={() => setInputHover(true)}
			onMouseLeave={() => setInputHover(false)}
		>
			{field === "task_name" ? (
				inputHover ? (
					<input
						readOnly
						type='text'
						value={val}
						className='input-hover'
						onClick={(e) => {
							handleOnClick(field, id, e);
						}}
					/>
				) : isEditing ? (
					<IsEditingInput id={id} isActive={isEditing === id ? true : false}>
						<input type='text' value={val} />
					</IsEditingInput>
				) : (
					val
				)
			) : (
				val
			)}
		</DataCellContainer>
	);
};

 

export default DataCell;

const DataCellContainer = styled.div`
	padding-top: 10px;
	padding-bottom: 10px;
	color: #808080;
	padding: 10px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	/* width: ${(props) => (props.columnWidth ? props.columnWidth : "100%")}; */
	/* border: ${(props) => (props.isActive ? "1px solid blue" : "none")}; */

	.task-edit {
		color: #949494;
		border: none;
		outline: none;
	}

	:hover {
		background-color: #ddd;
		border: 1px solid #000;
	}
`;

const IsEditingInput = styled.div`
	> input {
		background-color: ${(props) => (props.Active ? "blue" : "white")};
        
	}
`;
