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
  TableCell: {
    color: 'red',
  }
});

export default function BasicTable({ header, rows }) {
//   const history = useHistory();
  const classes = useStyles();
  // const onRowClick = (row) => {
  //   history.push({ pathname: "/patients/patient", state: row });
  // };

  return (
  <>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table"></Table>
      {/* TODO: Recent alerts no. since last time opened} */}
      <TableBody>
        {rows.map((row, key) => {
          return (
            <TableRow
              key={key}
              // onClick={onClick ? () => onRowClick(row) : null}
              hover={true}
            >
              {header.map((column) => (
                <TableCell key={column.field} align="center">
                  {row[column.field]}
                </TableCell>
              ))}
            </TableRow>
          );
        })}
      </TableBody>
    </TableContainer>
  </>
  );
};