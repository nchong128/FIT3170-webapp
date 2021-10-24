import React, { useEffect, useState } from "react";
import Table from "../../Table";
import { firestore } from "../../../firebase";
import { useAuth } from "../../../contexts/AuthContext";

const PatientLister = () => {
  const header = [
    { field: "givenName", title: "Given Name" },
    { field: "familyName", title: "Family Name" },
    { field: "dateOfBirth", title: "Date of Birth" },
  ];

  const [tableData, setTableData] = useState([]);

  const { currentUser } = useAuth();

  useEffect(() => {
    const patientList = [];
    firestore
      .collection(`/doctors/${currentUser.uid}/linkedPatients`)
      .get()
      .then((querySnapshot) => {
          console.log(querySnapshot)
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          // set the fields for the current patient
          let currentPatient = {...doc.data(), id:doc.id}
          // convert timestamp to formatted ISO String
          currentPatient.dateOfBirth = currentPatient.dateOfBirth.toDate().toISOString().substring(0, 10)
          // add patient to list
          patientList.push(currentPatient);
        });
        setTableData(patientList);
      });

  }, []);

  return (
    <>
      <h1>My Patients</h1>
      <Table header={header} rows={tableData} onClick={true} />
    </>
  );
};

export default PatientLister;
