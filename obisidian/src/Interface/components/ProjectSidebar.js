import React from 'react'
import styled from 'styled-components'

import ProjectList from './ProjectList'

import { getFirestore, collection } from "firebase/firestore";
import { firebaseApp } from "../../firebase";
import { useCollection } from "react-firebase-hooks/firestore";


function ProjectSidebar() {
  const [projects] = useCollection(
		collection(getFirestore(firebaseApp), "projects")
  );
  
  return (
		<ProjectsContainer>
			<ProjectList projects={projects} />
		</ProjectsContainer>
	);
}

export default ProjectSidebar

//placeholder CSS to start with...
const ProjectsContainer = styled.div`
display: flex;
justify-content: center;
margin-top: 60px;
padding: 10px;
width: 80px;
  background-color: #18191A;
`