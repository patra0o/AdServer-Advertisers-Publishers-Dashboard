"use client"

import React, { FormEvent } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation';

export default function AdvertiserLogin() {

  const router = useRouter()

  // Function to authenticate the user and redirect to the Advertiser Dashboard
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevents default form behavior

    router.push('/advertiser/dashboard')
  };

  return (
    <div className='home-page-parent'>
      <div className='home-page-container'>
        <h2>Advertiser Login</h2>
        <form className='login-form-input-holder' onSubmit={handleSubmit}>
          <input className='login-form-input' type='email' placeholder='Enter your email' required></input>
          <input className='login-form-input' type='password' placeholder='Enter your password' required></input><br/>
          <button className='home-page-button'>Login</button>
        </form>
        <p style={{ paddingTop: 20 }}>Don't have an account? <Link href="/register">Register</Link></p>
      </div>
    </div>
  )
}
