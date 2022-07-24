import React, { Component } from "react";
import Chart from "react-apexcharts";
import "./Dashboard.css";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      upcomingDrives: [],

      series: [
        {
          name: "Vaccination Status",
          data: [5, 5, 5, 5], // Total students, Registred, Fully Vaccinated, Partially Vaccinated
        },
      ],

      options: {
        chart: {
          id: "basic-bar",
        },
        xaxis: {
          categories: [
            "Total Students",
            "Registered Students",
            "Partially Vaccinated",
            "Fully Vaccinated",
          ],
        },
      },
    };
  }

  componentDidMount() {
    //fetch("http://vmssb-stu-service:4001/dashreport/")
    fetch("/dashreport/")
      .then((res) => {
        if (res.ok) {
          res.text().then((text) => {
            console.log("SUCCESS");
            console.log(text);

            let obj = JSON.parse(text);
            console.log(obj.totalStu);
            console.log(obj.regStu);
            console.log(obj.partial);
            console.log(obj.full);

            const newData = [obj.totalStu, obj.regStu, obj.partial, obj.full];
            const newSeries = [];
            newSeries.push({ data: newData });
            this.setState({ series: newSeries });

            console.log(this.state);
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

    // FETCH UPCOMING DRIVES INFO
    //fetch("http://vmssb-vac-service:5001/drives/?open=true")
    fetch("/drives/?open=true")
      .then((res) => {
        if (res.ok) {
          res.text().then((text) => {
            console.log("SUCCESS");
            console.log(text);

            let obj = JSON.parse(text);
            const data = [];

            obj.forEach((item) => {
              data.push(item.date);
            });

            this.setState({ upcomingDrives: data });
            console.log(this.state.upcomingDrives);
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

  render() {
    return (
      <div className="dashboard">
        <div id="chart">
          <h2 align="left">Vaccination Status</h2>
          <Chart
            options={this.state.options}
            series={this.state.series}
            type="bar"
            width="600"
          />
        </div>

        <div id="scheduledDrives">
          <h2 align="left">Upcoming Vaccination Drives</h2>
          <ul className="scheduledDrivesList">
            {this.state.upcomingDrives.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default Dashboard;
