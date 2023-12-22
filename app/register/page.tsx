'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';
import Link from 'next/link';


export default function Register() {
    const router = useRouter();
    const { data: session, status: sessionStatus } = useSession();

    useEffect(() => {
        if (sessionStatus === 'authenticated') {
            router.push("/dashboard");
        }
    }, [sessionStatus, router])

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!e.target) return;
        const username = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const confirmPassword = e.target[3].value;

        if (!username || !email || !password || !confirmPassword) {
            return toast.error('Please fill all the input fields.');
        }
        if (password !== confirmPassword) {
            return toast.error('Passwords do not match.');
        }

        try {
            const res = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                    confirmPassword
                })
            });

            if (res.status === 400) {
                const errorData = await res.json();
                if (errorData && errorData.message) {
                    return toast.error(errorData.message);
                } else {
                    return toast.error('An error ocurred during Registration');
                }
            };
            if (res.status === 201) {
                router.push('/login');
            };
        } catch (error) {
            if (error instanceof Error)
            toast.error(error.message);
        }
    }

    if (sessionStatus === 'loading') {
        return <h1>Loading ...</h1>
    }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded shadow-md w-96">
            <h2 className="text-2xl font-semibold mb-4">Register</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <div className="mb-4">
                        <label htmlFor='username' className='block text-gray-700 text-sm font-bold mb-2'>
                            Username
                        </label>
                        <input type='text' id='username' name='username' className='w-full p-2 border border-gray-300 rounded' />
                    </div>
                    <div className="mb-4">
                        <label htmlFor='email' className='block text-gray-700 text-sm font-bold mb-2'>
                            Email
                        </label>
                        <input type='text' id='email' name='email' className='w-full p-2 border border-gray-300 rounded' />
                    </div>
                    <div className="mb-4">
                        <label htmlFor='password' className='block text-gray-700 text-sm font-bold mb-2'>
                            Password
                        </label>
                        <input type='text' id='password' name='password' className='w-full p-2 border border-gray-300 rounded' />
                    </div>
                    <div className="mb-4">
                        <label htmlFor='confirm-password' className='block text-gray-700 text-sm font-bold mb-2'>
                            Confirm Password
                        </label>
                        <input type='text' id='confirm-password' name='confirm-password' className='w-full p-2 border border-gray-300 rounded' />
                    </div>
                    <div>
                        <button type='submit' className='mb-5 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600'>
                            Register
                        </button>
                    </div>
                    <span>
                        {" "}
                        Already have an account? {" "}
                        <Link  href='/login' className='text-center text-blue-500 hover:underline mt-2'>
                            Login
                        </Link>
                    </span>
                </div>
            </form>
        </div>
    </div>
  )
}
