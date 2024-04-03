import React from 'react'
import Link from 'next/link'

// Component for the landing page
export default function Landing() {

  return (
    <div className='home-page-parent'>
      <div className='home-page-container'>
        <img src='https://via.placeholder.com/125x125'></img>
        <h2>Dynamic Rockets</h2>
        <h3>Login to your account as</h3>
        <div>
          <Link href="/publisher"><button className='home-page-button'>Publisher</button></Link>
          <Link href="/advertiser"><button className='home-page-button'>Advertiser</button></Link>
        </div>
        <p style={{ paddingTop: 20 }}>Don't have an account? <Link href="/register">Register</Link></p>
      </div>
    </div>
  )
}
