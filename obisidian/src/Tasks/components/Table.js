import React, {
	useState,
	useEffect,
	useRef,
	useMemo,
	useCallback,
} from "react";
import { useSelector} from "react-redux";
import { useVirtual } from "react-virtual";

import {
	useTable,
	useResizeColumns,
	useFlexLayout,
	useRowSelect,
	useSortBy,
} from "react-table";

import Row from "./Row";
import EditableCell from "./EditableCell";

const Table = ({
	records,
	columns,
	data,
	displayNewTask,
	setIsSelected,
	isSelected,
	updateData,
	filterOutEmptyTasks
}) => {

	const [columnDimensions, setColumnDimensions] = useState([]);
	const columnHeadersRef = useRef([]);

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
		state,
	} = useTable(
		{
			columns,
			data,
			updateData,
			isSelected,
			setIsSelected,
			displayNewTask,
			filterOutEmptyTasks
		},
		useSortBy,
		useResizeColumns,
		useFlexLayout,
		useRowSelect
	);

	useEffect(() => {
		console.log("Rows: ", rows);
		console.log('Columns: ', columns)
	}, []);

	const headerProps = (props, { column }) => getStyles(props, column.align);

	const getStyles = (props, align = "left") => [
		props,
		{
			style: {
				justifyContent: align === "right" ? "flex-end" : "flex-start",
				alignItems: "flex-start",
				display: "flex",
			},
		},
	];

	const parentRef = useRef();

	const { totalSize, virtualItems } = useVirtual({
		size: rows.length,
		overscan: 50,
		parentRef,
		estimateSize: useCallback(() => 35, []),
		keyExtractor: useCallback((index) => rows[index].id, [rows]),
	});

	const columnResizingWidths = state.columnResizing.columnWidths;
	const { columnOrder } = state;

	const getColumnDimensions = useCallback(() => {
		const widths = columnHeadersRef.current
			?.filter((colEl) => !!colEl)
			.map((colEl) => colEl.offsetWidth);

		const dimensions = columnHeadersRef.current?.map((colEl, idx) => ({
			width: widths[idx],
			left: widths.reduce(
				(acc, colWidth, colWidthIdx) =>
					colWidthIdx < idx ? acc + colWidth : acc,
				0
			),
			right: widths.reduce(
				(acc, colWidth, colWidthIdx) =>
					colWidthIdx > idx ? acc + colWidth - 1 : acc,
				0
			),
		}));

		return dimensions;
	}, [columnHeadersRef]);

	useEffect(() => {
		setColumnDimensions(getColumnDimensions);
	}, [getColumnDimensions, columnResizingWidths, columnOrder]);

	useEffect(() => {
		console.log();
		if (displayNewTask) {
			// addEmptyTaskValue();
		} else {
			return null;
		}
	}, [displayNewTask]);

	useEffect(() => {
		console.log("records: ", records);
	},[]);

	return (
		<>
			<div {...getTableProps()} className='table'>
				<div>
					{headerGroups.map((headerGroup) => (
						<div {...headerGroup.getHeaderGroupProps()} className='tr'>
							{headerGroup.headers.map((column, i) => (
								<div
									{...column.getSortByToggleProps()}
									{...column.getHeaderProps(headerProps)}
									ref={(ref) => {
										columnHeadersRef.current[i] = ref;
									}}
									className={`th${column.canSort ? ` sortable` : ``}`}
								>
									{column.render("Header")}
									<span>
										{column.isSorted
											? column.isSortedDesc
												? " 🔽"
												: " 🔼"
											: ""}
									</span>
									{i === headerGroup.headers.length - 1 ? (
										column.canResize === false
									) : column.canResize ? (
										<div
											onClick={(e) => e.stopPropagation()}
											{...column.getResizerProps()}
											className={`resizer ${
												column.isResizing ? "isResizing" : ""
											}`}
										/>
									) : (
										""
									)}
								</div>
								// console.log('COLUMN: ', column)
							))}
						</div>
					))}
				</div>
				<div
					ref={parentRef}
					className='List'
					style={{
						width: `100%`,
						overflow: "auto",
						flex: "1",
					}}
				>
					<div
						{...getTableBodyProps()}
						style={{
							height: `${totalSize}px`,
							width: "100%",
							position: "relative",
							display: "flex",
						}}
					>
						{virtualItems.map((virtualRow) => (
							<Row
								virtualRow={virtualRow}
								key={virtualRow.key}
								rows={rows}
								prepareRow={prepareRow}
							/>
						))}
					</div>
				</div>
			</div>
		</>
	);
};

export default Table;
