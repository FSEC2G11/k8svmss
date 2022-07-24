import React from "react";
import { Modal, Button, Row } from "antd";

class AddVacDrive extends React.Component {
  constructor(props) {
    super(props);

    this.initialValues = {
      date: "",
      numDosesC: 0,
      numDosesCS: 0,
      status: 0,
    };

    this.state = {
      driveData: this.initialValues,
      visible: false,
    };

    this.editMode = false;
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  setEditData = (eData) => {
    this.editMode = true;
    console.log(eData);
    this.setState({ driveData: eData });
    console.log(this.state);
  };

  handleChangeEvent = (event) => {
    let { name, value } = event.target;
    this.setState({ driveData: { ...this.state.driveData, [name]: value } });
    console.log("handlechangeevent");
    console.log(this.state);
  };

  handleOK = () => {
    if (this.state.date === "") {
      alert("Date is required !");
      return;
    }

    if (this.editMode) {
      this.props.onEditDrive(this.state.driveData);
      this.editMode = false;
    } else {
      this.props.onAddDrive(this.state.driveData);
      this.setState({ driveData: this.initialValues });
      console.log("onAddDrive");
      console.log(this.state);
    }

    this.setState({ visible: false });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  render() {
    return (
      <>
        <Row style={{ alignItems: "center", margin: "30px 0px" }}>
          <div style={{ marginRight: "10px" }}>New Vaccination Drive:</div>
          <Button type="primary" onClick={this.showModal}>
            Request
          </Button>
        </Row>

        <Modal
          visible={this.state.visible}
          id="vdrive_modal"
          title="Vaccination Drive Request"
          footer={[
            <Button key="submit" type="primary" onClick={this.handleOK}>
              Submit
            </Button>,
            <Button type="primary" onClick={this.handleCancel}>
              Cancel
            </Button>,
          ]}
        >
          <form className="addDriveForm">
            <div>
              <Row style={{ marginBottom: "20px" }}>
                <Row>
                  <div>Date:</div>
                  <div style={{ marginLeft: "10px", marginRight: "20px" }}>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={this.state.driveData.date}
                      onChange={this.handleChangeEvent}
                    />
                  </div>
                </Row>
              </Row>

              <div style={{ marginBottom: "20px", fontWeight: "bold" }}>
                Doses Required:
              </div>
              <Row>
                <div>Covaxin:</div>
                <div style={{ marginLeft: "10px", marginRight: "20px" }}>
                  <input
                    style={{ width: "80px" }}
                    type="number"
                    id="numDosesC"
                    min="0"
                    max="1000"
                    name="numDosesC"
                    value={this.state.driveData.numDosesC}
                    onChange={this.handleChangeEvent}
                  />
                </div>
                <div>Covishield:</div>
                <div style={{ marginLeft: "10px" }}>
                  <input
                    style={{ width: "80px" }}
                    type="number"
                    id="numDosesCS"
                    min="0"
                    max="1000"
                    name="numDosesCS"
                    value={this.state.driveData.numDosesCS}
                    onChange={this.handleChangeEvent}
                  />
                </div>
              </Row>
            </div>
          </form>
        </Modal>
      </>
    );
  }
}
export default AddVacDrive;
