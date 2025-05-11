"use client"
import React from 'react'
import Head from 'next/head';
import LandingPage from '@/components/Landing/LandingPage';

const HomePage = () => {
  return (
    <>
      <Head>
        <title>NEAR ABAC</title>
        <meta name="description" content="Explore near Assumption University" />
        <meta name="keywords" content="near, abac, assumption university" />
      </Head>
      {/* <div className='min-h-screen bg-gradient-to-br from-[#f0f0f0] to-[#e0e0e0]'>
        <div className='container grid grid-cols-1 gap-8 py-8 px-7 md:px-6 sm:mx-auto' data-testid="home-page">
          <Suspense fallback={<div>Loading...</div>}>
            <Feature data={initialData} />
          </Suspense>
        </div>
       </div> */}
      <LandingPage />
    </>
  )
}

export default HomePage