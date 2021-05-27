import { ResponsiveLine } from "@nivo/line";
import dummyData from "../dummyData/dummyECGData";
import { Typography } from "@material-ui/core";
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

const MyResponsiveLine = ({ title, data }) => {
  const converted = data.map((val, key) => ({ x: key, y: val }));
  const formattedData = [{ color: "hsl(29, 70%, 50%)", data: converted }];
  return (
    <>
      <Typography variant="h5" style={{ marginTop: 10 }}>
        {title}
      </Typography>
      <ResponsiveLine
        data={formattedData}
        margin={{ top: 20, right: 50, bottom: 50, left: 60 }}
        xScale={{ type: "point" }}
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
        // axisBottom={{
        //   orient: "bottom",
        //   tickSize: 0,
        //   tickPadding: 5,
        //   tickRotation: 0,
        //   legendOffset: 36,
        //   legendPosition: "middle",
        //   format: () => null,
        // }}
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
        legends={
          [
            // {
            //   anchor: "bottom-right",
            //   direction: "column",
            //   justify: false,
            //   translateX: 100,
            //   translateY: 0,
            //   itemsSpacing: 0,
            //   itemDirection: "left-to-right",
            //   itemWidth: 80,
            //   itemHeight: 20,
            //   itemOpacity: 0.75,
            //   symbolSize: 12,
            //   symbolShape: "circle",
            //   symbolBorderColor: "rgba(0, 0, 0, .5)",
            //   effects: [
            //     {
            //       on: "hover",
            //       style: {
            //         itemBackground: "rgba(0, 0, 0, .03)",
            //         itemOpacity: 1,
            //       },
            //     },
            //   ],
            // },
          ]
        }
      />
    </>
  );
};

export default MyResponsiveLine;
