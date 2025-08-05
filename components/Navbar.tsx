'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
    const pathname = usePathname()

    const getLinkClass = (segment: string) =>
        'px-4 py-2 rounded ' +
        (pathname.includes(segment) ? 'bg-blue-600 text-white' : 'bg-gray-200')

    return (
        <nav className="flex justify-center gap-4 p-4 shadow">
            <Link
                href="/"
                className={getLinkClass('assignment-1')}
            >
                Assignment-1
            </Link>
            <Link
                href="/assignment-2"
                className={getLinkClass('assignment-2')}
            >
                Assignment-2
            </Link>
        </nav>
    )
}
