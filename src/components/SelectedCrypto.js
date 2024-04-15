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
            const coinHistory = historyData.data.slice(-15);
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
            <div className="flex-grow flex flex-col items-center border-black rounded-sm bg-slate-500 text-white p-3">
                <h1>Loading...</h1>
            </div>
        )
    }
    if (error) {
        return (
            <div className="flex-grow flex flex-col items-center border-black rounded-sm bg-slate-500 text-white p-3">
                <h1>Error Loading Data</h1>
            </div>
        )
    }
    return (
        <div className="flex-grow flex flex-col items-center bg-slate-500 text-white p-3">
            <div className="p-3">{coin.name}</div>
            <div className="p-3">{coin.symbol}</div>
            <div className="p-3">${Number(coin.priceUsd)}</div>
            <div className="p-3">{Number(coin.changePercent24Hr).toFixed(2)}%</div>
            <div className="p-3">${Number(coin.marketCapUsd).toFixed(2)}</div>
            <br></br>
            <Graph data={ history }/>
        </div>
    )
}