import React, {useEffect, useState, useRef} from 'react'
import styled from 'styled-components'


const AssigneeCell = ({
    value: initialValue,
    row: { index },
    column: { id },
    updateData,
    setIsSelected,
    isSelected
}) => {
	const [value, setValue] = useState(initialValue)
	
	const assigneeRef = useRef();

	useEffect(() => {
		console.log(index, isSelected.index)
		if (isSelected.index === index && isSelected.field === id) {
			assigneeRef.current.focus()
		}
	}, [isSelected])

    const onChange = (e) => {
        setValue(e.target.value)
	}
	
	const onBlur = () => {
		setIsSelected({ index: null, field: null });
		updateData(index, id, value)
	}

    const onKeyDown = (e) => {
			if (e.key === "Enter") {
				setIsSelected({ index: null, field: null });
			}
	};
	
	const onClick = () => {
		setIsSelected({ index: index, field: id });
	}

  return (
		<>
			<Assignee
				showInput={
					isSelected.index === index && isSelected.field === "assignee"
						? true
						: false
				}
				onClick={onClick}
			>
				{value}
			</Assignee>
			<AssigneeValue
				showInput={
					isSelected.index === index && isSelected.field === "assignee"
						? true
						: false
				}
			>
				<input
					ref={assigneeRef}
					name={id}
					type='text'
					placeholder={"Name or email"}
					onChange={onChange}
					onKeyDown={onKeyDown}
					onBlur={onBlur}
					autoFocus={true}
				/>
			</AssigneeValue>
		</>
	);
}

export default AssigneeCell


const AssigneeContainer = styled.div``;

const AssigneeValue = styled.div`
	display: ${({ showInput }) => (showInput ? "block" : "none")};
	height: 100%;
`;

const Assignee = styled.div`
	display: ${({ showInput }) => (showInput ? "none" : "flex")};
    width: 100%;
    height: 100%;
	align-items: center;
	padding-left: 10px;
`;