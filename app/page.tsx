"use client"
import React, { useState } from 'react'
import Feature from '@/components/Feature/Feature'

const HomePage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
       <div className={`min-h-screen bg-gradient-to-br from-[#f0f0f0] to-[#e0e0e0] ${isDarkMode ? "dark" : ""}`}>
        <div className='container grid grid-cols-1 gap-8 py-8 px-7 md:px-6 mx-auto' data-testid="home-page">
          <Feature />
        </div>
       </div>
  )
}

export default HomePage