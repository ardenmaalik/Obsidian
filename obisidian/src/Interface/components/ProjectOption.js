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
	font-size: 12px;
	align-items: center;
	padding-left: 2px;
	cursor: pointer;

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