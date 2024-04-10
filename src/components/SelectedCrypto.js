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

    useEffect(() => {
        async function getCryptos() {
            try {
                const coinUrl = `https://api.coincap.io/v2/assets/${props.id}`
                const requestOptions = {
                    method: 'GET',
                    redirect: 'follow'
                }
                const response = await fetch(coinUrl, requestOptions)
                const data = await response.json()
                const coinData = await data.data
                setCoin(coinData)
                setLoading(false)
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error)
                setLoading(false)
            }
        }
        async function getCryptoHistory() {
            try {
                const historyUrl = `https://api.coincap.io/v2/assets/${props.id}/history?interval=m1`
                const requestOptions = {
                    method: 'GET',
                    redirect: 'follow'
                }
                const response = await fetch(historyUrl, requestOptions)
                const data = await response.json()
                const coinHistory = await data.data.slice(-14)
                coinHistory.forEach(item => {
                    item.time = formatDate(item.time);
                });
                setHistory(coinHistory)
                setLoading(false)
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error)
                setLoading(false)
            }
        }
        getCryptos()
        getCryptoHistory()
    }, [])

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

// changePercent24Hr:"2.9811980744080679"
// explorer:"https://blockchain.info/"
// id:"bitcoin"
// marketCapUsd:"1332754422191.8972030258617078"
// maxSupply:"21000000.0000000000000000"
// name:"Bitcoin"
// priceUsd:"67744.2626704807599321"
// rank:"1"
// supply:"19673318.0000000000000000"
// symbol:"BTC"
// volumeUsd24Hr:"11334438568.2750594310454331"
// vwap24Hr:"67430.8108557656646168"