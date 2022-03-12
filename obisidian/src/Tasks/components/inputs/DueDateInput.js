import React, { useEffect } from "react";
import styled from "styled-components";

import DatePicker from "@mui/lab/DatePicker";
import DateAdapter from "@mui/lab/AdapterDayjs";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TextField from "@mui/material/TextField";

function DueDateInput({
	val,
	index,
	field,
	handleOnFocus,
	handleOnBlur,
	handleInputOnChange,
	isSelected,
	setIsSelected
}) {

		const handleOnKeyDown = (e) => {
			if (e.key === "Enter") {
				setIsSelected({ index: null, field: null });
			}
	};
	
	return (
		<DueDateContainer>
			<DueDateValue
				showInput={
					isSelected.index === index && isSelected.field === "due_date"
						? true
						: false
				}
				onClick={() => setIsSelected({ index: index, field: field })}
			>
				{val}
			</DueDateValue>
			<DueDateInputContainer
				showInput={
					isSelected.index === index && isSelected.field === "due_date"
						? true
						: false
				}
				// onFocus={() => handleOnFocus(index, field)}
				// onBlur={() => handleOnBlur()}
			>
				<LocalizationProvider dateAdapter={DateAdapter}>
					<DatePicker
						views={["day", "month"]}
						value={val}
						onChange={(e) => {
							handleInputOnChange(e, index, field);
						}}
						renderInput={(params) => (
							<TextField {...params} onClick={() => console.log(params)} />
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
`;

const DueDateValue = styled.div`
	display: ${({ showInput }) => (showInput ? "none" : "block")};
`;

const DueDateInputContainer = styled.div`
	display: ${({ showInput }) => (showInput ? "block" : "none")};

	.MuiOutlinedInput-root {
		font-size: 12px;
		height: 30px;
	}
`;
