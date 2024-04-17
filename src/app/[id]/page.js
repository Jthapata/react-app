import Header from "@/components/Header"
import SelectedCrypto from "@/components/SelectedCrypto"

export default function Page({ params }) {
    return (
      <div className="min-h-screen min-w-screen flex flex-col">
        <Header />
        <SelectedCrypto id={params.id} />
    </div>
    )
}