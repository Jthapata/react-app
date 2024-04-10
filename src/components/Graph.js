import { useEffect } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip
  } from "recharts";
  
export default function Graph( props ) {
    return (
        <LineChart width={600} height={300} data={props.data} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="priceUsd" stroke="#EF4444" activeDot={{ r: 8 }} />
        </LineChart>
    );
}
