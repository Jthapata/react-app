import Link from 'next/link'
export default function Header() {
    return (
        <div className="bg-slate-800 p-4 pl-9 flex">
            <Link href="/" >
                <h1 className="text-red-500 text-6xl">CryptOhs</h1>
            </Link>
        </div>
    )
}