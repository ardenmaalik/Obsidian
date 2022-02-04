import React, { useState } from "react";
import styled from "styled-components";

import AddTaskButton from "./AddTaskButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

const MyTasksHeader = () => {
	const [displayTaskInput, setDisplayTaskInput] = useState(null);
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
						displayTaskInput={displayTaskInput}
						setDisplayTaskInput={setDisplayTaskInput}
					/>
				</SubHeaderLeft>
				<SubHeaderRight>
					<p>All tasks</p>
					<p>Filter</p>
					<p>Sort</p>
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
`

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
