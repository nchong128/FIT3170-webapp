import React, { useEffect, useState } from "react";
import Table from "../../Table";
import dummyData from "../../../dummyData/dummyPatientData";
import { firestore } from "../../../firebase";

const PatientLister = () => {
  const header = [
    { field: "givenName", title: "Given Name" },
    { field: "surname", title: "Surname" },
    { field: "age", title: "Age" },
    { field: "gender", title: "Gender" },
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
  useEffect(() => {
    const tempData = [];
    firestore
      .collection("patients")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          //console.log(doc.id, " => ", doc.data());
          tempData.push(doc.data());
        });
      });
    setTableData(tempData);
  }, []);

  return (
    <>
      <h1>My Patients</h1>
      <Table header={header} rows={tableData} onClick={true} />
    </>
  );
};

export default PatientLister;
