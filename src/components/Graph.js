import * as React from 'react';
import { LineChart} from '@mui/x-charts';

export default function Graph(props) {
    console.log(props.id)
    return (
        <LineChart
            width={500}
            height={300}
            xAxis={{ dataKey: 'time', title: 'Time' }} // Define x-axis with label
            yAxis={{ dataKey: 'priceUsd', title: 'Price' }} // Add y-axis label (replace with your desired label)
            dataset={[...props.id]}
        />
    );
}

{/* <LineChart width={800} height={300} data={props.data} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
            <XAxis dataKey="time" stroke="white" />
            <YAxis stroke="white" domain={['auto', 'auto']} width={100}/>
            <Tooltip />
            <Line type="monotone" dataKey="priceUsd" stroke="#EF4444" activeDot={{ r: 8 }} />
        </LineChart> */}