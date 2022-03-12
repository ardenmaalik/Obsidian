import React, { useEffect } from "react";
import styled from "styled-components";

function AssigneeInput({
	index,
	field,
	val,
	isSelected,
	handleOnFocus,
	handleInputOnChange,
	setIsSelected,
	showAssigneeInput,
	assigneeInput
}) {


	const handleOnKeyDown = (e) => {
		if (e.key === "Enter") {
			setIsSelected({index: null, field: null})
		}
	}

	return (
		<AssigneeContainer onClick={(e) => console.log(e)}>
			<Assignee
				showInput={
					isSelected.index === index && isSelected.field === "assignee"
						? true
						: false
				}
				onClick={() => setIsSelected({ index: index, field: field })}
			>
				{val}
			</Assignee>
			<AssigneeValue
				showInput={
					isSelected.index === index && isSelected.field === "assignee"
						? true
						: false
				}
			>
				<input
					name={field}
					type='text'
					placeholder={val}
					onChange={(e) => handleInputOnChange(e, index, field)}
					onKeyDown={(e) => handleOnKeyDown(e)}
				/>
			</AssigneeValue>
		</AssigneeContainer>
	);
}

export default AssigneeInput;

const AssigneeContainer = styled.div``;

const AssigneeValue = styled.div`
	display: ${({ showInput }) => (showInput ? "block" : "none")};

	input {
		width: 98%;
		height: 25px;
		border: none;
	}
`;

const Assignee = styled.div`
	display: ${({ showInput }) => (showInput ? "none" : "block")};
`;
