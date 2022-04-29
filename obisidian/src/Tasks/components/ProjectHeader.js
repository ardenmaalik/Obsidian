import React, { useState, useEffect } from "react";
import styled from "styled-components";

import AddTaskButton from "./AddTaskButton";


const ProjectHeader = ({sortData, addEmptyTaskValue}) => {
	const [displayDropdown, setDisplayDropdown] = useState(null);

	// const handleClickOutside = () => {
	// 	setDisplayDropdown(false);
	// };


	return (
		<MyTasksHeaderContainer>
			<SubHeaderContainer>
				<SubHeaderLeft>
					<AddTaskButton
						addEmptyTaskValue={addEmptyTaskValue}
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

export default ProjectHeader;


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