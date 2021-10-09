import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
// import dummyData from "../dummyData/dummyAlertData";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function BasicTable({ header, rows }) {
//   const history = useHistory();
  const classes = useStyles();
  // const onRowClick = (row) => {
  //   history.push({ pathname: "/patients/patient", state: row });
  // };

  const alertHeader = [
    { field: "alertType", title: "Alert Type" },
    { field: "date", title: "Alert Date " },
  ];
  const alertData = [
    { alertType: "High Heart Rate", date: "01-04-2021" },
    { alertType: "Unusual ECG Pattern", date: "05-04-2021" },
  ];

  return (
    // <h1>Alerts</h1>

    // <Table header={alertHeader}>
    //   <tr>
    //     <th>Company</th>
    //     <th>Contact</th>
    //     <th>Country</th>
    //   </tr>
    //   <tr>
    //     <td>Alfreds Futterkiste</td>
    //     <td>Maria Anders</td>
    //     <td>Germany</td>
    //   </tr>
    //   <tr>
    //     <td>Centro comercial Moctezuma</td>
    //     <td>Francisco Chang</td>
    //     <td>Mexico</td>
    //   </tr>
    // </Table>


    <>
      <p>E</p>
      <Table header={alertHeader} rows={alertData}/>
      <p>E</p>
    </>

    // <TableContainer component={Paper}>
    //   <Table className={classes.table} aria-label="simple table">
    //     <TableHead>
    //       {/* <TableRow>2 new alerts since 13 Aug 2021</TableRow> */}

    //       <TableRow>
    //         {header.map((column) => (
    //           <TableCell key={column.field} align="center" variant="head">
    //             <Typography style={{ fontWeight: 600 }}>
    //               {column.title}
    //             </Typography>
    //           </TableCell>
    //         ))}
    //       </TableRow>
    //     </TableHead>

    //     {/* <TableBody>
    //       {rows.map((row, key) => {
    //         return (
    //           <TableRow
    //             key={key}
    //             hover={true}
    //           >
    //             {header.map((column) => (
    //               <TableCell key={column.field} align="center">
    //                 {row[column.field]}
    //               </TableCell>
    //             ))}
    //           </TableRow>
    //         );
    //       })}
    //     </TableBody> */}
    //   </Table>
    // </TableContainer>
  );
};