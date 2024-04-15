import * as React from 'react';
import { LineChart} from '@mui/x-charts';

export default function Graph(props) {
    let priceUsd = []
    let times = []
    for (let item of props.data) {
        priceUsd.push(item.priceUsd)
        times.push(item.time)
    }
    return (
        <LineChart
            series = {[{ data: [...priceUsd] }]}
            xAxis={[{ data: [...times], scaleType: 'point'}]}
            width={600}
            height={300}
        />
    );
}

{/* <LineChart width={800} height={300} data={props.data} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
            <XAxis dataKey="time" stroke="white" />
            <YAxis stroke="white" domain={['auto', 'auto']} width={100}/>
            <Tooltip />
            <Line type="monotone" dataKey="priceUsd" stroke="#EF4444" activeDot={{ r: 8 }} />
        </LineChart> */}