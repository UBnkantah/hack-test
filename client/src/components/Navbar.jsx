import React, { useRef } from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    const NavRef = useRef()
  return (
    <div>
        <h1>Logo</h1>
        <nav>
            <Link to='/about'>About</Link>
            <Link to='/causes'>Causes</Link>
            <Link to='/contact'>Contact</Link>
        </nav>
        <div>
            <button className='btn btn-success'>Donate</button>
        </div>
    </div>
  )
}

export default Navbar