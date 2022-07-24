import React, { useState, useEffect } from "react";

import "./StudentForm.css";

function StudentForm() {
  const initialValues = {
    sid: "",
    sfname: "",
    slname: "",
    dob: "",
    gidtype: 1,
    gidno: "",
    mobile: "",
    email: "",
    vaccine: 1,
  };

  const [studentFormValues, setStudentFormValues] = useState(initialValues);
  const [studentFormErrors, setStudentFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [show, toggleShow] = React.useState(false);
  const [modify, setModify] = React.useState(false);

  const handleStudentFormSubmit = (event) => {
    event.preventDefault();
    setStudentFormErrors(validate(studentFormValues));
    setIsSubmit(true);
  };

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setStudentFormValues({ ...studentFormValues, [name]: value });
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.sid) {
      errors.sid = "Student ID is required!";
    }

    if (!values.sfname) {
      errors.sfname = "Firstname is required!";
    }

    if (!values.slname) {
      errors.slname = "Lastname is required!";
    }

    if (!values.dob) {
      errors.dob = "DOB is required!";
    }

    if (!values.gidno) {
      errors.gidno = "Govt ID No. is required!";
    }

    if (!values.mobile) {
      errors.mobile = "Mobile No. is required!";
    }

    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }

    return errors;
  };

  useEffect(() => {
    console.log(studentFormErrors);
    if (Object.keys(studentFormErrors).length === 0 && isSubmit) {
      console.log(studentFormValues);

      // save value to backend here
      //let URL = "http://vmssb-stu-service:4001/students/";
      let URL = "/students/";
      if (modify) {
        URL =
          //          "http://vmssb-stu-service:4001/student/" +
          "/student/" + studentFormValues.sid + "/";
      }

      fetch(URL, {
        method: modify ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(studentFormValues),
      })
        .then((res) => {
          if (res.ok) {
            console.log("SUCCESS");
            if (modify) {
              alert("Student updated successfully");
            } else {
              alert("Student registered successfully");
            }
            setStudentFormValues(initialValues);
          } else {
            res.text().then((text) => {
              let msg = JSON.parse(text).sid;
              console.log("NOT SUCCESSFUL - " + msg);
              alert(msg);
            });
          }
        })
        .catch((error) => {
          console.log("ERROR");
          alert("Error processing request");
        });
    }
  }, [studentFormErrors]);

  const fetchStudentDetails = () => {
    let sid = document.getElementById("sid").value;
    if (sid === "") {
      alert("Enter Student ID");
    } else {
      //let URL = "http://vmssb-stu-service:4001/student/" + sid + "/";
      let URL = "/student/" + sid + "/";
      fetch(URL)
        .then((res) => {
          if (res.ok) {
            res.text().then((text) => {
              console.log("SUCCESS");
              console.log(text);
              setStudentFormValues(JSON.parse(text));
            });
          } else {
            res.text().then((text) => {
              let msg = JSON.parse(text).detail;
              console.log("NOT SUCCESSFUL - " + msg);
              alert("Student " + msg);
            });
          }
        })
        .catch((error) => {
          console.log("ERROR");
          alert("Error processing request");
        });
    }
    return;
  };

  const resetForm = () => {
    setIsSubmit(false);
    setStudentFormValues(initialValues);
    setStudentFormErrors({});
  };

  return (
    <div className="container">
      <div className="selectPanel">
        <button
          className="button"
          onClick={() => {
            setModify(false);
            toggleShow(true);
          }}
        >
          New Registration
        </button>

        <button
          className="button"
          id="modbutton"
          onClick={() => {
            setModify(true);
            toggleShow(true);
          }}
        >
          Modify Registration
        </button>
      </div>

      {show && (
        <div className="formPanel">
          <form
            className="studentform"
            id="studentForm"
            onSubmit={handleStudentFormSubmit}
          >
            {modify && (
              <div className="note">
                <h2>Modify Student Registration</h2>
                Enter <span style={{ fontWeight: "bold" }}>
                  {" "}
                  Student ID{" "}
                </span>{" "}
                and click{" "}
                <span style={{ fontWeight: "bold" }}>
                  Fetch Student Details
                </span>{" "}
                button to get the student details for modification.
              </div>
            )}

            {!modify && (
              <div className="note">
                <h2>New Student Registration</h2>
              </div>
            )}

            <div className="formRow">
              <div className="formLabel">
                <label>Student ID:</label>
              </div>
              <div className="inputField">
                <input
                  type="text"
                  name="sid"
                  id="sid"
                  placeholder="Enter Student ID"
                  value={studentFormValues.sid}
                  onChange={handleFieldChange}
                ></input>
                <div className="error">
                  <p>{studentFormErrors.sid}</p>
                </div>
              </div>

              {modify && (
                <div>
                  <button
                    type="button"
                    className="fetchButton"
                    onClick={fetchStudentDetails}
                  >
                    Fetch Student Details
                  </button>
                </div>
              )}
            </div>

            <div className="formRow">
              <div className="formLabel">
                <label>Firstname:</label>
              </div>
              <div className="inputField">
                <input
                  type="text"
                  name="sfname"
                  placeholder="Enter Firstname"
                  value={studentFormValues.sfname}
                  onChange={handleFieldChange}
                ></input>

                <div className="error">
                  <p>{studentFormErrors.sfname}</p>
                </div>
              </div>

              <div className="formLabel">
                <label>Lastname:</label>
              </div>
              <div className="inputField">
                <input
                  type="text"
                  name="slname"
                  placeholder="Enter Lastname"
                  value={studentFormValues.slname}
                  onChange={handleFieldChange}
                ></input>

                <div className="error">
                  <p>{studentFormErrors.slname}</p>
                </div>
              </div>
            </div>

            <div className="formRow">
              <div className="formLabel">
                <label>Date of Birth:</label>
              </div>
              <div className="inputField">
                <input
                  type="date"
                  name="dob"
                  value={studentFormValues.dob}
                  onChange={handleFieldChange}
                ></input>
                <div className="error">
                  <p>{studentFormErrors.dob}</p>
                </div>
              </div>
            </div>

            <div className="formRow">
              <div className="formLabel">
                <label>Govt ID Type:</label>
              </div>

              <div className="inputField">
                <div className="radioGroup">
                  <input
                    type="radio"
                    name="gidtype"
                    onChange={handleFieldChange}
                    value="1"
                    id="aadhaar"
                    checked={studentFormValues.gidtype == 1}
                  ></input>
                  <label htmlFor="aadhaar"> Aadhaar </label>
                </div>
                <div className="radioGroup">
                  <input
                    type="radio"
                    name="gidtype"
                    onChange={handleFieldChange}
                    value="2"
                    id="passport"
                    checked={studentFormValues.gidtype == 2}
                  ></input>
                  <label htmlFor="passport"> Passport </label>
                </div>
                <div className="radioGroup">
                  <input
                    type="radio"
                    name="gidtype"
                    onChange={handleFieldChange}
                    value="3"
                    id="birthcert"
                    checked={studentFormValues.gidtype == 3}
                  ></input>
                  <label htmlFor="birthcert"> Birth Certificate </label>
                </div>
              </div>

              <div className="formLabel">
                <label>Govt ID No:</label>
              </div>
              <div className="inputField">
                <input
                  type="text"
                  name="gidno"
                  placeholder="Enter Govt ID No."
                  value={studentFormValues.gidno}
                  onChange={handleFieldChange}
                ></input>

                <div className="error">
                  <p>{studentFormErrors.gidno}</p>
                </div>
              </div>
            </div>

            <div className="formRow" style={{ marginTop: "10px" }}>
              <div className="formLabel">
                <label>Mobile No:</label>
              </div>
              <div className="inputField">
                <input
                  type="text"
                  name="mobile"
                  placeholder="Enter Mobile No"
                  value={studentFormValues.mobile}
                  onChange={handleFieldChange}
                ></input>

                <div className="error">
                  <p>{studentFormErrors.mobile}</p>
                </div>
              </div>

              <div className="formLabel">
                <label>EMail:</label>
              </div>
              <div className="inputField">
                <input
                  type="text"
                  name="email"
                  placeholder="Enter EMail"
                  value={studentFormValues.email}
                  onChange={handleFieldChange}
                ></input>

                <div className="error">
                  <p>{studentFormErrors.email}</p>
                </div>
              </div>
            </div>

            <div className="formRow">
              <div className="formLabel">
                <label>Vaccine:</label>
              </div>
              <div className="inputField">
                <input
                  type="radio"
                  name="vaccine"
                  onChange={handleFieldChange}
                  value="1"
                  id="covaxin"
                  checked={studentFormValues.vaccine == 1}
                ></input>
                <label htmlFor="covaxin">Covaxin</label>
                <input
                  type="radio"
                  name="vaccine"
                  onChange={handleFieldChange}
                  value="2"
                  id="covishied"
                  checked={studentFormValues.vaccine == 2}
                ></input>
                <label htmlFor="covishield">Covishield</label>
              </div>
            </div>

            <div className="formRow">
              <button type="submit" className="button">
                Submit
              </button>
              <button type="reset" className="button" onClick={resetForm}>
                Reset
              </button>
            </div>
          </form>

          {!modify && (
            <div className="bulkUploadPanel">
              <h3>Bulk Registration: </h3>
              <input name="bulkupload" type="file"></input>
              <button
                className="uploadButton"
                onClick={function (event) {
                  event.preventDefault();
                  alert("Feature coming soon !");
                }}
              >
                Upload
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default StudentForm;
