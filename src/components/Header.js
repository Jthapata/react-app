import Link from 'next/link'
export default function Header() {
    return (
        <div className="bg-background p-4 pl-9 flex flex-col">
            <Link href="/" >
                <h1 className="bg-gradient-to-r from-primary to-accent text-6xl inline-block text-transparent bg-clip-text p-3">CryptOhs</h1>
            </Link>
            <hr className='my-4' />
        </div>
    )
}