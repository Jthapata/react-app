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
        <div>
        <LineChart
            series = {[{ data: [...priceUsd], color: '#000000'}]}
            xAxis={[{ data: [...times], scaleType: 'point'}]}
            width={600}
            height={400}
        />
        </div>
    );
}