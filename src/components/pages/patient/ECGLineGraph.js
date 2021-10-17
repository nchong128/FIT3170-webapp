import { ResponsiveLine } from "@nivo/line";
import { Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { firestore } from "../../../firebase";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import CircularProgress from "@mui/material/CircularProgress";
import moment from "moment";

const ECGLineGraph = ({ title, patientData }) => {
  // Storing the date
  const [readings, setReadings] = useState([]);
  const [readingIndex, setReadingIndex] = useState(0);
  const [dateOfReadings, setDateOfReadings] = useState();

  // useEffect hook -> Firebase query given the date for the patient
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    let start = new Date("2021-10-9");
    let end = new Date();
    let tempReadings = [];

    // Retrieve readings for the date given
    const readingsSnapshot = await firestore
      .collection("patients")
      .doc(patientData.id)
      .collection("ecgReadings")
      .orderBy("startTime", "desc")
      .get();

    readingsSnapshot.forEach((rd) => {
      // Retrieve data packet consisting of metadata and readings
      const dataPacket = rd.data();
      if (
        dataPacket.startTime.toDate() > start &&
        dataPacket.startTime.toDate() < end
      ) {
        const convertedReadings = dataPacket.data.map((obj) => {
          return {
            x: new Date(obj.time),
            y: obj.value,
            key: new Date(obj.time),
          };
        });
        const reformedDataPacket = {
          startTime: dataPacket.startTime.toDate(),
          data: convertedReadings,
          patientId: dataPacket.patientId,
        };
        tempReadings.push(reformedDataPacket);
      }
    });
    // Sort results by startDate
    // tempReadings.sort(function (a, b) {
    //   return a.startTime - b.startTime;
    // });

    setReadings(tempReadings);
  }, []);

  const combineReadings = () => {
    let convertedReadings = [];

    if (readingIndex !== -1) {
      convertedReadings = convertedReadings.concat(readings[readingIndex].data);
    } else {
      readings.forEach((minuteReadings) => {
        convertedReadings = convertedReadings.concat(minuteReadings.data);
      });
    }

    const currentReadings = [
      { color: "hsl(29, 70%, 50%)", data: convertedReadings },
    ];
    return currentReadings;
  };

  const formatDate = (date) => {
    return moment(date).format("HH:mm:ss:SSS");
  };

  const getXAxes = () => {
    let xAxes = [];

    if (readingIndex !== -1) {
      console.log("Readings", readings[readingIndex].data);
      xAxes = xAxes.concat(
        readings[readingIndex].data.map((r) => formatDate(r.x))
      );
    } else {
      readings.forEach((minuteReadings) => {
        xAxes = xAxes.concat(minuteReadings.data.map((r) => formatDate(r.x)));
      });
    }

    return xAxes;
  };

  return readings.length > 0 ? (
    <>
      <Typography variant="h5" style={{ marginTop: 10 }}>
        {title}
      </Typography>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Data Packet</InputLabel>
        <Select
          labelId="demo-simple-se lect-label"
          id="demo-simple-select"
          value={readingIndex}
          label="Data Packet"
          onChange={(e) => {
            setReadingIndex(e.target.value);
          }}
        >
          {/* <MenuItem value={-1} key={-1}>
            ALL READINGS
          </MenuItem> */}
          {readings.map((reading, index) => {
            return (
              <MenuItem value={index} key={index}>
                {reading.startTime.toString()}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <ResponsiveLine
        data={combineReadings()}
        margin={{ top: 20, right: 50, bottom: 50, left: 60 }}
        xScale={{
          type: "time",
          precision: "millisecond",
        }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: true,
          reverse: false,
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={null}
        yFormat=" >-.2f"
        axisBottom={{
          orient: "bottom",
          tickValues: 10,
          legend: "Timestamp",
          format: "%H:%M:%S",
        }}
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
  ) : (
    <CircularProgress />
  );
};

export default ECGLineGraph;
