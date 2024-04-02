import CryptoList from "@/components/CryptoList";
import Header from "../components/Header"

export default function Home() {
  return (
    <div className="min-h-screen min-w-screen flex flex-col">
      <Header />
      <CryptoList />
    </div>
  );
}
