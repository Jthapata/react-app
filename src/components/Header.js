import Link from 'next/link'
export default function Header() {
    return (
        <div className="bg-background p-4 pl-9 flex flex-col">
            <Link href="/" >
                <h1 className="bg-gradient-to-r from-primary to-secondary text-6xl text-transparent bg-clip-text p-1">CryptOhs</h1>
            </Link>
            <hr className='my-4' />
        </div>
    )
}