import React, { useEffect, useState } from "react";
import Table from "../../Table";
import dummyData from "../../../dummyData/dummyPatientData";
import { firestore } from "../../../firebase";
import { useAuth } from "../../../contexts/AuthContext";

const PatientLister = () => {
  const header = [
    { field: "givenName", title: "Given Name" },
    { field: "familyName", title: "Family Name" },
    { field: "dateOfBirth", title: "Date of Birth" },
  ];

  const [tableData, setTableData] = useState([]);
  // console.log("write");
  // console.log(dummyData.length);
  // for (let i = 0; i < dummyData.length; i++) {
  //   firestore
  //     .collection("patients")
  //     .add(dummyData[i])
  //     .then((docRef) => {
  //       console.log("Document written with ID: ", docRef.id);
  //     })
  //     .catch((error) => {
  //       console.error("Error adding document: ", error);
  //     });
  // }
  const { currentUser } = useAuth();

  useEffect(() => {
    const tempData = [];
    firestore
      .collection(`/doctors/${currentUser.uid}/linkedPatients`)
      .get()
      .then((querySnapshot) => {
          console.log(querySnapshot)
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          //console.log(doc.id, " => ", doc.data());
          let currentPatient = {...doc.data(), id:doc.id}
          currentPatient.dateOfBirth = currentPatient.dateOfBirth.toDate().toISOString().substring(0, 10)
          tempData.push(currentPatient);
          console.log(currentPatient)
        //   console.log(doc.id, " => ", doc.data())
        });
        setTableData(tempData);
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
