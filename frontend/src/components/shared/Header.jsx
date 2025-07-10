import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <>
     <div className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b shadow-sm">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-[4.5rem] px-4 sm:px-6 lg:px-8">
        <div className="relative group">
          <Link to="/">
            <h1 className="text-2xl sm:text-3xl font-bold cursor-pointer tracking-tight">
              Job<span className="bg-gradient-to-r from-[#f83002] to-[#ff6b4d] bg-clip-text text-transparent">Quest</span>
            </h1>
          </Link>
          <div className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-[#f83002] to-[#ff6b4d] transition-all duration-300 group-hover:w-full"></div>
        </div>
        </div>
        </div>
    </>
  )
}

export default Header