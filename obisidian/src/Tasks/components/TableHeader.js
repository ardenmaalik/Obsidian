import React from "react";
import Cell from "./Cell";

const TableHeader = ({ columns }) => {
	return (
		<thead>
			<tr key='heading'>
				{columns.map((data) => (
					// <DataHeader
					// 	name={header.headerName}
					// 	field={header.field}
					// 	width={header.width}
					// 	isSorted={isSorted}
					// 	setIsSorted={setIsSorted}
					// 	sortData={sortData}
					// />
					<Cell header={true} data={data} columns={columns} />
				))}
			</tr>
		</thead>
	);
};

export default TableHeader;
