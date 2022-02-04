import React from "react";
import styled from "styled-components";

import MyTasksHeader from "./MyTasksHeader"
import Table from './Table'

const MyTasks = () => {
	return (
		<MyTasksContainer>
            <MyTasksHeader />
				<Table />
		</MyTasksContainer>
	);
};

export default MyTasks;

const MyTasksContainer = styled.div`
	display: flex;
    flex-direction: column;
    margin-top: 4em;
    width: 100vw;
`;
