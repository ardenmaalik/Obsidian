import React from "react";
import styled from "styled-components";

import MyTasksHeader from "./MyTasksHeader"

const MyTasks = () => {
	return (
        <MyTasksContainer>
            <MyTasksHeader/>
		</MyTasksContainer>
	);
};

export default MyTasks;

const MyTasksContainer = styled.div`
	display: flex;
    margin-top: 4em;
    width: 100%;
`;
