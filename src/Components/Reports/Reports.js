import React, { Component } from "react";
import { Button, Table } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import "../VacDrive/VacDriveTable.css";
import exportFromJSON from "export-from-json";
import jsPDF from "jspdf";

const columns = [
  {
    title: "Student ID",
    dataIndex: "sid",
    width: "10%",
    onFilter: (value, record) => record.name.indexOf(value) === 0,
    sorter: (a, b) => a.sid.localeCompare(b.sid),
  },
  {
    title: "Firstname",
    dataIndex: "sfname",
    width: "10%",
    sorter: (a, b) => a.sfname.localeCompare(b.sfname),
  },
  {
    title: "Lastname",
    dataIndex: "slname",
    width: "10%",
    sorter: (a, b) => a.slname.localeCompare(b.slname),
  },

  {
    title: "Mobile No",
    dataIndex: "mobile",
    width: "10%",
    sorter: (a, b) => a.mobile - b.mobile,
  },
  {
    title: "Vaccination Status",
    width: "10%",
    filters: [
      { text: "NONE", value: "None" },
      { text: "PARTIAL", value: "PARTIAL" },
      { text: "FULL", value: "FULL" },
    ],
    render: (data) => (
      <div>
        <p> {findVaccineStatus(data)} </p>
      </div>
    ),
    onFilter: (value, data) => findVaccineStatus(data).indexOf(value) === 0,
    sorter: (a, b) => findVaccineStatus(a).localeCompare(findVaccineStatus(b)),
  },
  {
    title: "Vaccine Name",
    width: "20%",
    filters: [
      { text: "Covaxin", value: "Covaxin" },
      { text: "Covishield", value: "Covishield" },
    ],
    render: (data) => (
      <div>
        <p>{getVacName(data)}</p>
      </div>
    ),
    onFilter: (value, data) => getVacName(data).indexOf(value) === 0,
    sorter: (a, b) => getVacName(a).localeCompare(getVacName(b)),
  },
  {
    title: "Dose1 Date",
    width: "15%",
    render: (data) => (
      <div>
        <p>{getDose1Date(data)}</p>
      </div>
    ),
    sorter: (a, b) => getDose1Date(a).localeCompare(getDose1Date(b)),
  },
  {
    title: "Dose2 Date",
    width: "15%",
    render: (data) => (
      <div>
        <p>{getDose2Date(data)}</p>
      </div>
    ),
    sorter: (a, b) => getDose2Date(a).localeCompare(getDose2Date(b)),
  },
];

function findVaccineStatus(data) {
  if (data.vac_details.length === 0) {
    return "None";
  } else if (data.vac_details[0].vacDateD2 == null) {
    return "PARTIAL";
  } else {
    return "FULL";
  }
}

function getVacName(data) {
  if (data.vac_details.length > 0) {
    return data.vac_details[0].vacName === 1 ? "Covaxin" : "Covishield";
  } else {
    return "";
  }
}

function getDose1Date(data) {
  if (data.vac_details.length > 0) {
    console.log(JSON.stringify(data.vac_details));
    console.log(data.vac_details[0].vacDateD1);
    return data.vac_details[0].vacDateD1;
  } else {
    return "";
  }
}

function getDose2Date(data) {
  if (data.vac_details.length > 0) {
    console.log(JSON.stringify(data.vac_details));
    console.log(data.vac_details[0].vacDateD2);
    if (data.vac_details[0].vacDateD2 !== null) {
      return data.vac_details[0].vacDateD2;
    }
  }
  return "";
}

class Reports extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],

      pagination: {
        pageSize: 5,
      },

      exportFileType: "XLS",
    };
  }

  componentDidMount() {
    //   const { pagination } = this.state;
    //   this.fetch({ pagination });

    //fetch("http://vmssb-vac-service:5001/vacreport/")
    fetch("/vacreport/")
      .then((res) => {
        if (res.ok) {
          res.text().then((text) => {
            console.log("SUCCESS");
            console.log(text);
            this.setState({ data: JSON.parse(text) });
            console.log(this.state.data);
          });
        } else {
          console.log("NOT SUCCESSFUL - ");
          alert("Request failed");
        }
      })
      .catch((error) => {
        console.log("ERROR");
        alert("Error processing request");
      });
  }

  handleDownload = () => {
    let fileType;
    let outputData = this.state.data;
    let fileName = "VLSS Report";

    if (this.state.exportFileType === "XLS") {
      fileType =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";

      exportFromJSON({
        data: outputData,
        fileName: fileName,
        exportType: "xls",
      });
    } else if (this.state.exportFileType === "CSV") {
      fileType = "text/csv;charset=UTF-8";
      exportFromJSON({
        data: outputData,
        fileName: fileName,
        exportType: "csv",
      });
    } else if (this.state.exportFileType === "PDF") {
      fileType = "application/pdf;charset=UTF-8";

      var doc = new jsPDF("l", "px", "a4");

      doc.text(
        20,
        20,
        "Student ID | Firstname | Lastname | Mobile | Vaccination Status | Vaccine Name | Dose1 Date | Dose2 Date"
      );

      doc.text(
        20,
        40,
        "========================================================================================================"
      );

      outputData.forEach(function (row, i) {
        doc.text(
          20,
          60 + i * 20,
          row.sid +
            " | " +
            row.sfname +
            " | " +
            row.slname +
            " | " +
            row.mobile +
            " | " +
            findVaccineStatus(row) +
            " | " +
            getVacName(row) +
            " | " +
            getDose1Date(row) +
            " | " +
            getDose2Date(row)
        );
      });

      doc.save(fileName);
    }

    console.log("exportFileType = " + this.state.exportFileType);
    console.log("filetype = " + fileType);
    console.log("DATA = " + this.state.data.toString());
  };

  render() {
    const { data, pagination } = this.state;

    return (
      <div>
        <h2 align="left">Vaccination Report</h2>
        <Table columns={columns} dataSource={data} pagination={pagination} />

        <div className="export">
          Export Data to File: &nbsp;
          <input
            type="radio"
            id="excel"
            name="export"
            value="XLS"
            defaultChecked
            onClick={() => this.setState({ exportFileType: "XLS" })}
          />
          Excel  {" "}
          <input
            type="radio"
            id="csv"
            name="export"
            value="CSV"
            onClick={() => this.setState({ exportFileType: "CSV" })}
          />{" "}
          CSV  {" "}
          <input
            type="radio"
            id="pdf"
            name="export"
            value="PDF"
            onClick={() => this.setState({ exportFileType: "PDF" })}
          />{" "}
          PDF &nbsp;
          <Button
            type="primary"
            icon={<DownloadOutlined />}
            size={"medium"}
            onClick={this.handleDownload}
          >
            Download
          </Button>
        </div>
      </div>
    );
  }
}

export default Reports;
