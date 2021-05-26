import React from "react";
import Table from "../../Table";
import dummyData from "../../../dummyData/dummyPatientData";

const PatientLister = () => {
  const header = [
    { field: "givenName", title: "Given Name" },
    { field: "surname", title: "Surname" },
    { field: "age", title: "Age" },
    { field: "gender", title: "Gender" },
  ];

  return (
    <>
      <h1>My Patients</h1>
      <Table header={header} rows={dummyData} onClick={true} />
    </>
  );
};

export default PatientLister;
