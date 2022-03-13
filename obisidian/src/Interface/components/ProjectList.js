import React, {useEffect} from 'react'
import styled from 'styled-components';
import ProjectOption from './ProjectOption'


const ProjectList = ({ projects }) => {
//Projects will be listed on far left in separate sidebar
    return (
        <ProjectListContainer>
            {projects?.docs.map((doc) => (
                <ProjectOption key={doc.id} id={doc.id} title={doc.data().name}/>
            ))}
   </ProjectListContainer>
  )
}

export default ProjectList

const ProjectListContainer = styled.div`
`