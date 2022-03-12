import React, { useState, useEffect } from "react";
import styled from "styled-components";

import AddTaskButton from "./AddTaskButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

const MyTasksHeader = ({sortData, displayNewTask, setDisplayNewTask}) => {
	const [displayDropdown, setDisplayDropdown] = useState(null);

	useEffect(() => {
		document.addEventListener("click", handleClickOutside, true);

		return () => {
			document.removeEventListener("click", handleClickOutside, true);
		};
	});

	const handleClickOutside = () => {
		setDisplayDropdown(false);
	};

	return (
		<MyTasksHeaderContainer>
			<Header>
				<HeaderLeft>
					<span>Project Name</span>
					<ExpandMoreIcon />
					<InfoOutlinedIcon />
					<StarBorderOutlinedIcon />
					<FiberManualRecordIcon />
					<p>Set status</p>
				</HeaderLeft>
			</Header>
			<SubHeaderContainer>
				<SubHeaderLeft>
					<AddTaskButton
						displayNewTask={displayNewTask}
						setDisplayNewTask={setDisplayNewTask}
					/>
				</SubHeaderLeft>
				<SubHeaderRight>
					<p>All tasks</p>
					<p>Filter</p>
					<SortButtonContainer
						className='sort'
						onClick={() => setDisplayDropdown("sort")}
					>
						<p>Sort</p>
						<SortDropdownContent Display={displayDropdown === 'sort' ? true : false}>
							<ul>
								<SortNone onClick={() => sortData('None') }><li>None</li></SortNone>
								<SortDueDate onClick={() => sortData('due_date')}><li>Due Date</li></SortDueDate>
								<SortAssignee onClick={() => sortData('assignee')}><li>Assignee</li></SortAssignee>
							</ul>
						</SortDropdownContent>
					</SortButtonContainer>
					<p>Customize</p>
					<p>Create Link</p>
					<p>More...</p>
				</SubHeaderRight>
			</SubHeaderContainer>
		</MyTasksHeaderContainer>
	);
};

export default MyTasksHeader;

const Header = styled.div`
	padding: 1em;
`;

const MyTasksHeaderContainer = styled.div`
	display: flex;
	flex-direction: column;
	/* border-bottom: 1px solid #c0c0c0; */
	/* background-color: blue; */
	width: 100%;
	height: auto;
	/* margin-bottom: 1.5em; */
`;

const SubHeaderContainer = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
	height: auto;
	border-top: 1px solid #c0c0c0;
	padding-top: 1em;
	padding-bottom: 1em;
`;

const SubHeaderRight = styled.div`
	display: flex;
	width: 100%;
	justify-content: end;
	align-items: center;
	font-size: 12px;

	> p {
		margin-right: 1em;
	}
`;

const SubHeaderLeft = styled.div`
	margin-left: 1em;
`;

const HeaderLeft = styled.div`
	display: flex;
	width: 100%;
	margin-left: 1em;

	span {
		font-size: 20px;
		font-weight: 600;
	}

	> .MuiSvgIcon-root {
		font-size: 20px;
		margin-right: 5px;
		color: #90949c;
	}
`;

const SortButtonContainer = styled.div`
	margin-right: 1em;
	cursor: pointer;
`;
const SortDropdownContent = styled.div`
	position: absolute;
	display: ${({ Display }) => (Display ? "flex" : "none")};
	flex-direction: column;
	background-color: #fff;
	width: 200px;
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

const SortDueDate = styled.div``
const SortAssignee = styled.div``
const SortNone = styled.div``