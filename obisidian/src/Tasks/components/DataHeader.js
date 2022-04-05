import React, { useEffect } from "react";
import styled from "styled-components";

function DataHeader({
	name,
	field,
	index,
	width,
	isSorted,
	setIsSorted,
	sortData,
}) {
	const handleSorting = (field) => {
		if (isSorted !== field) {
			setIsSorted(field);
		} else {
			setIsSorted(false);
		}
	};

	return (
			<HeaderContainer
				headerWidth={width}
				key={index}
				sorted={() => setIsSorted(field)}
				onClick={() => sortData(field)}
			>
				{name}
				<span className='resizer'></span>
			</HeaderContainer>
	);
}

export default DataHeader;

const HeaderContainer = styled.div`
	border-right: 1px solid #ddd;
	border-bottom: 1px solid #ddd;
	width: ${({ headerWidth }) => (headerWidth ? headerWidth : "100%")};
	font-size: 12px;
	color: #949494;
	font-weight: 600;

	:hover {
		background-color: #f5f5f5;
	}


`;
