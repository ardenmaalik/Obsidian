import React, { useEffect } from "react";
import styled from "styled-components";

function DataHeader({ header, index, headerWidth, isSorted, setIsSorted, sortData }) {

    const handleSorting = (field) => {
        if (isSorted !== field) {
            setIsSorted(field)
        } else {
            setIsSorted(false)
        }
    }

  
	return (
        <HeaderContainer headerWidth={headerWidth} key={index} sorted={() => setIsSorted(header.field)} onClick={() => sortData(header.field) }>
			{header.headerName}
			<span className='resizer'></span>
		</HeaderContainer>
	);
}

export default DataHeader;

const HeaderContainer = styled.div`
	position: sticky;
	padding: 10px;
	border-right: 1px solid #ddd;
	border-bottom: 1px solid #ddd;
	/* width: ${({ headerWidth }) => (headerWidth ? headerWidth : "100%")}; */
    font-size: 12px;
    color: #949494;
    font-weight: 600;

    :hover {
        background-color: #F5F5F5;
    }
    
`;
