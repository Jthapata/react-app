'use client'
import { useEffect, useState } from "react";
import Graph from "./Graph";

function formatDate(timestamp) {
    const dateObj = new Date(timestamp)
    const hours = dateObj.getHours()
    const minutes = dateObj.getMinutes().toString().padStart(2, '0')
    const amPm = hours < 13 ? 'AM' : 'PM'
    return `${hours % 12 || 12}:${minutes} ${amPm}`
}

export default function CryptoList (props) {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [coin, setCoin] = useState(null)
    const [history, setHistory] = useState([])

    async function getCoinData() {
        try {
            const coinUrl = `https://api.coincap.io/v2/assets/${props.id}`;
            const requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };
            const response = await fetch(coinUrl, requestOptions);
            const data = await response.json();
            const coinData = data.data;
            setCoin(coinData);
        
            const historyUrl = `${coinUrl}/history?interval=m1`;
            const historyResponse = await fetch(historyUrl, requestOptions);
            const historyData = await historyResponse.json();
            const coinHistory = historyData.data.slice(-30);
            coinHistory.forEach(item => (item.time = formatDate(item.time)));
            setHistory(coinHistory);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError(error);
            setLoading(false);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            await getCoinData();
        };
        fetchData();
    }, [props.id]);
      

    if (loading) {
        return (
            <div className="flex-grow flex flex-col items-center bg-background text-text p-3">
                <h1>Loading...</h1>
            </div>
        )
    }
    if (error) {
        return (
            <div className="flex-grow flex flex-col items-center bg-background text-text p-3">
                <h1>Error Loading Data</h1>
            </div>
        )
    }
    return (
        <div className="flex-grow flex flex-col items-center bg-background text-text p-3">
            <div className="flex">
                <div className="m-3 h-52 flex flex-col justify-center border rounded-lg shadow-[0px_0px_5px_0px_rgba(255,255,255)]">
                    <h1 className="text-5xl p-4">{coin.name} ({coin.symbol})</h1>
                    <div className="flex justify-around p-3">
                        <p className="text-2xl">${Number(coin.priceUsd.slice(0,8))}</p>
                        <p className="text-2xl">{Number(coin.changePercent24Hr).toFixed(2)}%</p>
                    </div>
                </div>
                <div className="flex justify-around">
                    <div>
                        <p>Market Cap</p>
                        <h1 className="text-2xl">${Number(coin.marketCapUsd).toFixed(2)}</h1>
                    </div>
                    <div>
                        <p>Supply</p>
                        <h1 className="text-2xl">{Number(coin.supply).toFixed(2)}</h1>
                    </div>
                    <div>
                        <p>Volume Last 24HR</p>
                        <h1 className="text-2xl">${Number(coin.volumeUsd24Hr).toFixed(2)}</h1>
                    </div>
                    <a className="p-2 border rounded-lg text-2xl border-primary bg-primary" target="_blank" href={coin.explorer}>Explorer</a>
                </div>
            </div>
            <Graph data={ history }/>
        </div>
    )
}
// rank:"1"