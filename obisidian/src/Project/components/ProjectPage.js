import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux"
import {selectProjectName} from "../../features/appSlice"
import styled from 'styled-components'

import Users from './Users.json'
import Background from './Background'
import ProjectRoles from './ProjectRoles'

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

const ProjectPage = ({ name }) => {
	const projectName = useSelector(selectProjectName);
	const [users, setUsers] = useState(Users)

	useEffect(() => {
		console.log(projectName)
	})
	return (
		<ProjectContainer>
			<Header>
				<HeaderLeft>
					<span>{projectName}</span>
					<ExpandMoreIcon />
					<InfoOutlinedIcon />
					<StarBorderOutlinedIcon />
					<FiberManualRecordIcon />
					<p>Set status</p>
				</HeaderLeft>
			</Header>
			<Background />
			<ProjectRoles users={users} setUsers={setUsers}/>
			{/* <KeyResources />
			<Milestones /> */}
		</ProjectContainer>
	);
};

export default ProjectPage;

const ProjectContainer = styled.div`
margin-top: 60px;
width: 100%;
`

const Header = styled.div`
	padding: 1em;
	border-bottom: 1px solid #ddd;
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