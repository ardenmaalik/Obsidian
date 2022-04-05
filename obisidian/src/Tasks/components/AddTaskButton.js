import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { displayAddTask } from "../../features/appSlice";

import CaretDown from "@mui/icons-material/KeyboardArrowDown";
import AddIcon from "@mui/icons-material/Add";

const AddTaskButton = ({addEmptyTaskValue}) => {
	const [displayList, setDisplayList] = useState(null);

	const dispatch = useDispatch();

	useEffect(() => {
		document.addEventListener("click", handleClickOutside, true);

		return () => {
			document.removeEventListener("click", handleClickOutside, true);
		};
	});

	const handleClickOutside = () => {
		setDisplayList(false);
	};



	return (
		<AddTaskButtonContainer>
			<AddTaskBtn onClick={() => addEmptyTaskValue()}>
				<AddIcon/>
				<span >Add Task</span>
			</AddTaskBtn>
			<Dropdown>
				<DropdownButton onClick={() => setDisplayList(true)}>
					<CaretDown />
				</DropdownButton>
				{displayList && (
					<DropdownContent displayList={displayList}>
						<ul>
							<li>Add section</li>
							<li>Add milestone</li>
						</ul>
					</DropdownContent>
				)}
			</Dropdown>
		</AddTaskButtonContainer>
	);
};

export default AddTaskButton;

const AddTaskButtonContainer = styled.div`
	position: relative;
	display: flex;
	width: 120px;
	height: 30px;

	button {
		height: 100%;
		outline: none;
	}
`;

const Dropdown = styled.div`
	position: relative;
	display: inline-block;
	border-top-left-radius: 8px;
	border-bottom-left-radius: 8px;
	padding: 0;
`;

const DropdownButton = styled.button`
	border-color: lightgray;
	border-top-right-radius: 8px;
	border-bottom-right-radius: 8px;
	border-width: thin;
	padding: 0.1em;

	> .MuiSvgIcon-root {
		font-size: 18px;
	}
`;

const DropdownContent = styled.div`
	position: absolute;
	display: ${({ displayList }) => (displayList ? "flex" : "none")};
	flex-direction: column;
	background-color: #fff;
	width: 245px;
	height: auto;
	border: 0.1em solid lightgray;
	border-radius: 5px;
	z-index: 1;
	margin-top: 0.2em;

	ul {
		text-decoration: none;
		list-style-type: none;
		margin: 0;
		padding: 0;
	}
	li {
		font-size: 14px;
		cursor: pointer;
		width: 100%;
		padding: 0.5em;
	}

	li:hover {
		background-color: lightgray;
		width: auto;
	}
`;

const AddTaskBtn = styled.button`
	display: flex;
	align-items: center;
	border-color: lightgray;
	border-top-left-radius: 8px;
	border-bottom-left-radius: 8px;
	border-right: none;
	border-width: thin;
	padding-left: 0.2em;
	padding-right: 0.5em;
	margin: 0;

	span {
		font-size: 12px;
	}

	.MuiSvgIcon-root {
		font-size: 16px;
	}
`;
