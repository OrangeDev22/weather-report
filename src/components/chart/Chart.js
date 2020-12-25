import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";

const Chart = ({ data, screenWidth }) => {
  //Function that'll search the max number in the array for the chart
  // const maxTemp = Math.max.apply(
  //   Math,
  //   data.map(function (element) {
  //     return element.temp;
  //   })
  // );

  return (
    <div className="chart-container">
      <ResponsiveContainer
        width={"100%"}
        height={screenWidth < 600 ? 125 : 300}
      >
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 20,
            left: 20,
            bottom: 0,
          }}
          isAnimationActive={false}
        >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis dataKey="name" style={{ fill: "#fff" }} />
          {/* <YAxis
            type="number"
            domain={["auto", maxTemp + 2]}
            style={{ fill: "#fff" }}
          /> */}
          <Tooltip />
          <Area
            type="monotone"
            dataKey="temp"
            strokeWidth="4"
            stroke="rgb(255, 153, 85)"
            fill="rgb(255, 153, 85,0.431)"
            isAnimationActive={false}
          >
            <LabelList
              dataKey="label"
              position="top"
              style={{ fill: "#fff" }}
            ></LabelList>
          </Area>
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
