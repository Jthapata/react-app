'use client'
import { Crushed } from "next/font/google";
import { useEffect, useState } from "react";

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

    useEffect(() => {
        console.log(list)
    }, [list])

    if (loading) {
        return (
            <h1>Loading...</h1>
        )
    }
    if (error) {
        return (
            <h1>Error Loading Data</h1>
        )
    }

    return (
        <div>
            <ul>
                {Object.keys(list).map((key) => (
                    <li key={key}>
                        {list[key].name} --- {list[key].priceUsd}
                    </li>
                ))}
            </ul>
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