import { TurnOffDefaultPropsWarning } from "@/components/RechartsError"
import SelectedCrypto from "@/components/SelectedCrypto"

export default function Page({ params }) {
    return (
      <div className="min-h-screen min-w-screen flex flex-col">
        <SelectedCrypto id={params.id} />
        <TurnOffDefaultPropsWarning />
    </div>
    )
}