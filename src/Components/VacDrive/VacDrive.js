import React, { useState, useRef, useEffect } from "react";
import VacDriveTable from "./VacDriveTable";
import AddVacDrive from "./AddVacDrive";

function VacDrive() {
  const [vacData, setVacData] = useState();
  var driveData = "";
  const editDriveRef = useRef();

  function handleAddDrive(driveData) {
    console.log(vacData);
    console.log(driveData);

    // add to server
    //fetch("http://vmssb-vac-service:5001/drives/", {
    fetch("/drives/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(driveData),
    })
      .then((res) => {
        if (res.ok) {
          console.log("SUCCESS");
          alert("Drive added successfully");

          // add to local store if DB is updated successfully
          setVacData((prevVacData) => {
            return [...prevVacData, driveData];
          });
        } else {
          res.text().then((text) => {
            console.log("FAILED - " + text);
            alert("FAILED " + text);
          });
        }
      })
      .catch((error) => {
        console.log("ERROR");
        alert("Error processing request");
      });
  }

  function handleDeleteDrive(driveDate) {
    // delete from server
    //fetch("http://vmssb-vac-service:5001/drive/" + driveDate + "/", {
    fetch("/drive/" + driveDate + "/", {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          console.log("SUCCESS");
          alert("Drive deleted successfully");

          // delete from local state
          setVacData((prevVacData) => {
            return prevVacData.filter((item) => item.date !== driveDate);
          });
        } else {
          res.text().then((text) => {
            console.log("FAILED - " + text);
            alert("FAILED " + text);
          });
        }
      })
      .catch((error) => {
        console.log("ERROR");
        alert("Error processing request");
      });
  }

  function handleEditDrive(row) {
    //Edit data on the server
    //fetch("http://vmssb-vac-service:5001/drive/" + row.date + "/", {
    fetch("/drive/" + row.date + "/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(row),
    })
      .then((res) => {
        if (res.ok) {
          console.log("SUCCESS");
          alert("Drive modified successfully");

          // modify local state
          setVacData((prevVacData) => {
            let tempVacData = [...prevVacData];
            let modRec = tempVacData.find((rec) => rec.date === row.date);
            modRec.numDosesC = row.numDosesC;
            modRec.numDosesCS = row.numDosesCS;
            return [...tempVacData];
          });
        } else {
          res.text().then((text) => {
            console.log("FAILED - " + text);
            alert("FAILED " + text);
          });
        }
      })
      .catch((error) => {
        console.log("ERROR");
        alert("Error processing request");
      });
  }

  function handleEditRow(row) {
    editDriveRef.current.setEditData(row);
    editDriveRef.current.showModal();
  }

  useEffect(() => {
    console.log("page loaded");

    //fetch("http://vmssb-vac-service:5001/drives/")
    fetch("/drives/")
      .then((res) => {
        if (res.ok) {
          res.text().then((text) => {
            console.log("SUCCESS");
            console.log(text);
            setVacData(JSON.parse(text));
            console.log(vacData);
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
  }, []);

  return (
    <div>
      <h2 align="left">Manage Vaccination Drives</h2>
      <AddVacDrive
        key="1"
        ref={editDriveRef}
        onAddDrive={handleAddDrive}
        onEditDrive={handleEditDrive}
        editDriveData={driveData}
      />
      <VacDriveTable
        key="2"
        vacDrivesData={vacData}
        onEditDriveRow={handleEditRow}
        onDeleteDrive={handleDeleteDrive}
      />
    </div>
  );
}

export default VacDrive;
