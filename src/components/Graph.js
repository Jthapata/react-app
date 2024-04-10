import { useEffect } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip
  } from "recharts";
  
export default function Graph( props ) {
    let coinPrices = []
    props.data.forEach(element => {
        coinPrices.push(Number(element.priceUsd))
    });
    let max = -Infinity
    let min = Infinity
    for(let price of coinPrices) {
        if (price > max) {
            max = price
        }
        if (price < min) {
            min = price
        }
    }
    const graphMax = Number(Math.round((max + ((max-min)/3)) * 100000000) / 100000000).toString().slice(0, 10)
    const graphMin = Number(Math.round((min - ((max-min)/3)) * 100000000) / 100000000).toString().slice(0, 10)
    console.log(graphMax, graphMin)
    return (
        <LineChart width={800} height={300} data={props.data} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
            <XAxis dataKey="time" stroke="white" />
            <YAxis stroke="white" domain={[graphMin, graphMax]} ticks={[graphMin, min, max, graphMax]} type="number" unit='$' width={100}/>
            <Tooltip />
            <Line type="monotone" dataKey="priceUsd" stroke="#EF4444" activeDot={{ r: 8 }} />
        </LineChart>
    );
}
