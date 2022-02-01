import React, { useEffect } from "react";
import styled from "styled-components";

const DataCell = ({ key, val, COLUMNS, index, columnWidth }) => {
	return <DataCellContainer columnWidth={columnWidth}>{val}</DataCellContainer>;
};

export default DataCell;

const DataCellContainer = styled.div`
	padding-top: 10px;
	padding-bottom: 10px;
	color: #808080;
	padding: 10px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	/* width: ${(props) => (props.columnWidth ? props.columnWidth : "100%")}; */
	border-right: 1px solid #dfdfdf;
	border-bottom: 1px solid #ddd;

    :hover {
        background-color: #ddd;
        border: 1px solid #000;
    }
`;
