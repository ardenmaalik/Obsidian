import React from "react";

export function sortAssignee(data) {
    console.log('sortassignee called')
    let assignee = data.map((item) => {
        return item.assignee
    })

	// let sortedData = data.sort((a, b) => {
	// 	return a - b;
	// });
	console.log('sorted data: ', assignee);
}
