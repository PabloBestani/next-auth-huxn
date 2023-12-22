import Link from 'next/link'
import React from 'react'

export default function NavBar() {
  return (
    <nav className='bg-black fixed p-4'>
        <div className='container mx-auto'>
            <ul className='flex justify-between h-screen flex-col'>
                <div>
                    <li className="mx-4 mt-5">
                        <Link href='/' className='text-white font-bold'>Home</Link>
                    </li>
                    <li className="mx-4 mt-5">
                        <Link href='/dashboard' className='text-white font-bold'>Dashboard</Link>
                    </li>
                </div>
                <div>
                    <li className="mx-4 mt-5">
                        <Link href='/login' className='text-white font-bold'>Login</Link>
                    </li>
                    <li className="mx-4 mb-[2rem]">
                        <Link href='/register' className='text-white font-bold'>Register</Link>
                    </li>
                </div>
            </ul>
        </div>
    </nav>
  )
}
