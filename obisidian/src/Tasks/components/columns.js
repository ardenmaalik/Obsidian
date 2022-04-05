import EditableCell from "./EditableCell";
import AssigneeCell from "./AssigneeCell";
import DueDateCell from "./inputs/DueDateCell";

export const COLUMNS = [
	{
		Header: "Task Name",
		accessor: "task_name",
		type: "string",
		editable: true,
		minWidth: 150,
		width: 150,
		maxWidth: 350,
		hidden: false,
		order: 0,
		Cell: EditableCell,
	},
	{
		Header: "Assignee",
		accessor: "assignee",
		type: "string",
		editable: true,
		minWidth: 50,
		width: 50,
		hidden: false,
		order: 1,
		Cell: AssigneeCell,
	},
	{
		Header: "Due Date",
		accessor: "due_date",
		type: "date",
		editable: true,
		minWidth: 50,
		width: 100,
		hidden: false,
		order: 2,
		Cell: DueDateCell
	},
	{
		Header: "+",
		accessor: "custom",
		type: "null",
		editable: false,
		width: 100,
		hidden: false,
		order: 3,
		canResize: false,
	},
];
