import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { height } from "@mui/system";

import DatePicker from "@mui/lab/DatePicker";
import DateAdapter from "@mui/lab/AdapterDayjs";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TextField from "@mui/material/TextField";

function DueDateInput({
	value: initialValue,
	row: { index },
	column: { id },
	updateData,
	handleOnFocus,
	handleOnBlur,
	handleInputOnChange,
	isSelected,
	setIsSelected,
}) {
	const dateRef = useRef();

	useEffect(() => {
		console.log(index, isSelected.index);
		if (isSelected.index === index && isSelected.field === id) {
			dateRef.current.children[0].children[0].focus();
		}
	}, [isSelected]);

	const [value, setValue] = useState(initialValue);

	const onKeyDown = (e) => {
		if (e.key === "Enter") {
			setIsSelected({ index: null, field: null });
		}
	};

	const onChange = (value) => {
		let val = "";
		console.log(value)

		//for empty input
		if (value !== null) {
			const newDate = new Date(value).toString();
			val = newDate.slice(4, -42);
		}

		//for typing directly into input box
		if (!isNaN(value)) {
			setValue(val)
			updateData(index, id, val);
		}
	};

	const onBlur = () => {
		setIsSelected({ index: null, field: null });
		console.log("UPDATE: ", index, id, value);
	};

	return (
		<DueDateContainer
			onClick={() => setIsSelected({ index: index, field: id })}
		>
			<DueDateValue
				showInput={
					isSelected.index === index && isSelected.field === "due_date"
						? true
						: false
				}
			>
				{value}
			</DueDateValue>
			<DueDateInputContainer
				showInput={
					isSelected.index === index && isSelected.field === "due_date"
						? true
						: false
				}
			>
				<LocalizationProvider dateAdapter={DateAdapter}>
					<DatePicker
						ref={dateRef}
						className='datepicker'
						value={!value.length ? new Date().toString() : value}
						onChange={(newDate) => {
							onChange(newDate);
						}}
						onAccept={() => onBlur(index, id, value)}
						renderInput={(params) => (
							<TextField
								{...params}
								onClick={() => console.log(params)}
							/>
						)}
						// onKeyDown={(e) => handleOnKeyDown(e)}
					/>
				</LocalizationProvider>
			</DueDateInputContainer>
		</DueDateContainer>
	);
}

export default DueDateInput;

const DueDateContainer = styled.div`
	width: 100%;
	height: 100%;
`;

const DueDateValue = styled.div`
	padding: 10px;
	display: ${({ showInput }) => (showInput ? "none" : "block")};
`;

const DueDateInputContainer = styled.div`
	display: ${({ showInput }) => (showInput ? "block" : "none")};
	width: 100%;
	height: 100%;

	.MuiFormControl-root,
	.MuiTextField-root,
	.css-1u3bzj6-MuiFormControl-root-MuiTextField-root,
	.MuiOutlinedInput-root,
	.MuiInputBase-root {
		width: 100%;
		height: 100%;
	}
`;
