import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";
const Chart = ({ data }) => {
  const maxTemp = Math.max.apply(
    Math,
    data.map(function (element) {
      return element.temp;
    })
  );
  return (
    <div className="chart-container">
      <ResponsiveContainer width="80%" height={400}>
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" style={{ fill: "#fff" }} />
          <YAxis
            type="number"
            domain={["auto", maxTemp + 2]}
            style={{ fill: "#fff" }}
          />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="temp"
            strokeWidth="4"
            stroke="rgb(255, 153, 85)"
            fill="rgb(255, 153, 85,0.431)"
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
