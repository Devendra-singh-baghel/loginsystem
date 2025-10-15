import React from 'react'
import { Link } from 'react-router'

function Home() {
    return (
        <div className='flex justify-end items-center text-xl font-bold p-3'>

            <Link to={'/login'} className='bg-blue-400 p-2 rounded-lg cursor-pointer'>Login</Link>
        </div>
    )
}

export default Home
