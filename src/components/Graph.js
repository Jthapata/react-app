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
            sx={{
                "& .MuiChartsAxis-left .MuiChartsAxis-tickLabel":{
                    strokeWidth:1,
                    fill:"#a222dd"
                },
                "& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel":{
                    strokeWidth:1,
                    fill:"#a222dd"
                },
                "& .MuiChartsAxis-bottom .MuiChartsAxis-line":{
                    stroke:"#a222dd",
                    strokeWidth:1
                },
                "& .MuiChartsAxis-left .MuiChartsAxis-line":{
                    stroke:"#a222dd",
                    strokeWidth:1
                }
            }}
            series = {[{ data: [...priceUsd], color: '#a222dd'}]}
            xAxis={[{ data: [...times], scaleType: 'point'}]}
            width={600}
            height={300}
            axisHighlight={{
                x: 'none',
            }}
        />
    );
}