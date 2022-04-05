const Row = ({ virtualRow, rows, prepareRow }) => {
	const row = rows[virtualRow.index];
	prepareRow(row);
	return (
		<div
			{...row.getRowProps()}
			key={virtualRow.key}
			ref={(ref) => virtualRow.measureRef(ref)}
			className={
				virtualRow.index % 2 ? "tr row ListItemOdd" : "tr row ListItemEven"
			}
			style={{
				position: "absolute",
				display: "flex",
				width: "100%",
				top: 0,
				left: 0,
				transform: `translateY(${virtualRow.start}px)`,
			}}
		>
            {row.cells.map((cell, i) => {
				return (
					<div
                        {...cell.getCellProps()}
                        key={i}
                        className={`td ${cell.column.id}`}
					>
						{cell.render("Cell")}
					</div>
				);
			})}
		</div>
	);
};

export default Row