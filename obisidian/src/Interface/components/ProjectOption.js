import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import styled from 'styled-components'
import {useHistory} from 'react-router-dom'

import {openProject} from '../../features/appSlice'


function ProjectOption({ title, id }) {
    const dispatch = useDispatch();
    const history = useHistory();


    const selectProject = () => {
        if (id) {
            dispatch(openProject({
                projectId: id,
                projectName: title,
        }))
    }
}

    const handleOnClick = () => {
    
    selectProject()
    history.push(`/${id}/project/${title}`);

    }
    
    return (
        <ProjectOptionContainer onClick={handleOnClick}>
            <ProjectOptionTitle>
            {title}
            </ProjectOptionTitle>
        </ProjectOptionContainer>
  )
}

export default ProjectOption

const ProjectOptionContainer = styled.div`
	display: flex;
    justify-content: center;
    align-items: center;
	font-size: 12px;
	align-items: center;
	padding-left: 2px;
	cursor: pointer;
    background-color: turquoise;
    height: 50px;
    width: 50px;
    border-radius: 50%;
    margin-bottom: 1rem;

	:hover {
		opacity: 0.9;
		background-color: #340e36;
	}

	> h3 {
		font-weight: 500;
	}

	> h3 > span {
		padding: 15px;
	}
`;

const ProjectOptionTitle = styled.h3`
	padding: 10px 0;
	font-weight: 300;
`;