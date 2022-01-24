import React, { useState } from "react";
import styled from "styled-components";

import NewProjectForm from "./NewProjectForm";

import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";

const Homepage = () => {
    const [projects, setProjects] = useState(null);
    const [activeModal, setActiveModal] = useState(false)
    
    const showNewProjectForm = () => {
        setActiveModal(true)
    }

	return (
        <HomepageContainer>
            <CreateNewProjectContainer activeModal={activeModal} onClick={showNewProjectForm}>
				{/*Onclick bring up new project form*/}
				{projects == null && (
					<CreateNewProject>
						<AddBoxOutlinedIcon />
						<h4>Create a new project</h4>
						<p>Start from scratch</p>
					</CreateNewProject>
				)}
            </CreateNewProjectContainer>
            <NewProjectForm activeModal={activeModal}/>
		</HomepageContainer>
	);
};

export default Homepage;

const HomepageContainer = styled.div`
	display: flex;
	width: 100%;
	justify-content: center;
	align-items: center;
`;

const CreateNewProjectContainer = styled.div`
	display: ${(props) => (props.activeModal ? "none" : "flex")};
	flex-direction: column;
	justify-content: start;
	height: 245px;
	padding: 5px;
	border-radius: 25px;
	color: black;
	cursor: pointer;
	background-color: purple;

	:hover {
		background-color: #d9c4ec;
	}

	:hover .MuiSvgIcon-root {
		color: #fff;
	}
`;

const CreateNewProject = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: start;
	align-items: center;

	> p {
		font-size: 12px;
	}

	> .MuiSvgIcon-root {
		padding: 8px;
		color: #d8d8d8;
		font-size: 150px;
		/* border-radius: 999px; */
	}

`;
