import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div>
        <div className='bg-sky-400 h-20 w-screen flex align-middle text-2xl text-white'>
        <nav className='container gap-4 flex m-auto p-5 '>
          <Link to='/'>shop</Link>
          <Link to='/card'>card</Link>
        </nav>
      </div>
    </div>
  )
}

export default Header
