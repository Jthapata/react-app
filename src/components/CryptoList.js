'use client'
import { useEffect, useState } from "react";
import Link from 'next/link'
import { useRouter } from "next/navigation";
import Loading from "./Loading";
import Error from "./Error";

export default function CryptoList () {
    const [list, setList] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const router = useRouter()

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
            <Loading />
        )
    }
    if (error) {
        return (
            <Error />
        )
    }
    return (
        <div className="flex-grow flex flex-col items-center bg-background text-text p-3">
            <table className="text-2xl">
                <thead>
                    <tr className="bg-secondary">
                        <th className="p-3">Name</th>
                        <th className="p-3">Symbol</th>
                        <th className="p-3">Price</th>
                        <th className="p-3">24hrs</th>
                        <th className="p-3">Market Cap</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(list).map((key) => (
                        <tr key={list[key].id} className="hover:cursor-pointer hover:bg-accent text-center" onClick={() => router.push(`${list[key].id}`)}>
                            <td className="p-3">{list[key].name}</td>
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