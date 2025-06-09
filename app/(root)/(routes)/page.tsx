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
      <LandingPage />
    </>
  )
}

export default HomePage