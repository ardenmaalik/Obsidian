import React from 'react';

export const filterEmptyTasks = (records, setRecords) => {
    const dataMap = [...records];
    const filteredData = dataMap.filter((item) => item.task_name !== "");
    console.log('RECORDS: ', records, filteredData)
    setRecords([...filteredData]);
};