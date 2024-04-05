'use client'
import { useEffect, useState } from "react";

export default function CryptoList (props) {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [coin, setCoin] = useState(null)

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
        getCryptos()
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