import { ResponsiveLine } from "@nivo/line";
import { Typography } from "@material-ui/core";
import {useEffect, useState} from "react";
import {firestore} from "../../../firebase";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CircularProgress from '@mui/material/CircularProgress';
import { LocalConvenienceStoreOutlined } from "@material-ui/icons";
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

const ECGLineGraph = ({ title, patientData }) => {
  // Storing the date
  const [readings, setReadings ] = useState([]);
  const [readingIndex, setReadingIndex] = useState(-1);

  // useEffect hook -> Firebase query given the date for the patient
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => {
      let start = new Date("2021-10-9");
      let end = new Date("2021-10-10");
      let tempReadings = [];

      // Retrieve readings for the date given
      const readingsSnapshot = await firestore
        .collection("patients")
        .doc(patientData.id)
        .collection("ecgReadings")
        .get();

        readingsSnapshot.forEach(rd => {
          // Retrieve data packet consisting of metadata and readings
          const dataPacket = rd.data();
          if (dataPacket.startTime.toDate() > start && dataPacket.startTime.toDate() < end) {
            const convertedReadings = dataPacket.data.map(obj => {
              return ({
                  x: new Date(obj.time),
                  y: obj.value,
                  key: new Date(obj.time)
              })
            });
            const reformedDataPacket = {
              startTime: dataPacket.startTime.toDate(), 
              data: convertedReadings,
              patientId: dataPacket.patientId
            };
            tempReadings.push(reformedDataPacket);
          }
        });
        // Sort results by startDate
        tempReadings.sort(function(a,b) {
          console.log(a,b);
          return a.startTime - b.startTime;
        })
        
        setReadings(tempReadings);
    }, []);

    const combineReadings = () => {
      let convertedReadings = [];
  
      console.log("readings", readings);
      if (readingIndex !== -1) {
        convertedReadings = convertedReadings.concat(readings[readingIndex].data);
      } else {
        readings.forEach(minuteReadings => {
          convertedReadings = convertedReadings.concat(minuteReadings.data);
        });
      }

      return [{ color: "hsl(29, 70%, 50%)", data: convertedReadings }];
    }   



  return (
    readings.length > 0 ? (
    <>
      <Typography variant="h5" style={{ marginTop: 10 }}>
        {title}
      </Typography>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Data Packet</InputLabel>
        <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={readingIndex}
        label="Data Packet"
        onChange={(e) => {setReadingIndex(e.target.value)}}
        >
          {
            readings.map((reading, index) => {
              return (<MenuItem value={index} key={index}>Start Date {reading.startTime.toString()}</MenuItem>)
            })
          }
        </Select>
      </FormControl>
      <ResponsiveLine
      data={combineReadings()}
      margin={{ top: 20, right: 50, bottom: 50, left: 60 }}
      xScale={{
        type: "time",
        precision: "millisecond"
      }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      yFormat=" >-.2f"
      axisTop={null}
      axisRight={null}
      axisBottom={null}
      axisLeft={{
        orient: "left",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: title,
        legendOffset: -50,
        legendPosition: "middle",
      }}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[]}
      />
    </>
    ) : (<CircularProgress />)
  );
};

export default ECGLineGraph;
