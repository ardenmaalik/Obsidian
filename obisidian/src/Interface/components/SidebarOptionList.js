import React from 'react'
import styled from 'styled-components'

import SidebarOption from './SidebarOption'
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AppsIcon from "@mui/icons-material/Apps";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";

function SidebarOptionList({channels}) {
    return (
        <SidebarOptionListContainer>
            <SidebarOption Icon={InsertCommentIcon} title='Overview' />
			<SidebarOption Icon={InboxIcon} title='Mentions & reactions' />
			<SidebarOption Icon={DraftsIcon} title='Saved items' />
			<SidebarOption Icon={BookmarkBorderIcon} title='My Tasks' />
			<SidebarOption Icon={PeopleAltIcon} title='People & user groups' />
			<SidebarOption Icon={AppsIcon} title='Apps' />
			<SidebarOption Icon={FileCopyIcon} title='File browser' />
			<SidebarOption Icon={ExpandLessIcon} title='Show less' />
			<hr />
			<SidebarOption Icon={ExpandMoreIcon} title='Direct Messages' />
			<hr />
			{/* <SidebarOption Icon={AddIcon} addChannelOption title='Add Channel' /> */}

			{channels?.docs.map((doc) => (
				<SidebarOption key={doc.id} id={doc.id} title={doc.data().name} />
            ))}  
        </SidebarOptionListContainer>
    )
}

export default SidebarOptionList

const SidebarOptionListContainer = styled.div`

`;
