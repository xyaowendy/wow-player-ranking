import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Record = (props) =>
    (
    <tr>
        <td>{props.order}</td>
        <td>{props.record.ID}</td>
        <td>{props.record.specialization}</td>
        <td>{props.record.TazaveshStreetsOfWonder}</td>
        <td>{props.record.TazaveshSoLeahGambit}</td>
        <td>{props.record.GrimrailDepot}</td>
        <td>{props.record.IronDocks}</td>
        <td>{props.record.MechagonJunkyard}</td>
        <td>{props.record.MechagonWorkshop}</td>
        <td>{props.record.KarazhanUpper}</td>
        <td>{props.record.KarazhanLower}</td>
        <td>{props.record.total}</td>
    </tr>
);

export default function RecordList() {
    const [records, setRecords] = useState([]);

    // This method fetches the records from the database.
    useEffect(() => {
        async function getRecords() {
            const response = await fetch(`http://localhost:3001/record/`);

            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const records = await response.json();
            setRecords(records);
        }

        getRecords();

        return;
    }, [records.length]);

    // This method will map out the records on the table
    function recordList() {
        return records.map((record, i) => {
            return (
                <Record
                    order = {i+1}
                    record={record}
                    key={record._id}
                />
            );
        });
    }

    // This following section will display the table with the records of individuals.
    return (
        <div>
            <table className="table table-striped" style={{ marginTop: 20 }}>
                <thead>
                <tr>
                    <th>No.</th>
                    <th>ID</th>
                    <th>职业</th>
                    <th>塔扎维什：琳彩天街</th>
                    <th>塔扎维什：索·莉亚的宏图</th>
                    <th>恐轨车站</th>
                    <th>钢铁码头</th>
                    <th>麦卡贡行动 - 垃圾场</th>
                    <th>麦卡贡行动 - 车间</th>
                    <th>重返卡拉赞（上层)</th>
                    <th>重返卡拉赞（下层)</th>
                    <th>总分</th>
                </tr>
                </thead>
                <tbody>{recordList()}</tbody>
            </table>
        </div>
    );
}