export const COLUMNS = [
	{
		field: "task_name",
		headerName: "Task Name",
		editable: true,
		width: '150px',
	},
	{
		field: "assignee",
		headerName: "Assignee",
		editable: true,
		width: '150px',
	},
	{
		field: "due_date",
		type: "date",
		headerName: "Due Date",
		editable: true,
		width: '150px',
    },
	{
		field: "+",
		type: "null",
		headerName: "+",
		editable: false,
		width: '150px',
    },
];