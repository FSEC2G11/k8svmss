import React, { useEffect } from "react";
import { Button, Row, Table } from "antd";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import "./VacDriveTable.css";

function VacDriveTable({ onEditDriveRow, onDeleteDrive, vacDrivesData }) {
  const columns = [
    {
      title: "Date (YYYY-MM-DD)",
      dataIndex: "date",
      width: "20%",
      sorter: (a, b) => a.date.localeCompare(b.date),
    },

    {
      title: "Covaxin Doses Required",
      width: "20%",
      render: (data) => <div> {data.numDosesC} </div>,
    },
    {
      title: "Covishield Doses Required",
      width: "20%",
      render: (data) => <div>{data.numDosesCS}</div>,
    },

    {
      title: "Status",
      width: "20%",
      filters: [
        { text: "COMPLETED", value: "COMPLETED" },
        { text: "PENDING", value: "PENDING" },
        { text: "APPROVED", value: "APPROVED" },
      ],
      onFilter: (value, data) =>
        getStatusString(data.status).indexOf(value) === 0,
      sorter: (a, b) =>
        getStatusString(a.status).localeCompare(getStatusString(b.status)),
      render: (data) => <div>{getStatusString(data.status)}</div>,
    },
    {
      title: "Actions",
      key: "Actions",
      width: "20%",
      render: (data) => (
        <div>
          <Row style={{ columnGap: "20px" }}>
            <Button
              disabled={
                getStatusString(data.status) === "COMPLETED" ||
                getStatusString(data.status) === "APPROVED"
              }
              onClick={() => onEditDriveRow(data)}
            >
              <EditTwoTone />
            </Button>
            <Button
              disabled={
                getStatusString(data.status) === "COMPLETED" ||
                getStatusString(data.status) === "APPROVED"
              }
              onClick={() => onDeleteDrive(data.date)}
            >
              <DeleteTwoTone />
            </Button>
          </Row>
        </div>
      ),
    },
  ];

  function getStatusString(vacstatus) {
    switch (vacstatus) {
      case 1:
        return "APPROVED";
      case 2:
        return "COMPLETED";
      default:
        return "PENDING";
    }
  }

  useEffect(() => {}, [vacDrivesData]);

  return (
    <div>
      <Table
        columns={columns}
        dataSource={vacDrivesData}
        pagination={{ pageSize: 4 }}
      />
    </div>
  );
}

export default VacDriveTable;
