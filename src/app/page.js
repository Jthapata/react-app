'use client'
import CryptoList from "@/components/CryptoList";
import SelectedCrypto from "@/components/SelectedCrypto"
import Header from "../components/Header"
import { useState } from "react";
import { TurnOffDefaultPropsWarning } from "@/components/RechartsError";

export default function Home() {
  const [cryptoSelected, setCryptoSelected] = useState(null)

  if (cryptoSelected) {
    return (
      <div className="min-h-screen min-w-screen flex flex-col">
        <Header />
        <SelectedCrypto id={cryptoSelected} />
        <TurnOffDefaultPropsWarning />
      </div>
  )
  }

  return (
    <div className="min-h-screen min-w-screen flex flex-col">
      <Header />
      <CryptoList cryptoSelected={cryptoSelected} setCryptoSelected={setCryptoSelected} />
    </div>
  );
}
