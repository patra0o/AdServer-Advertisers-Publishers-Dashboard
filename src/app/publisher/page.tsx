import React from 'react'
import Link from 'next/link'

export default function PublisherLogin() {
  return (
    <div className='home-page-parent'>
      <div className='home-page-container'>
        <h2>Publisher Login</h2>
        <form className='login-form-input-holder'>
          <input className='login-form-input' type='email' placeholder='Enter your email'></input>
          <input className='login-form-input' type='password' placeholder='Enter your password'></input><br/>
          <button className='home-page-button'>Login</button>
        </form>
        <p style={{ paddingTop: 20 }}>Don't have an account? <Link href="/register">Register</Link></p>
      </div>
    </div>
  )
}
