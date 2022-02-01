import React from "react";
import styled from "styled-components";

import Table from './Table'

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

const MyTasksHeader = () => {
	return (
		<MyTasksHeaderContainer>
			<HeaderLeft>
				<span>Project Name</span>
				<ExpandMoreIcon />
				<InfoOutlinedIcon />
				<StarBorderOutlinedIcon />
				<FiberManualRecordIcon />
				<p>Set status</p>
			</HeaderLeft>
			<SubHeaderContainer>
				<SubHeaderRight>
					<p>All tasks</p>
					<p>Filter</p>
					<p>Sort</p>
					<p>Customize</p>
					<p>Create Link</p>
					<p>More...</p>
				</SubHeaderRight>
			</SubHeaderContainer>
            <MainContent>
                <Table/>
            </MainContent>
		</MyTasksHeaderContainer>
	);
};

export default MyTasksHeader;

const MyTasksHeaderContainer = styled.div`
	border-bottom: 1px solid #c0c0c0;
	/* background-color: blue; */
	width: 100%;
	height: 50px;
`;

const SubHeaderContainer = styled.div`
	display: flex;
	width: 100%;
	height: 50px;
	border-bottom: 1px solid #c0c0c0;
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

const MainContent = styled.div`
	display: flex;
	width: 100%;
`;

const HeaderLeft = styled.div`
	display: flex;
	width: 100%;
	padding: 10px 0;
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
