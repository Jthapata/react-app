'use client'
import { useEffect, useState } from "react";

export default function CryptoList () {
    const [list, setList] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        setLoading(true)
        async function getCryptos() {
            const url = 'https://api.coincap.io/v2/assets'
            try {
                const requestOptions = {
                    method: 'GET',
                    redirect: 'follow'
                }
                const response = await fetch(url, requestOptions)
                const data = await response.json()
                const cryptoData = data.data
                console.log(cryptoData[0])
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error)
            }
        }
        getCryptos()
        setLoading(false)
    }, [])

    if (loading) {
        return (
            <div>Loading...</div>
        )
    }
    if (error) {
        return (
            <div>Error</div>
        )
    }

    return (
        <div>
            test
            {/* <ul>
                {list.map((coin) => {
                    <li key={coin.id}>
                        {coin.name}
                    </li>
                })}
            </ul> */}
        </div>
    )
}