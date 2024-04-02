'use client'
import { useEffect, useState } from "react";

export default function CryptoList () {
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function getCryptos() {
            const url = 'https://api.coincap.io/v2/assets'
            try {
                const requestOptions = {
                    method: 'GET',
                    redirect: 'follow'
                }
                const response = await fetch('https://api.coincap.io/v2/assets', requestOptions)
                const data = await response.json()
                let cryptoData = await data.data
                cryptoData.forEach(element => {
                    setList((prevList) => [...prevList, element]);
                });
                setLoading(false)
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error)
                setLoading(false)
            }
        }
        getCryptos()
    }, [])

    useEffect((list) => {
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
            test
            <ul>
                {list && list.map((coin) => {
                    <li key={coin.id}>
                        {coin.name}
                    </li>
                })}
            </ul>
        </div>
    )
}