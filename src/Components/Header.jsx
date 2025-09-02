import React from 'react'

function Header() {

  return (
    <nav
      className='bg-cyan-700 text-white h-15 flex justify-around items-center rounded-2xl'>
      <h1 className='sm:text-2xl text-xl font-bold'>
        The News
      </h1>
      <ul
        className='hidden sm:flex justify-center items-center flex-row gap-4 font-bold'>
        <li className='hover:text-cyan-400 cursor-pointer'>Home</li>
        <li className='hover:text-cyan-400 cursor-pointer'>About</li>
        <li className='hover:text-cyan-400 cursor-pointer'>Contact us</li>
      </ul>
    </nav>
  )
}

export default Header