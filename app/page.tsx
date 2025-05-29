"use client"
import React from 'react'
import Head from 'next/head';
import dynamic from 'next/dynamic';
const LandingPage = dynamic(() => import('@/components/Landing/LandingPage'), {
  ssr: false,
});

const HomePage = () => {
  return (
    <>
      <Head>
        <title>NEAR ABAC</title>
        <meta name="description" content="Explore near Assumption University" />
        <meta name="keywords" content="near, abac, assumption university" />
      </Head>
      <LandingPage />
    </>
  )
}

export default HomePage