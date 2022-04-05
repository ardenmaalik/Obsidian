<table className='table'>
	<TableHeader columns={columns} />
	{/* <AddField>
					<span>+</span>
				</AddField> */}
	{/* <DataRowContainer>
			{records.map((row, index) => (
				<DataRow
					id={`${"row_" + index}`}
					selectedRow={isRowSelected === index ? true : false}
					onClick={(e) => handleRowOnClick(index)}
				>
					{Object.entries(row, index).map(
						([key, val], index) =>
							key !== "id" && (
								<Cell
									id={row.id}
									records={records}
									setRecords={setRecords}
									field={key}
									val={val}
									index={index}
									setIsSelected={setIsSelected}
									isSelected={isSelected}
									displayNewTask={displayNewTask}
									setDisplayNewTask={setDisplayNewTask}
									editDate={editDate}
									setEditDate={setEditDate}
									assigneeInput={assigneeInput}
									showAssigneeInput={showAssigneeInput}
									filterEmptyTasks={filterEmptyTasks}
									createNewDoc={createNewDoc}
									columns={columns}
								/>
							)
					)}
				</DataRow>
			))}
			</DataRowContainer> */}
	{/* <AddTaskRow/> */}
</table>;
