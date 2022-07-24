import * as React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./Components/Home/Dashboard";
import Reports from "./Components/Reports/Reports";
import LayoutPage from "./Components/Home/LayoutPage";
import VacDrive from "./Components/VacDrive/VacDrive";
import VacStatus from "./Components/VacStatus/VacStatus";
import StudentForm from "./Components/StudentReg/StudentForm";
import Logout from "./Components/Home/Logout";

function App() {
  return (
    <div className="App">
      <LayoutPage>
        <Routes>
          <Route path="/" exact element={<Dashboard />} />
          <Route path="/Student" exact element={<StudentForm />} />
          <Route path="/Reports" exact element={<Reports />} />
          <Route path="/VacDrive" exact element={<VacDrive />} />
          <Route path="/VacStatus" exact element={<VacStatus />} />
          <Route path="/Logout" exact element={<Logout />} />
        </Routes>
      </LayoutPage>
    </div>
  );
}

export default App;
