'use client'
import { useEffect, useState } from "react";
import Link from 'next/link'

export default function CryptoList () {
    const [list, setList] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function getCryptos() {
            try {
                const requestOptions = {
                    method: 'GET',
                    redirect: 'follow'
                }
                const response = await fetch('https://api.coincap.io/v2/assets', requestOptions)
                const data = await response.json()
                const cryptoData = await data.data
                setList(cryptoData)
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
            <table className="border">
                <thead>
                    <tr className="bg-slate-600">
                        <th className="p-3">Name</th>
                        <th className="p-3">Symbol</th>
                        <th className="p-3">Price</th>
                        <th className="p-3">24hrs</th>
                        <th className="p-3">Market Cap</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(list).map((key) => (
                        <tr key={list[key].id} className="hover:border text-center">
                            <td className="p-3"><Link href={`/${list[key].id}`}>{list[key].name}</Link></td>
                            <td className="p-3">{list[key].symbol}</td>
                            <td className="p-3">${Number(list[key].priceUsd.slice(0,8))}</td>
                            <td className="p-3">{Number(list[key].changePercent24Hr).toFixed(2)}%</td>
                            <td className="p-3">${Number(list[key].marketCapUsd).toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

// changePercent24Hr:"-5.3769653963268705"
// explorer:"https://blockchain.info/"
// id:"bitcoin"
// marketCapUsd:"1318279914023.0193772396816914"
// maxSupply:"21000000.0000000000000000"
// name:"Bitcoin"
// priceUsd:"67017.3117572066251122"
// rank:"1"
// supply:"19670737.0000000000000000"
// symbol:"BTC"
// volumeUsd24Hr:"12001168633.3493137033747581"
// vwap24Hr:"69337.5785022222726017"