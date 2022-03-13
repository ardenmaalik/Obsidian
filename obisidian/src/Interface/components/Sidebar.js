import React from "react";
import styled from "styled-components";
import SidebarOptionList from "./SidebarOptionList";
import { getFirestore, collection } from "firebase/firestore";
import { firebaseApp } from "../../firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import {auth} from '../../firebase'

import ProjectList from './ProjectList'
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import CreateIcon from "@mui/icons-material/Create";



function Sidebar() {
	const [channels, loading, error] = useCollection(
		collection(getFirestore(firebaseApp), "rooms")
	);
	const [projects] = useCollection(collection(getFirestore(firebaseApp), "projects"));
	const [user] = useAuthState(auth);

	return (
		<SidebarContainer>
			<SidebarHeader>
				<SidebarInfo>
					<h2>OBSIDIAN</h2>
					<h3>
						<FiberManualRecordIcon />
						Arden Maalik
					</h3>
				</SidebarInfo>
				<CreateIcon />
			</SidebarHeader>

			<SidebarOptionList channels={channels} />
			<ProjectList projects={projects}/>
		</SidebarContainer>
	);
}

export default Sidebar;

const SidebarContainer = styled.div`
	color: white;
	background-color: var(--obsidian-color);
	flex: 0.3;
	border-top: 1px solid #49274b;
	max-width: 260px;
	margin-top: 60px;

	> hr {
		margin-top: 10px;
		margin-bottom: 10px;
		border: 1px solid #49274b;
	}
`;

const SidebarHeader = styled.div`
	display: flex;
	border-bottom: 1px solid #49274b;
	padding: 13px;

	> .MuiSvgIcon-root {
		padding: 8px;
		color: #49274b;
		font-size: 18px;
		background-color: #fff;
		border-radius: 999px;
	}
`;
const SidebarInfo = styled.div`
    flex: 1;

    > h2 {
        font-size: 15px;
        font-weight: 900;
        margin-bottom: 5px;
    }

    > h3 {
        display: flex;
        font-size: 13px;
        font-weight: 400;
        align-items
    }

    > h3 > .MuiSvgIcon-root {
        font-size: 14px;
        margin-top: 1px;
        margin-right: 2px;
        color: green;
    }
`;
