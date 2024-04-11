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
        console.log(coin)
    }, [coin])

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

{/*
RechartsError.js:15 Warning: Cannot update a component (`HotReload`) while rendering a different component (`CryptoList`). To locate the bad setState() call inside `CryptoList`, follow the stack trace as described in https://reactjs.org/link/setstate-in-render
    at CryptoList (webpack-internal:///(app-pages-browser)/./src/components/SelectedCrypto.js:22:82)
    at div
    at Home (webpack-internal:///(app-pages-browser)/./src/app/page.js:21:96)
    at StaticGenerationSearchParamsBailoutProvider (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/static-generation-searchparams-bailout-provider.js:16:11)
    at InnerLayoutRouter (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/layout-router.js:242:11)
    at RedirectErrorBoundary (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/redirect-boundary.js:74:9)
    at RedirectBoundary (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/redirect-boundary.js:82:11)
    at NotFoundErrorBoundary (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/not-found-boundary.js:76:9)
    at NotFoundBoundary (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/not-found-boundary.js:84:11)
    at LoadingBoundary (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/layout-router.js:340:11)
    at ErrorBoundary (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/error-boundary.js:162:11)
    at InnerScrollAndFocusHandler (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/layout-router.js:152:9)
    at ScrollAndFocusHandler (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/layout-router.js:227:11)
    at RenderFromTemplateContext (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/render-from-template-context.js:16:44)
    at OuterLayoutRouter (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/layout-router.js:359:11)
    at body
    at html
    at RedirectErrorBoundary (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/redirect-boundary.js:74:9)
    at RedirectBoundary (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/redirect-boundary.js:82:11)
    at NotFoundErrorBoundary (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/not-found-boundary.js:76:9)
    at NotFoundBoundary (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/not-found-boundary.js:84:11)
    at DevRootNotFoundBoundary (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/dev-root-not-found-boundary.js:33:11)
    at ReactDevOverlay (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/react-dev-overlay/internal/ReactDevOverlay.js:84:9)
    at HotReload (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/react-dev-overlay/hot-reloader-client.js:307:11)
    at Router (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/app-router.js:182:11)
    at ErrorBoundaryHandler (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/error-boundary.js:115:9)
    at ErrorBoundary (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/error-boundary.js:162:11)
    at AppRouter (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/app-router.js:542:13)
    at ServerRoot (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/app-index.js:129:11)
    at RSCComponent
    at Root (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/app-index.js:145:11)
*/}